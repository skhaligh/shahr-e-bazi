// شهرِ بازی service worker.
// Site pages: fresh from the network when online, saved copy when offline.
// A game's own page: fresh when online too, so a fix reaches the kids the first time they open it.
// A game's other files and fonts: saved copy first (big, rarely change), refreshed in the background.
// Bump VERSION whenever site files change, so installed copies pick up the new ones.
const VERSION = 'v3';
const SHELL_CACHE = 'shahr-shell-' + VERSION;
const GAMES_CACHE = 'shahr-games'; // same name as in js/app.js

const SHELL = [
  './',
  'index.html',
  'play.html',
  'feedback.html',
  'css/site.css',
  'js/app.js',
  'js/art.js',
  'js/config.js',
  'js/feedback.js',
  'js/games.js',
  'js/home.js',
  'js/i18n.js',
  'js/outbox.js',
  'js/play.js',
  'data/built.json',
  'fonts/Vazirmatn-wght.woff2',
  'icons/icon.svg',
  'icons/icon-192.png',
  'manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('shahr-shell-') && k !== SHELL_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // fonts and photos from other sites go straight out

  const scope = new URL(self.registration.scope).pathname;
  const path = url.pathname.slice(scope.length);
  const stored = path.startsWith('games/') || path.startsWith('fonts/');
  const isPage = req.mode === 'navigate' || req.destination === 'document' || req.destination === 'iframe';
  if (stored && isPage) event.respondWith(networkFirst(req, GAMES_CACHE));
  else if (stored) event.respondWith(savedFirst(req));
  else event.respondWith(networkFirst(req));
});

async function savedFirst(req) {
  const cache = await caches.open(GAMES_CACHE);
  const saved = await cache.match(req);
  const fresh = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  if (saved) {
    fresh.catch(() => {});
    return saved;
  }
  return fresh;
}

async function networkFirst(req, cacheName = SHELL_CACHE) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    // play.html?g=snake and feedback.html?game=snake are the same file as their bare names.
    const saved = (await cache.match(req)) || (await cache.match(req, { ignoreSearch: true }));
    if (saved) return saved;
    throw err;
  }
}
