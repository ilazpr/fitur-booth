// Staff capture on a tablet: same form plus introduce-to, heat and notes. Works offline.
import { pickLang } from './i18n.js';
import { renderForm, sendQueued } from './form.js';
import { pending, allLeads, toCSV } from './leads.js';

const store = () => { try { return window.localStorage; } catch (e) { return { getItem: () => null, setItem() {} }; } };
let lang = pickLang(navigator.language, store().getItem('fitur_lang'));

function refresh() {
  const n = pending(store()).length;
  const c = document.getElementById('count');
  c.textContent = n + ' pending';
  c.className = 'pill' + (n ? ' warn' : '');
  document.getElementById('total').textContent = allLeads(store()).length + ' captured on this device';
}

function draw() {
  document.documentElement.lang = lang;
  document.getElementById('lang').textContent = lang === 'es' ? 'English' : 'Español';
  renderForm(document.getElementById('formroot'), { lang, tile: 'browse', src: 'staff', mode: 'staff', onSaved: refresh });
}

document.getElementById('lang').addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es';
  try { store().setItem('fitur_lang', lang); } catch (e) { /* ignore */ }
  draw();
});
document.getElementById('sync').addEventListener('click', async () => { await sendQueued(); refresh(); });
document.getElementById('csv').addEventListener('click', () => {
  const blob = new Blob(['﻿' + toCSV(allLeads(store()))], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'fitur-leads-' + new Date().toISOString().slice(0, 10) + '.csv';
  a.click();
});

draw();
refresh();
sendQueued().then(refresh);
window.addEventListener('online', () => sendQueued().then(refresh));
setInterval(() => sendQueued().then(refresh), 30000);
