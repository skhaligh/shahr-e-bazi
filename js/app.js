// Install-as-app support: registers the service worker, wires the install button,
// and quietly saves the games for offline play.
const CACHE = 'shahr-games';

export function startApp({ warm = [] } = {}) {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('sw.js').catch(() => {});
  wireInstall();
  if (warm.length) whenIdle(() => warmGames(warm));
}

function whenIdle(fn) {
  const run = () => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 8000 }) : setTimeout(fn, 3000));
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
}

/** Fetch each game's start page once so it opens without internet later. Skipped on data-saver. */
async function warmGames(paths) {
  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;
  try {
    const cache = await caches.open(CACHE);
    for (const p of paths) {
      const url = new URL(p, location.href).href;
      if (await cache.match(url)) continue;
      try { await cache.add(url); } catch { /* try again on a later visit */ }
    }
  } catch { /* no cache storage: nothing to do */ }
}

function wireInstall() {
  const btn = document.getElementById('install');
  if (!btn) return;
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (standalone) return;

  let deferred = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    btn.hidden = false;
  });
  window.addEventListener('appinstalled', () => { btn.hidden = true; });

  // iPhone and iPad have no install prompt: show the three steps instead.
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios) btn.hidden = false;

  btn.addEventListener('click', async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice.catch(() => {});
      deferred = null;
      btn.hidden = true;
    } else {
      document.getElementById('ios')?.showModal();
    }
  });
}
