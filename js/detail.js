// Property detail: a full-screen panel with a swipeable photo gallery, the short text, and two actions.
import { ui, copy } from './content.js';
import { t } from './i18n.js';

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

let openEl = null;
let returnFocus = null;

export function closeDetail() {
  if (!openEl) return;
  openEl.remove();
  openEl = null;
  document.body.classList.remove('noscroll');
  document.removeEventListener('keydown', onKey);
  if (returnFocus && returnFocus.focus) returnFocus.focus();
}

function onKey(e) { if (e.key === 'Escape') closeDetail(); }

// opts: {lang, review, onTalk(item)}
export function openDetail(item, opts) {
  closeDetail();
  const L = (o) => t(o, opts.lang);
  returnFocus = document.activeElement;
  const photos = item.gallery && item.gallery.length ? item.gallery : (item.photo ? [item.photo] : []);

  let index = 0;
  const track = h('div', { class: 'gtrack' }, photos.map((src, i) =>
    h('div', { class: 'gslide' },
      h('img', { src, alt: `${item.name} ${i + 1}`, loading: i < 2 ? 'eager' : 'lazy', decoding: 'async' }),
      opts.review ? h('span', { class: 'gnum' }, `#${i + 1}`) : null)));
  const dots = h('div', { class: 'gdots' }, photos.map((_, i) => h('span', { class: 'gdot' + (i === 0 ? ' on' : '') })));
  const setActive = (i) => {
    [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
    counter.textContent = `${i + 1} / ${photos.length}`;
  };
  const go = (i) => {
    index = Math.max(0, Math.min(photos.length - 1, i));
    setActive(index);
    const target = index * track.clientWidth;
    track.scrollTo({ left: target, behavior: 'smooth' });
    // A browser can drop or cut short a smooth scroll (right after a page load, or on rapid taps):
    // if the photo has not arrived after a moment, jump to it.
    setTimeout(() => { if (index * track.clientWidth === target && Math.abs(track.scrollLeft - target) > 4) track.scrollLeft = target; }, 700);
  };
  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (i !== index) index = i;
    setActive(index);
  }, { passive: true });
  const counter = h('span', { class: 'gcount' }, photos.length ? `1 / ${photos.length}` : '');

  const gallery = photos.length
    ? h('div', { class: 'gallery' }, track,
        photos.length > 1 ? h('button', { class: 'gnav prev', type: 'button', 'aria-label': L(ui.prev), onclick: () => go(index - 1) }, '‹') : null,
        photos.length > 1 ? h('button', { class: 'gnav next', type: 'button', 'aria-label': L(ui.next), onclick: () => go(index + 1) }, '›') : null,
        counter)
    : h('div', { class: 'gallery empty' }, item.name);

  const isVenue = !item.bestFor && !item.web && item.id && /venue|mira-mar/.test(item.id);
  const actions = h('div', { class: 'dactions' },
    h('button', { class: 'btn', type: 'button', onclick: () => { closeDetail(); opts.onTalk(item); } }, L(ui.talkAbout)),
    item.web ? h('a', { class: 'btn alt', href: item.web, target: '_blank', rel: 'noopener' }, L(ui.website) + ' →') : null);

  const panel = h('div', { class: 'dpanel', role: 'dialog', 'aria-modal': 'true', 'aria-label': item.name },
    h('button', { class: 'dclose', type: 'button', 'aria-label': L(ui.close), onclick: closeDetail }, '×'),
    gallery,
    dots,
    h('div', { class: 'dbody' },
      item.area ? h('div', { class: 'area' }, item.area) : null,
      item.logo ? h('img', { class: 'logo', src: item.logo, alt: '' }) : null,
      h('h2', {}, item.name),
      h('p', { class: 'dline' }, L(item.line)),
      item.bestFor ? h('p', {}, L(item.bestFor)) : null,
      item.offer ? h('div', { class: 'offerbox' }, h('b', {}, L(copy.offerLabel) + ': '), L(item.offer)) : null,
      item.highlights && item.highlights.length
        ? h('ul', { class: 'hl' }, item.highlights.map((x) => h('li', {}, L(x)))) : null,
      item.rooms || item.meetings
        ? h('p', { class: 'facts' }, [item.rooms ? `${item.rooms.n} ${L(item.rooms.unit)}` : null,
            item.meetings ? `${L(copy.meetingsLabel)}: ${L(item.meetings)}` : null].filter(Boolean).join(' · ')) : null,
      item.roomMix && item.roomMix.length
        ? h('div', { class: 'mix' }, h('b', {}, L(copy.roomMixTitle)),
            h('ul', {}, item.roomMix.map((m) => h('li', {}, h('span', { class: 'n' }, String(m.n)), ' ' + L(m)))))
        : null,
      isVenue && !photos.length ? h('p', {}, L(ui.contactForVenue)) : null,
      actions,
      opts.review ? h('p', { class: 'reviewnote' }, `${photos.length} photo${photos.length === 1 ? '' : 's'} now. ` +
        'To change one, send its number (#) with "replace" or "remove", plus the new file.') : null));

  openEl = h('div', { class: 'doverlay', onclick: (e) => { if (e.target === openEl) closeDetail(); } }, panel);
  document.body.append(openEl);
  document.body.classList.add('noscroll');
  document.addEventListener('keydown', onKey);
  panel.querySelector('.dclose').focus();
}
