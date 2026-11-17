// Offline cache for the phone page. Bump CACHE on every deploy.
// - Page files: serve the saved copy instantly, refresh it in the background (stale-while-revalidate).
// - Photos and logos: save on first view, then serve from the phone (cache-first).
// - Video, other sites and the lead POST are never touched.
const CACHE = 'fitur-20261117-100953';
const SHELL = [
  './', 'index.html', 'css/base.css', 'assets/hero.webp',
  'js/page.js', 'js/content.js', 'js/i18n.js', 'js/form.js', 'js/leads.js', 'js/routing.js', 'js/config.js', 'js/detail.js', 'js/sheet.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.allSettled(SHELL.map((u) => c.add(u)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (req.headers.has('range') || /\.(mp4|webm)$/i.test(url.pathname)) return; // video needs range requests
  const isImage = /\.(webp|jpg|jpeg|png|svg)$/i.test(url.pathname);

  if (isImage) {
    e.respondWith(caches.open(CACHE).then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    }));
    return;
  }

  e.respondWith(caches.open(CACHE).then(async (c) => {
    const hit = await c.match(req, { ignoreSearch: true });
    const refresh = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || refresh;
  }));
});
