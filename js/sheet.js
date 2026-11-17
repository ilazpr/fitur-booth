// The floating "Talk to us" button and the slide-up form sheet, available on every page.
import { ui } from './content.js';
import { t } from './i18n.js';
import { renderForm } from './form.js';

const h = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v != null && v !== false) n.setAttribute(k, v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k instanceof Node ? k : document.createTextNode(k));
  return n;
};

let fab = null;
let sheet = null;
let ctx = { lang: 'en', src: 'direct', tile: 'browse' };
let returnFocus = null;

function onKey(e) { if (e.key === 'Escape') closeSheet(); }

export function closeSheet() {
  if (!sheet) return;
  sheet.remove();
  sheet = null;
  document.body.classList.remove('noscroll');
  document.removeEventListener('keydown', onKey);
  if (fab) fab.hidden = false;
  if (returnFocus && returnFocus.focus) returnFocus.focus();
}

// opts: {about, intent}
export function openSheet(opts = {}) {
  closeSheet();
  returnFocus = document.activeElement;
  const L = (o) => t(o, ctx.lang);
  const root = h('div', { class: 'sheetform' });
  const panel = h('div', { class: 'spanel', role: 'dialog', 'aria-modal': 'true', 'aria-label': L(ui.formTitle) },
    h('button', { class: 'dclose', type: 'button', 'aria-label': L(ui.close), onclick: closeSheet }, '×'),
    h('h2', {}, L(ui.formTitle)),
    root);
  sheet = h('div', { class: 'soverlay', onclick: (e) => { if (e.target === sheet) closeSheet(); } }, panel);
  document.body.append(sheet);
  document.body.classList.add('noscroll');
  document.addEventListener('keydown', onKey);
  if (fab) fab.hidden = true;
  renderForm(root, { lang: ctx.lang, tile: opts.about ? 'browse' : ctx.tile, src: ctx.src, mode: 'visitor', idPrefix: 'sheet_', intent: opts.intent, about: opts.about });
  panel.querySelector('.dclose').focus();
}

// Call once, and again whenever the language or tile changes.
export function initSheet(next) {
  ctx = { ...ctx, ...next };
  if (!fab) {
    fab = h('button', { class: 'fab', type: 'button', onclick: () => openSheet() });
    document.body.append(fab);
  }
  fab.textContent = t(ui.talk, ctx.lang);
  fab.hidden = !!sheet || !!ctx.hidden;
}
