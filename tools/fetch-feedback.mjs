#!/usr/bin/env node
// Read the kids' ideas from the private inbox repo and print them grouped by game.
//
//   node tools/fetch-feedback.mjs                 open ideas, newest first
//   node tools/fetch-feedback.mjs --all           also the ones already closed (handled)
//   node tools/fetch-feedback.mjs --since 2026-12-01
//   node tools/fetch-feedback.mjs --game snake-forest
//   node tools/fetch-feedback.mjs --drawings      also download the drawings into feedback-inbox/
//   node tools/fetch-feedback.mjs --json          raw records instead of the readable report
//
// Needs the GitHub CLI (`gh`) signed in to the account that owns the inbox repo.
// When an idea is dealt with, close its issue:  gh issue close <number> -R skhaligh/shahr-e-bazi-feedback
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = process.env.FEEDBACK_REPO || 'skhaligh/shahr-e-bazi-feedback';
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);

const gh = (path) => JSON.parse(execFileSync('gh', ['api', '--paginate', '--slurp', path], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })).flat();

const state = flag('--all') ? 'all' : 'open';
const issues = gh(`repos/${REPO}/issues?state=${state}&per_page=100&sort=created&direction=desc`).filter((i) => !i.pull_request);

const FACES = ['', '😞', '😐', '🙂', '😄', '🤩'];
const ICON = { feature: '✨', bug: '🔧', 'new-game': '🎮' };

let ideas = issues.map((issue) => {
  // The Worker leaves a machine-readable copy at the end of each issue.
  const m = issue.body && issue.body.match(/<!-- shahr:(.*) -->/);
  let data = {};
  if (m) {
    try { data = JSON.parse(m[1]); } catch { /* fall back to labels below */ }
  }
  const label = (prefix) => (issue.labels.find((l) => l.name.startsWith(prefix)) || { name: '' }).name.slice(prefix.length);
  return {
    number: issue.number,
    open: issue.state === 'open',
    url: issue.html_url,
    at: data.at || issue.created_at,
    game: data.game || label('game:') || 'unknown',
    gameTitle: data.gameTitle || label('game:') || 'unknown',
    kind: data.kind || label('kind:') || 'feature',
    rating: data.rating ?? (Number(label('rating:')) || null),
    text: data.text || '',
    nickname: data.nickname || '',
    age: data.age || null,
    lang: data.lang || '',
    drawing: data.drawing || null,
    comments: issue.comments,
  };
});

const since = value('--since');
if (since) ideas = ideas.filter((i) => i.at >= since);
const only = value('--game');
if (only) ideas = ideas.filter((i) => i.game === only);

if (flag('--drawings')) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'feedback-inbox');
  for (const idea of ideas.filter((i) => i.drawing)) {
    const file = join(root, `${String(idea.number).padStart(4, '0')}-${idea.game}.png`);
    mkdirSync(dirname(file), { recursive: true });
    const blob = JSON.parse(execFileSync('gh', ['api', `repos/${REPO}/contents/${idea.drawing}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
    writeFileSync(file, Buffer.from(blob.content, 'base64'));
    idea.drawingFile = file;
  }
}

if (flag('--json')) {
  console.log(JSON.stringify(ideas, null, 2));
  process.exit(0);
}

if (!ideas.length) {
  console.log(`No ${state === 'open' ? 'open ' : ''}ideas in ${REPO}${since ? ` since ${since}` : ''}.`);
  process.exit(0);
}

const byGame = new Map();
for (const idea of ideas) {
  if (!byGame.has(idea.game)) byGame.set(idea.game, []);
  byGame.get(idea.game).push(idea);
}

console.log(`# Ideas from شهرِ بازی — ${ideas.length} ${state === 'open' ? 'open' : 'in total'}${since ? `, since ${since}` : ''}\n`);
for (const [game, list] of [...byGame].sort((a, b) => b[1].length - a[1].length)) {
  const rated = list.filter((i) => i.rating);
  const avg = rated.length ? (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1) : null;
  const kinds = ['feature', 'bug', 'new-game'].map((k) => [k, list.filter((i) => i.kind === k).length]).filter(([, n]) => n).map(([k, n]) => `${ICON[k]} ${n}`).join('  ');
  console.log(`## ${list[0].gameTitle} (${game}) — ${list.length} idea${list.length === 1 ? '' : 's'}${avg ? `, fun ${avg}/5 from ${rated.length}` : ''}   ${kinds}\n`);
  for (const i of list) {
    const who = [i.nickname, i.age ? `age ${i.age}` : ''].filter(Boolean).join(', ') || 'no name';
    const head = `- #${i.number} ${ICON[i.kind] || '💡'} ${i.at.slice(0, 10)} · ${who}${i.rating ? ` · ${FACES[i.rating]} ${i.rating}/5` : ''}${i.open ? '' : ' · closed'}`;
    console.log(head);
    if (i.text) console.log(i.text.split('\n').map((l) => `    ${l}`).join('\n'));
    if (i.drawing) console.log(`    🎨 drawing: ${i.drawingFile || i.drawing}`);
  }
  console.log('');
}
