// Lead handling: validate, queue on the device, send with retry, export CSV.
// Pure logic (storage and sender are injected) so it can be tested without a browser.
import { suggestOwner } from './routing.js';

const KEY = 'fitur_lead_queue_v1';
const ALL_KEY = 'fitur_lead_all_v1'; // every lead ever captured on this device, for CSV export

export const FIELDS = [
  'name', 'company', 'email', 'phone', 'country', 'tile', 'markets', 'volume', 'brands',
  'eventType', 'groupSize', 'dates', 'tripDates', 'party', 'interests', 'message',
  'meetDay', 'meetTime', 'introduceTo', 'heat', 'notes', 'wantsGuide', 'intent', 'about',
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function uid() {
  const c = globalThis.crypto;
  if (c && c.randomUUID) return c.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

export function buildLead(values, ctx) {
  const v = values || {};
  const clean = (x) => (typeof x === 'string' ? x.trim() : x);
  if (!clean(v.name)) throw new Error('Name is required');
  if (!EMAIL.test(clean(v.email) || '')) throw new Error('A valid email is required');
  if (!v.consent) throw new Error('Consent is required');
  const lead = {};
  for (const f of FIELDS) {
    if (v[f] === undefined || v[f] === '') continue;
    lead[f] = Array.isArray(v[f]) ? v[f].map(clean) : clean(v[f]);
  }
  lead.consent = true;
  lead.id = uid();
  lead.createdAt = new Date().toISOString();
  lead.src = (ctx && ctx.src) || 'direct';
  lead.lang = (ctx && ctx.lang) || 'en';
  lead.mode = (ctx && ctx.mode) || 'visitor';
  lead.suggestedOwner = suggestOwner(lead);
  return lead;
}

function read(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function write(storage, key, list) {
  try { storage.setItem(key, JSON.stringify(list)); } catch (e) { /* storage full or blocked */ }
}

// Kept in memory too, so a blocked storage still lets this tab send the lead once.
const memory = [];

export function enqueue(lead, storage) {
  memory.push(lead);
  write(storage, KEY, read(storage, KEY).concat([lead]));
  write(storage, ALL_KEY, read(storage, ALL_KEY).concat([lead]));
}

export function pending(storage) {
  const stored = read(storage, KEY);
  const ids = new Set(stored.map((l) => l.id));
  return stored.concat(memory.filter((l) => !ids.has(l.id)));
}

export function allLeads(storage) {
  return read(storage, ALL_KEY);
}

let flushing = null;

// Sends each queued lead; a lead leaves the queue only after the sender resolves.
export function flush(storage, sender) {
  if (flushing) return flushing; // a second caller shares the first run
  flushing = (async () => {
    let sent = 0;
    let failed = 0;
    const done = new Set();
    for (const lead of pending(storage)) {
      try {
        await sender(lead);
        done.add(lead.id);
        sent++;
      } catch (e) {
        failed++;
      }
    }
    write(storage, KEY, read(storage, KEY).filter((l) => !done.has(l.id)));
    for (let i = memory.length - 1; i >= 0; i--) if (done.has(memory[i].id)) memory.splice(i, 1);
    return { sent, failed };
  })().finally(() => { flushing = null; });
  return flushing;
}

export function toCSV(leads) {
  const cols = ['id', 'createdAt', 'src', 'mode', 'lang', ...FIELDS, 'suggestedOwner'];
  const esc = (x) => {
    const s = Array.isArray(x) ? x.join('; ') : x == null ? '' : String(x);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return [cols.join(',')].concat(leads.map((l) => cols.map((c) => esc(l[c])).join(','))).join('\r\n');
}

// Browser sender: posts to the Apps Script web app (URL set in config.js).
export function makeSender(url) {
  return async (lead) => {
    if (!url) throw new Error('No lead endpoint configured');
    // text/plain avoids a CORS preflight, which Apps Script web apps cannot answer.
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(lead), redirect: 'follow' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    // Apps Script answers 200 even when it rejects a lead, so read its verdict. An unreadable body is
    // treated as sent: the server ignores a repeated lead id, so a wrong guess costs nothing.
    const verdict = await res.json().catch(() => null);
    if (verdict && verdict.ok === false) throw new Error('Rejected: ' + (verdict.error || 'unknown'));
  };
}
