// One feedback page serves every game: feedback.html?game=<id>.
// The form never closes: after sending, "Another idea" brings back a fresh one.
import { findGame, NEW_GAME, GAMES } from './games.js';
import { cover, LOGO } from './art.js';
import { t, pick, num, getLang, setLang, applyLang } from './i18n.js';
import { enqueue, flush, history } from './outbox.js';
import { startApp } from './app.js';

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const game = findGame(params.get('game')) || NEW_GAME;
const isNew = game.id === NEW_GAME.id;

const state = { rating: null, kind: isNew ? 'new-game' : 'feature' };

// ---------- drawing pad ----------
const COLORS = ['#2A1F3D', '#FF5A4F', '#FF9A3C', '#FFCE3A', '#3CC47C', '#3D8BFF', '#8B5CF6', '#FFFFFF'];
const pad = $('pad');
const ctx = pad.getContext('2d');
let strokes = []; // each: { color, width, points: [[x, y], ...] }
let current = null;
let color = COLORS[0];

function redraw() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, pad.width, pad.height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const s of strokes) {
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.lineWidth = s.width;
    if (s.points.length === 1) {
      ctx.beginPath(); ctx.arc(s.points[0][0], s.points[0][1], s.width / 2, 0, Math.PI * 2); ctx.fill();
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(s.points[0][0], s.points[0][1]);
    for (let i = 1; i < s.points.length; i++) ctx.lineTo(s.points[i][0], s.points[i][1]);
    ctx.stroke();
  }
}

function at(e) {
  const r = pad.getBoundingClientRect();
  return [Math.round((e.clientX - r.left) * (pad.width / r.width)), Math.round((e.clientY - r.top) * (pad.height / r.height))];
}

pad.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  pad.setPointerCapture(e.pointerId);
  current = { color, width: color === '#FFFFFF' ? 34 : 9, points: [at(e)] };
  strokes.push(current);
  redraw();
});
pad.addEventListener('pointermove', (e) => {
  if (!current) return;
  e.preventDefault();
  current.points.push(at(e));
  redraw();
});
const endStroke = () => { current = null; };
pad.addEventListener('pointerup', endStroke);
pad.addEventListener('pointercancel', endStroke);

$('undo').addEventListener('click', () => { strokes.pop(); redraw(); });
$('clear').addEventListener('click', () => { strokes = []; redraw(); });

function renderSwatches() {
  $('swatches').innerHTML = COLORS.map((c) => {
    const eraser = c === '#FFFFFF';
    return `<button type="button" class="swatch" role="radio" aria-checked="${c === color}" data-c="${c}" style="--sw:${c}" aria-label="${eraser ? t('eraser') : c}" title="${eraser ? t('eraser') : ''}"></button>`;
  }).join('');
}
$('swatches').addEventListener('click', (e) => {
  const b = e.target.closest('.swatch');
  if (!b) return;
  color = b.dataset.c;
  renderSwatches();
});

/** The drawing as a PNG data URL, or null when the pad is empty. */
function drawingData() {
  const inked = strokes.some((s) => s.color !== '#FFFFFF');
  return inked ? pad.toDataURL('image/png') : null;
}

// ---------- choices ----------
function radioGroup(box, key) {
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[role="radio"]');
    if (!b) return;
    const v = key === 'rating' ? Number(b.dataset.v) : b.dataset.v;
    // Tapping the chosen face again un-chooses it; an idea type always stays chosen.
    state[key] = key === 'rating' && state[key] === v ? null : v;
    syncChoices();
  });
}
function syncChoices() {
  for (const b of $('faces').children) b.setAttribute('aria-checked', String(Number(b.dataset.v) === state.rating));
  for (const b of $('kinds').children) b.setAttribute('aria-checked', String(b.dataset.v === state.kind));
}
radioGroup($('faces'), 'rating');
radioGroup($('kinds'), 'kind');

// ---------- remembered nickname ----------
try {
  $('nick').value = localStorage.getItem('shahr.nick') || '';
  $('age').value = localStorage.getItem('shahr.age') || '';
} catch { /* private mode */ }

// ---------- page text ----------
function render() {
  applyLang();
  $('title').textContent = isNew ? t('fbForNew') : t('fbFor', { g: pick(game.title) });
  $('text').placeholder = isNew ? t('s3phNew') : t('s3ph');
  document.title = (isNew ? t('heroIdea') : pick(game.title) + ' · ' + t('idea')) + ' — شهرِ بازی';
  // The new-game box has no game to rate and only one kind of idea, so those steps are hidden.
  $('step-rate').hidden = isNew;
  $('step-kind').hidden = isNew;
  let n = 0;
  for (const id of ['n-rate', 'n-kind', 'n-text', 'n-draw', 'n-who']) {
    const hiddenStep = isNew && (id === 'n-rate' || id === 'n-kind');
    if (!hiddenStep) $(id).textContent = num(++n);
  }
  renderSwatches();
  renderMine();
}

function renderMine() {
  const list = history(game.id);
  $('mine').hidden = list.length === 0;
  const icon = { feature: '✨', bug: '🔧', 'new-game': '🎮' };
  const faces = ['', '😞', '😐', '🙂', '😄', '🤩'];
  const fmt = new Intl.DateTimeFormat(getLang() === 'fa' ? 'fa-IR' : 'en-GB', { dateStyle: 'medium' });
  $('mine-list').innerHTML = list.map((x) => {
    const words = x.text || (x.hasDrawing ? t('drawing') : t('rated'));
    const st = x.sent ? ['ok', t('stSent')] : x.failed ? ['wait', t('stFail')] : ['wait', t('stWait')];
    const li = document.createElement('li');
    li.innerHTML = `<span class="e">${icon[x.kind] || '💡'}</span><span class="t"><span class="w"></span><span class="when"></span></span><span class="st ${st[0]}"></span>`;
    li.querySelector('.w').textContent = words + (x.rating ? ' ' + faces[x.rating] : '') + (x.text && x.hasDrawing ? ' 🎨' : '');
    li.querySelector('.when').textContent = fmt.format(new Date(x.at));
    li.querySelector('.st').textContent = st[1];
    return li.outerHTML;
  }).join('');
}

// ---------- sending ----------
$('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = $('text').value.trim();
  const drawing = drawingData();
  if (!text && !drawing && !state.rating) {
    $('msg').textContent = t('needOne');
    return;
  }
  $('msg').textContent = '';
  if ($('website').value) return showThanks(true); // a robot: act as if it worked, send nothing

  const nickname = $('nick').value.trim().slice(0, 30);
  const ageNum = parseInt($('age').value, 10);
  const age = ageNum >= 3 && ageNum <= 99 ? ageNum : null;
  try {
    localStorage.setItem('shahr.nick', nickname);
    localStorage.setItem('shahr.age', age ? String(age) : '');
  } catch { /* ignore */ }

  const send = $('send');
  send.disabled = true;
  send.textContent = t('sending');
  const record = enqueue({
    game: game.id,
    gameTitle: isNew ? NEW_GAME.title.en : (GAMES.find((g) => g.id === game.id)?.title.en || game.id),
    kind: state.kind,
    rating: isNew ? null : state.rating,
    text, nickname, age, drawing,
    lang: getLang(),
  });
  await flush();
  send.disabled = false;
  send.textContent = t('send');
  const delivered = history(game.id).find((x) => x.id === record.id)?.sent === true;
  showThanks(delivered);
});

function showThanks(delivered) {
  $('form').hidden = true;
  $('thanks').hidden = false;
  $('thanks-emoji').textContent = delivered ? '🎉' : '📮';
  $('thanks-title').textContent = t(delivered ? 'thanksT' : 'savedT');
  $('thanks-text').textContent = t(delivered ? 'thanksP' : 'savedP');
  renderMine();
  confetti();
  $('thanks').scrollIntoView({ block: 'center', behavior: 'smooth' });
  $('again').focus({ preventScroll: true });
}

$('again').addEventListener('click', () => {
  // A fresh form: keep the nickname and age, clear the idea itself.
  state.rating = null;
  state.kind = isNew ? 'new-game' : 'feature';
  $('text').value = '';
  strokes = [];
  redraw();
  syncChoices();
  $('thanks').hidden = true;
  $('form').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = document.createElement('div');
  box.className = 'confetti';
  const colors = ['#FF5A4F', '#FFCE3A', '#3CC47C', '#3D8BFF', '#8B5CF6', '#FF6FA8'];
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = 1.6 + Math.random() * 1.6 + 's';
    p.style.animationDelay = Math.random() * 0.5 + 's';
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4200);
}

// ---------- start ----------
$('logo').innerHTML = LOGO;
$('pic').innerHTML = cover(game.id);
if (!isNew) {
  $('playlink').hidden = false;
  $('playlink').href = 'play.html?g=' + game.id;
}
$('lang').addEventListener('click', () => { setLang(getLang() === 'fa' ? 'en' : 'fa'); render(); });
redraw();
syncChoices();
render();
startApp();
flush().then(renderMine);
