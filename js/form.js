// The lead form, shared by the phone page, the floating sheet, the meet page and staff mode.
import { brands, ui, tiles } from './content.js';
import { t } from './i18n.js';
import { buildLead, enqueue, flush, makeSender } from './leads.js';
import { LEAD_URL } from './config.js';

const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v === true) n.setAttribute(k, '');
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  for (const k of kids.flat()) n.append(k instanceof Node ? k : document.createTextNode(k));
  return n;
};

const safeStorage = () => { try { return window.localStorage; } catch (e) { return { getItem: () => null, setItem() {} }; } };

export function sendQueued() {
  return flush(safeStorage(), makeSender(LEAD_URL)).catch(() => ({ sent: 0, failed: 1 }));
}

// opts: {lang, tile, src, mode: 'visitor'|'staff'|'meet', idPrefix, intent: 'meet'|'after', about, onSaved(lead, result)}
// idPrefix keeps element ids unique when two forms are on one page (the page form and the floating sheet).
export function renderForm(root, opts) {
  const { lang, mode } = opts;
  const P = opts.idPrefix || '';
  const tile = opts.tile || 'browse';
  const L = (o) => t(o, lang);
  root.innerHTML = '';

  const field = (key, type = 'text', extra = {}) =>
    el('div', {}, el('label', { for: P + 'f_' + key }, L(ui[key])), el('input', { id: P + 'f_' + key, name: key, type, autocomplete: extra.ac || 'off', ...extra }));
  const area = (key) => el('div', {}, el('label', { for: P + 'f_' + key }, L(ui[key])), el('textarea', { id: P + 'f_' + key, name: key }));
  const brandChecks = () =>
    el('div', {}, el('label', {}, L(ui.brandsInterest)),
      el('div', { class: 'checks' }, brands.map((b) => el('label', {}, el('input', { type: 'checkbox', name: 'brands', value: b.name }), b.name))));

  const form = el('form', { novalidate: true, class: 'lead' });

  // Which property they were looking at, if they came from a card.
  if (opts.about) {
    form.append(el('p', { class: 'about' }, L(ui.aboutPrefix) + ' ', el('b', {}, opts.about)),
      el('input', { type: 'hidden', name: 'about', value: opts.about }));
  }

  // Meet at the event, or connect afterwards. The meet page is always "meet"; staff already met them.
  const meetFields = el('div', { class: 'meetfields' }, field('meetDay', 'text', { placeholder: lang === 'es' ? 'p. ej. jueves' : 'e.g. Thursday' }), field('meetTime', 'text', { placeholder: '10:30' }));
  if (mode === 'meet') {
    form.append(el('input', { type: 'hidden', name: 'intent', value: 'meet' }));
  } else if (mode === 'visitor') {
    const start = opts.intent === 'meet' ? 'meet' : 'after';
    const radio = (value, label) => el('label', { class: 'choice' }, el('input', { type: 'radio', name: 'intent', value, checked: value === start }), label);
    form.append(el('fieldset', { class: 'intent' }, el('legend', {}, L(ui.intentLabel)),
      radio('meet', L(ui.intentMeet)), radio('after', L(ui.intentAfter))));
    const sync = () => { meetFields.hidden = form.querySelector('[name=intent]:checked').value !== 'meet'; };
    form.addEventListener('change', (e) => { if (e.target.name === 'intent') sync(); });
    meetFields.hidden = start !== 'meet';
  }

  form.append(
    el('div', {}, el('label', { for: P + 'f_tile' }, L(ui.lookingFor)),
      el('select', { id: P + 'f_tile', name: 'tile' }, tiles.map((x) => el('option', { value: x.id, selected: x.id === tile }, L(x.label))))),
    field('name', 'text', { ac: 'name', required: true }),
    field('company', 'text', { ac: 'organization' }),
    field('email', 'email', { ac: 'email', required: true }),
    field('country', 'text', { ac: 'country-name' }),
  );

  const extras = el('div', { class: 'extras' });
  form.append(extras);
  const fillExtras = (which) => {
    extras.innerHTML = '';
    if (which === 'sell') extras.append(field('markets'), field('volume'), brandChecks());
    if (which === 'groups') extras.append(field('eventType'), field('groupSize'), field('dates'), brandChecks());
    if (which === 'trip') {
      extras.append(field('dates'), field('party'),
        el('div', { class: 'checks' }, el('label', {}, el('input', { type: 'checkbox', name: 'wantsGuide', value: 'yes', checked: true }), L(ui.wantsGuide))));
    }
    extras.append(area('message'));
  };
  fillExtras(tile);
  form.querySelector('[name=tile]').addEventListener('change', (e) => fillExtras(e.target.value));

  if (mode === 'meet' || mode === 'visitor') form.append(meetFields);

  if (mode === 'staff') {
    form.append(
      el('div', {}, el('label', { for: P + 'f_heat' }, 'Heat'),
        el('select', { id: P + 'f_heat', name: 'heat' }, ['warm', 'hot', 'info only'].map((h) => el('option', { value: h }, h)))),
      el('div', {}, el('label', {}, 'Introduce to'),
        el('div', { class: 'checks' }, [...brands.map((b) => b.name), 'Mira Mar', 'Glow Kayak', 'Encanto', 'Nobody yet'].map((n) =>
          el('label', {}, el('input', { type: 'checkbox', name: 'introduceTo', value: n }), n)))),
      area('notes'),
    );
  }

  form.append(
    el('label', { class: 'consent' }, el('input', { type: 'checkbox', name: 'consent', required: true }), L(ui.consent)),
    el('p', { class: 'fine' }, L(ui.privacy)),
    el('button', { class: 'btn', type: 'submit' }, L(ui.send)),
    el('div', { class: 'msg hidden', role: 'status', 'aria-live': 'polite' }),
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = form.querySelector('.msg');
    const fd = new FormData(form);
    const values = {};
    for (const k of new Set(fd.keys())) {
      const all = fd.getAll(k);
      values[k] = ['brands', 'introduceTo'].includes(k) ? all : all[0];
    }
    values.consent = form.querySelector('[name=consent]').checked;
    const guide = form.querySelector('[name=wantsGuide]');
    values.wantsGuide = guide ? guide.checked : undefined;
    // Meeting details only matter when they asked to meet.
    if (values.intent !== 'meet') { delete values.meetDay; delete values.meetTime; }
    let lead;
    try {
      lead = buildLead(values, { src: opts.src, lang, mode });
    } catch (err) {
      msg.className = 'msg err'; msg.textContent = L(ui.required);
      return;
    }
    enqueue(lead, safeStorage());
    const r = await sendQueued();
    msg.className = 'msg ok';
    msg.textContent = r.failed ? L(ui.queued) : L(ui.thanks);
    form.reset();
    if (opts.onSaved) opts.onSaved(lead, r);
  });

  root.append(form);
}
