import { GAMES, gamePath } from './games.js';
import { cover, LOGO, CITY } from './art.js';
import { t, pick, getLang, setLang, applyLang } from './i18n.js';
import { flush } from './outbox.js';
import { CONFIG } from './config.js';
import { startApp } from './app.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function langChip(game) {
  if (game.langs.length > 1) return t('langBoth');
  return game.langs[0] === 'fa' ? t('langFa') : t('langEn');
}

function playButtons(game) {
  if (game.variants) {
    return game.variants
      .map((v) => `<a class="btn green play" href="play.html?g=${game.id}&v=${v.lang}">${t(v.lang === 'fa' ? 'playFa' : 'playEn')}</a>`)
      .join('');
  }
  return `<a class="btn green play" href="play.html?g=${game.id}">${t('play')}</a>`;
}

function renderCards() {
  document.getElementById('cards').innerHTML = GAMES.map((g) => `
    <article class="card" style="--c:${g.color}">
      <div class="cover">${cover(g.id)}</div>
      <div class="body">
        <div class="chips"><span class="chip">${esc(pick(g.kind))}</span><span class="chip plain">${esc(langChip(g))}</span></div>
        <h3>${esc(pick(g.title))}</h3>
        <p>${esc(pick(g.blurb))}</p>
        <div class="row">
          ${playButtons(g)}
          <a class="btn yellow" href="feedback.html?game=${g.id}">${t('idea')}</a>
        </div>
      </div>
    </article>`).join('');
}

let built = [];
function renderWall() {
  const el = document.getElementById('wall');
  if (!built.length) {
    el.className = '';
    el.innerHTML = `<div class="empty"><span class="big">🧱</span>${esc(t('wallEmptyA'))}<br>${esc(t('wallEmptyB'))}</div>`;
    return;
  }
  el.className = 'wall';
  el.innerHTML = built.map((b) => {
    const game = GAMES.find((g) => g.id === b.game);
    return `<div class="note">
      <div class="game">${esc(game ? pick(game.title) : t('kNew'))}</div>
      <div class="text">${esc(pick(b.idea))}</div>
      ${b.by ? `<div class="by">💡 ${esc(t('by'))} ${esc(b.by)}</div>` : ''}
    </div>`;
  }).join('');
}

function render() {
  applyLang();
  renderCards();
  renderWall();
}

document.getElementById('logo').innerHTML = LOGO;
document.getElementById('city').innerHTML = CITY;
document.getElementById('newpic').innerHTML = cover('new-game');
document.getElementById('ver').textContent = 'v' + CONFIG.version;
document.getElementById('lang').addEventListener('click', () => { setLang(getLang() === 'fa' ? 'en' : 'fa'); render(); });
render();

fetch('data/built.json').then((r) => (r.ok ? r.json() : [])).then((list) => { built = Array.isArray(list) ? list : []; renderWall(); }).catch(() => {});

startApp({ warm: GAMES.flatMap((g) => (g.variants ? g.variants.map((v) => v.path) : [gamePath(g)])) });
flush();
