// Runs one game full-screen inside a frame, with a small pull-down tab for Home / Idea / Full screen.
// The tab matters most when the site is installed as an app, where there is no browser back button.
import { findGame, gamePath, NEW_GAME } from './games.js';
import { applyLang, getLang, pick } from './i18n.js';
import { flush } from './outbox.js';
import { startApp } from './app.js';

applyLang();

const params = new URLSearchParams(location.search);
const game = findGame(params.get('g'));
const stage = document.getElementById('stage');
const tab = document.getElementById('tab');
const bar = document.getElementById('bar');

if (!game || game.id === NEW_GAME.id) {
  document.getElementById('lost').hidden = false;
  document.getElementById('dock').hidden = true;
  stage.hidden = true;
} else {
  const want = params.get('v') || getLang();
  document.title = pick(game.title) + ' — شهرِ بازی';
  stage.title = pick(game.title);
  stage.src = gamePath(game, want);
  document.getElementById('idea').href = 'feedback.html?game=' + game.id;

  // Keyboard games listen inside the frame, so the frame must hold the focus.
  const focusGame = () => { try { stage.focus(); stage.contentWindow.focus(); } catch { /* not loaded yet */ } };
  stage.addEventListener('load', focusGame);

  const open = (yes) => {
    bar.hidden = !yes;
    tab.hidden = yes;
    tab.setAttribute('aria-expanded', String(yes));
    if (!yes) focusGame();
  };
  tab.addEventListener('click', () => open(true));
  document.getElementById('close').addEventListener('click', () => open(false));

  const fullBtn = document.getElementById('full');
  const root = document.documentElement;
  if (!root.requestFullscreen) fullBtn.hidden = true;
  fullBtn.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.requestFullscreen();
    } catch { /* the browser said no: stay as we are */ }
    open(false);
  });
}

startApp();
flush();
