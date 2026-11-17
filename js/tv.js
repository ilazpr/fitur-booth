// TV loop. Local files only, no network. ?fast=1 shortens slides for testing.
import { brands, venues, tours, numbers, copy, restaurants } from './content.js';

const FAST = new URLSearchParams(document.documentElement.dataset.qs || location.search).has('fast'); // data-qs: set by the review hub
const secs = (n) => (FAST ? Math.max(0.8, n / 5) : n) * 1000;
const stage = document.getElementById('stage');

const h = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (v != null && v !== false) n.setAttribute(k, v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k instanceof Node ? k : document.createTextNode(k));
  return n;
};

// Bottom strip: every brand, always on.
const strip = document.getElementById('strip');
for (const b of brands) strip.append(b.logo ? h('img', { src: b.logo, alt: b.name }) : h('span', {}, b.name));

function caption(item) {
  return h('div', { class: 'cap' },
    item.area ? h('div', { class: 'area' }, item.area) : null,
    h('h2', { class: 'name' }, item.name),
    h('p', { class: 'es' }, item.line.en),   // English is the main line (class name kept for styling)
    h('p', { class: 'en' }, item.line.es));  // Spanish underneath
}

function photoSlide(item) {
  const s = h('div', { class: item.photo ? 'slide' : 'slide plain' });
  if (item.photo) s.append(h('div', { class: 'bg', style: `background-image:url(${item.photo});background-size:cover;background-position:center` }));
  s.append(h('div', { class: 'shade' }), caption(item));
  return { el: s, ms: secs(4.5) };
}

const slides = [];

// 1. Hook video with the promise line fading in.
{
  const v = h('video', { src: 'assets/video/hook.mp4', poster: 'assets/video/hook-poster.jpg', muted: '', playsinline: '', preload: 'auto' });
  v.muted = true;
  const late = h('div', { class: 'center fade-late' },
    h('p', { class: 'hook' }, copy.hook.en), h('p', { class: 'hook-en' }, copy.hook.es));
  const el = h('div', { class: 'slide' }, v, h('div', { class: 'shade' }), late);
  slides.push({
    el, ms: secs(21),
    enter() { v.currentTime = 0; v.play().catch(() => {}); late.classList.remove('show'); this.t = setTimeout(() => late.classList.add('show'), secs(8)); },
    leave() { clearTimeout(this.t); v.pause(); },
  });
}

// 2. The three numbers.
slides.push({
  ms: secs(7),
  el: h('div', { class: 'slide plain' }, h('div', { class: 'center' },
    h('p', { class: 'nbrand' }, copy.brand.en),
    h('p', { class: 'nline' }, copy.brandLine.en + ' · ' + copy.brandLine.es),
    h('div', { class: 'nums' }, Object.values(numbers).map((n) =>
      h('div', {}, h('b', {}, n.value), h('span', { class: 'es' }, n.label.en), h('span', { class: 'en' }, n.label.es)))))),
});

// 3. Brands, venues, tours, restaurants.
for (const b of brands) slides.push(photoSlide(b));
for (const v of venues) slides.push(photoSlide(v));
for (const x of tours) slides.push(photoSlide(x));
slides.push(photoSlide({
  name: 'Restaurants · Restaurantes', photo: restaurants.photo,
  line: { es: copy.restaurantsLine.es, en: copy.restaurantsLine.en },  // shown as EN main, ES second
}));

// 4. Logo wall.
slides.push({
  ms: secs(6),
  el: h('div', { class: 'slide wall' }, h('div', { class: 'wbrand' }, copy.brand.en), h('div', { class: 'grid' }, brands.map((b) =>
    b.logo ? h('img', { src: b.logo, alt: b.name }) : h('span', {}, b.name)))),
});

for (const s of slides) stage.append(s.el);

let i = -1;
function next() {
  const prev = slides[i];
  if (prev) { prev.el.classList.remove('on'); if (prev.leave) prev.leave(); }
  i = (i + 1) % slides.length;
  const cur = slides[i];
  cur.el.classList.add('on');
  if (cur.enter) cur.enter();
  setTimeout(next, cur.ms);
}
next();

// Safety net for an unattended screen: if the page ever stalls, reload it.
let last = Date.now();
setInterval(() => { last = Date.now(); }, 1000);
setInterval(() => { if (Date.now() - last > 15000) location.reload(); }, 5000);
window.__tvSlides = slides.length; // for the check script
