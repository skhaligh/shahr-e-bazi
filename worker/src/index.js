// شهرِ بازی feedback inbox: a tiny Cloudflare Worker.
// The site posts a child's idea here; the Worker files it as an issue in a private GitHub repo.
// The GitHub token lives only here, as a Worker secret, never in the public site.
//
// Settings (wrangler.toml [vars] and one secret):
//   GITHUB_REPO      "owner/name" of the private inbox repo
//   ALLOWED_ORIGINS  comma-separated list of sites that may post
//   DAILY_LIMIT      most ideas accepted in any 24 hours (a brake on abuse)
//   GITHUB_TOKEN     secret: fine-grained token with Issues + Contents read/write on that one repo
//
// Nothing about the sender is stored beyond what they typed: no IP address, no browser details.

const KINDS = ['feature', 'bug', 'new-game'];
const FACES = ['', '😞', '😐', '🙂', '😄', '🤩'];
const KIND_ICON = { feature: '✨', bug: '🔧', 'new-game': '🎮' };
const MAX_BODY = 900_000; // bytes of JSON accepted (a drawing is ~30-150 KB)
const MAX_DRAWING = 700_000; // characters of base64

export default {
  async fetch(request, env) {
    const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get('Origin') || '';
    const originOk = allowed.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': originOk ? origin : allowed[0] || 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };
    const reply = (status, data) =>
      new Response(JSON.stringify(data), { status, headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8' } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method === 'GET') return reply(200, { ok: true, service: 'shahr-e-bazi feedback inbox' });
    if (request.method !== 'POST') return reply(405, { ok: false, error: 'method' });
    if (!originOk) return reply(403, { ok: false, error: 'origin' });
    if (!env.GITHUB_TOKEN || !env.GITHUB_REPO) return reply(503, { ok: false, error: 'not-configured' });

    let raw;
    try {
      raw = await request.text();
    } catch {
      return reply(400, { ok: false, error: 'body' });
    }
    if (raw.length > MAX_BODY) return reply(413, { ok: false, error: 'too-large' });
    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return reply(400, { ok: false, error: 'json' });
    }

    const msg = clean(input);
    if (!msg) return reply(400, { ok: false, error: 'invalid' });

    const gh = github(env);
    try {
      // The brake: refuse once the inbox has taken DAILY_LIMIT ideas in the last 24 hours.
      const limit = Number(env.DAILY_LIMIT) || 100;
      const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const recent = await gh('GET', `/issues?state=all&since=${encodeURIComponent(since)}&per_page=100`);
      const today = Array.isArray(recent) ? recent.filter((i) => i.created_at >= since).length : 0;
      if (today >= limit) return reply(429, { ok: false, error: 'busy' });

      let drawingPath = null;
      if (msg.drawing) {
        drawingPath = `drawings/${msg.at.slice(0, 7)}/${msg.id}.png`;
        await gh('PUT', `/contents/${drawingPath}`, {
          message: `drawing for ${msg.game} idea ${msg.id}`,
          content: msg.drawing,
        });
      }

      const issue = await gh('POST', '/issues', {
        title: title(msg),
        body: body(msg, drawingPath, env.GITHUB_REPO),
        labels: labels(msg),
      });
      return reply(201, { ok: true, number: issue.number });
    } catch (err) {
      return reply(502, { ok: false, error: 'inbox', detail: String(err && err.message).slice(0, 120) });
    }
  },
};

/** Check and tidy what the page sent. Returns null when it is not a usable idea. */
export function clean(input) {
  if (!input || typeof input !== 'object') return null;
  const game = String(input.game || '');
  if (!/^[a-z0-9-]{1,40}$/.test(game)) return null;
  const kind = KINDS.includes(input.kind) ? input.kind : 'feature';
  const rating = Number.isInteger(input.rating) && input.rating >= 1 && input.rating <= 5 ? input.rating : null;
  const text = typeof input.text === 'string' ? input.text.trim().slice(0, 2000) : '';
  const age = Number.isInteger(input.age) && input.age >= 3 && input.age <= 99 ? input.age : null;

  let drawing = null;
  if (typeof input.drawing === 'string' && input.drawing.startsWith('data:image/png;base64,')) {
    const b64 = input.drawing.slice('data:image/png;base64,'.length);
    // "iVBORw0KGgo" is how every PNG file starts once it is base64.
    if (b64.length <= MAX_DRAWING && b64.startsWith('iVBORw0KGgo') && /^[A-Za-z0-9+/]+={0,2}$/.test(b64)) drawing = b64;
  }
  if (!text && !drawing && !rating) return null;

  const id = /^[A-Za-z0-9-]{8,40}$/.test(String(input.id || '')) ? String(input.id) : crypto.randomUUID();
  const sent = new Date(input.at);
  const at = Number.isNaN(sent.getTime()) ? new Date().toISOString() : sent.toISOString();
  return {
    id, at, game, kind, rating, text, age, drawing,
    gameTitle: oneLine(input.gameTitle, 60) || game,
    nickname: oneLine(input.nickname, 30),
    lang: input.lang === 'en' ? 'en' : 'fa',
    v: oneLine(input.v, 12),
  };
}

/** A short single line with nothing that GitHub would read as formatting, a link or a mention. */
function oneLine(value, max) {
  return String(value == null ? '' : value).replace(/[\r\n\t]+/g, ' ').replace(/[`*_~|<>[\]()#@\\]/g, '').trim().slice(0, max);
}

function title(m) {
  const words = oneLine(m.text, 70) || (m.drawing ? '(drawing)' : `${FACES[m.rating]} ${m.rating}/5`);
  return `${KIND_ICON[m.kind]} ${m.gameTitle}: ${words}`;
}

function labels(m) {
  const list = [`game:${m.game}`, `kind:${m.kind}`];
  if (m.rating) list.push(`rating:${m.rating}`);
  return list;
}

function body(m, drawingPath, repo) {
  const lines = [
    `**Game:** ${m.gameTitle} (\`${m.game}\`)`,
    `**Kind:** ${KIND_ICON[m.kind]} ${m.kind}`,
    `**Rating:** ${m.rating ? `${FACES[m.rating]} ${m.rating}/5` : '—'}`,
    `**From:** ${m.nickname || '—'}${m.age ? `, age ${m.age}` : ''}`,
    `**Sent:** ${m.at} · page language ${m.lang}${m.v ? ` · site v${m.v}` : ''}`,
    '',
  ];
  if (m.text) {
    // Inside a fence the child's words are shown exactly as typed and cannot act as formatting.
    lines.push('~~~~text', m.text.replace(/~{3,}/g, '~~'), '~~~~', '');
  }
  if (drawingPath) {
    lines.push(`![drawing](https://github.com/${repo}/blob/main/${drawingPath}?raw=true)`, '', `Drawing file: \`${drawingPath}\``, '');
  }
  // A machine-readable copy for tools/fetch-feedback.mjs.
  const data = { id: m.id, at: m.at, game: m.game, gameTitle: m.gameTitle, kind: m.kind, rating: m.rating, text: m.text, nickname: m.nickname, age: m.age, lang: m.lang, drawing: drawingPath };
  lines.push(`<!-- shahr:${JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/-/g, '\\u002d')} -->`);
  return lines.join('\n');
}

function github(env) {
  return async (method, path, payload) => {
    const res = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'shahr-e-bazi-feedback',
        ...(payload ? { 'Content-Type': 'application/json' } : {}),
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    if (!res.ok) throw new Error(`GitHub ${method} ${path.split('?')[0]} -> ${res.status}`);
    return res.json();
  };
}
