// Phone page: hero, four audience tiles that reorder the sections, cards, then the form.
import { brands, venues, tours, tiles, numbers, copy, ui, restaurants } from './content.js';
import { pickLang, t } from './i18n.js';
import { renderForm, sendQueued } from './form.js';
import { openDetail } from './detail.js';
import { initSheet, openSheet } from './sheet.js';
import { STAND } from './config.js';

// The review hub sets data-qs on <html>, because a frame built from text has no query string.
const params = new URLSearchParams(document.documentElement.dataset.qs || location.search);
const src = params.get('src') || 'direct';
const review = params.get('review') === '1'; // numbered photos and "to send" notes for the people reviewing content
const mode = document.body.dataset.mode || 'visitor'; // meet.html sets data-mode="meet"
let saved = null;
try { saved = localStorage.getItem('fitur_lang'); } catch (e) { /* blocked storage */ }

const state = {
  lang: pickLang(navigator.language, params.get('lang') || saved),
  tile: ['sell', 'groups', 'trip', 'browse'].includes(params.get('tile')) ? params.get('tile') : 'browse',
};

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

const L = (o) => t(o, state.lang);

function photo(item, alt) {
  if (!item.photo) return h('div', { class: 'ph' }, item.name);
  return h('div', { class: 'ph' }, h('img', { src: item.thumb || item.photo, alt, loading: 'lazy', decoding: 'async' }));
}

// Brands and venues with photos open a detail view; tours link out; Mira Mar has no photos or page yet.
const isClickable = (item) => Array.isArray(item.gallery) && (item.gallery.length > 0 || 'bestFor' in item);

// Review mode: what is missing for this item, so whoever reviews it knows what to send.
function gaps(item) {
  if (!('bestFor' in item) && !Array.isArray(item.gallery)) return [];
  const out = [];
  if (!item.photo) out.push('main photo');
  if (!item.logo) out.push('logo');
  const n = (item.gallery || []).length;
  if (n < 4) out.push(n ? `only ${n} gallery photo${n === 1 ? '' : 's'}` : 'gallery photos');
  if ('bestFor' in item) { // hotels and stays: the facts a seller needs
    if (!item.highlights || item.highlights.length < 3) out.push('3 highlights');
    if (!item.rooms) out.push('room count');
    if (!item.meetings) out.push('meeting space (rooms, capacity)');
    if (!item.offer) out.push('FITUR offer, if any');
    if (!item.lookingFor) out.push('who you want to meet');
    if (!item.contact) out.push('contact person');
  }
  return out;
}

function openItem(item) {
  openDetail(item, { lang: state.lang, review, onTalk: (it) => openSheet({ about: it.name }) });
}

function card(item, extra) {
  const clickable = isClickable(item);
  const n = (item.gallery || []).length;
  const attrs = { class: 'card' + (clickable ? ' clickable' : '') };
  if (clickable) {
    attrs.tabindex = '0';
    attrs.role = 'button';
    attrs['aria-label'] = item.name + ' — ' + L(ui.seeMore);
    attrs.onclick = (e) => { if (!e.target.closest('a')) openItem(item); };
    attrs.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openItem(item); } };
  }
  const missing = review ? gaps(item) : [];
  return h('article', attrs,
    photo(item, item.name),
    h('div', { class: 'body' },
      item.area ? h('div', { class: 'area' }, item.area) : null,
      item.logo ? h('img', { class: 'logo', src: item.logo, alt: '', loading: 'lazy' }) : null,
      h('h3', {}, item.name),
      h('p', {}, L(item.line)),
      item.bestFor ? h('p', {}, L(item.bestFor)) : null,
      item.rooms ? h('p', { class: 'facts' }, `${item.rooms.n} ${L(item.rooms.unit)}`) : null,
      item.offer ? h('p', { class: 'offerbadge' }, L(copy.offerLabel) + ': ' + L(item.offer)) : null,
      clickable ? h('p', { class: 'more' }, L(ui.seeMore) + (n > 1 ? ` · ${n} ${L(ui.photos)}` : '') + ' →') : null,
      missing.length ? h('p', { class: 'gapchip' }, 'To send: ' + missing.join(', ')) : null,
      extra));
}

const sections = {
  why: () => h('section', { id: 'why' }, h('div', { class: 'why' },
    h('h2', {}, L(copy.whyTitle)),
    h('ul', {}, [copy.why1, copy.why2, copy.why3].map((c) => h('li', {}, L(c)))))),
  properties: () => h('section', { id: 'properties' }, h('h2', {}, L(copy.propertiesTitle)),
    h('div', { class: 'cards' }, brands.map((b) => card(b)))),
  venues: () => h('section', { id: 'venues' }, h('h2', {}, L(copy.venuesTitle)),
    h('div', { class: 'cards' }, venues.map((v) =>
      card(v, v.id === 'mira-mar' ? h('a', { class: 'go', href: '#talk' }, L(copy.contactHibird)) : null)))),
  tours: () => h('section', { id: 'tours' }, h('h2', {}, L(copy.toursTitle)),
    h('div', { class: 'cards' }, tours.map((x) =>
      card(x, h('a', { class: 'go', href: x.url, target: '_blank', rel: 'noopener' }, L(ui.visitSite) + ' →')))),
    h('p', { class: 'fine' }, L(copy.guideTitle) + ': ' + L(copy.guideLine))),
  restaurants: () => h('section', { id: 'restaurants' }, h('h2', {}, L(copy.restaurantsTitle)),
    h('div', { class: 'cards' }, h('article', { class: 'card' },
      h('div', { class: 'ph' }, h('img', { src: restaurants.thumb, alt: '', loading: 'lazy' })),
      h('div', { class: 'body' }, h('p', {}, L(copy.restaurantsLine)))))),
};

function render() {
  document.documentElement.lang = state.lang;
  const langBtn = document.getElementById('lang');
  langBtn.textContent = L(ui.lang);
  const tile = tiles.find((x) => x.id === state.tile);
  const app = document.getElementById('app');
  app.innerHTML = '';
  if (review) {
    app.append(h('div', { class: 'reviewbar' }, h('div', { class: 'wrap' },
      h('b', {}, 'Review mode. '),
      'This is what we have for your property. Open its card to see every photo (they are numbered). ' +
      'If you want anything changed, send Isaac: the photo numbers to replace or remove, any new photos (at least 1600 px wide), ' +
      'and any wording you would change. The "To send" note on a card lists what is missing.')));
  }

  const hero = h('div', { class: 'hero', style: 'background-image:url(assets/hero.webp)' },
    h('div', { class: 'wrap' },
      h('p', { class: 'brandline' }, L(copy.brand) + ' · ' + L(copy.brandLine)),
      h('h1', {}, mode === 'meet' ? L(copy.meetTitle) : L(copy.hook)),
      h('p', {}, mode === 'meet' ? L(copy.meetLine) : L(copy.promise)),
      STAND ? h('p', {}, 'FITUR · ' + STAND) : null,
      h('div', { class: 'nums' }, Object.values(numbers).map((n) => h('div', {}, h('b', {}, n.value), h('span', {}, L(n.label)))))));
  app.append(hero);

  const wrap = h('div', { class: 'wrap' });
  wrap.append(h('h2', { class: 'h-title' }, L(copy.tilesTitle)));
  wrap.append(h('div', { class: 'tiles' }, tiles.map((x) =>
    h('button', {
      class: 'tile', type: 'button', 'aria-pressed': String(x.id === state.tile),
      onclick: () => { state.tile = x.id; render(); document.getElementById('talk').scrollIntoView({ behavior: 'smooth' }); },
    }, h('b', {}, L(x.label)), h('small', {}, L(x.sub))))));
  for (const id of tile.order) wrap.append(sections[id]());

  const formBox = h('div', { class: 'formbox', id: 'talk' }, h('h2', {}, L(ui.formTitle)), h('div', { id: 'formroot' }));
  wrap.append(formBox);
  app.append(wrap);
  renderForm(formBox.querySelector('#formroot'), { lang: state.lang, tile: state.tile, src, mode });
  document.getElementById('foot').textContent = L(copy.brand) + ' (HHG) · ' + L(copy.brandLine);
  initSheet({ lang: state.lang, src, tile: state.tile, hidden: mode === 'meet' });
}

document.getElementById('lang').addEventListener('click', () => {
  state.lang = state.lang === 'es' ? 'en' : 'es';
  try { localStorage.setItem('fitur_lang', state.lang); } catch (e) { /* ignore */ }
  render();
});

render();
sendQueued();
window.addEventListener('online', sendQueued);
setInterval(sendQueued, 30000);
