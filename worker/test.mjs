// Tests for the feedback Worker. Run:  node --test worker/test.mjs
// GitHub is replaced by a recorder, so nothing leaves the machine.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { clean } from './src/index.js';

const ENV = { GITHUB_TOKEN: 't', GITHUB_REPO: 'me/inbox', ALLOWED_ORIGINS: 'https://skhaligh.github.io', DAILY_LIMIT: '3' };
const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

function fakeGitHub({ recent = [] } = {}) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    const call = { method: init.method, path: url.replace('https://api.github.com/repos/me/inbox', ''), body: init.body ? JSON.parse(init.body) : null };
    calls.push(call);
    if (call.method === 'GET') return Response.json(recent);
    if (call.method === 'PUT') return Response.json({ content: {} }, { status: 201 });
    return Response.json({ number: 7 }, { status: 201 });
  };
  return calls;
}

const post = (payload, origin = 'https://skhaligh.github.io') =>
  worker.fetch(new Request('https://inbox.example/', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }), ENV);

test('an idea with words, a face and a drawing becomes one issue plus one picture file', async () => {
  const calls = fakeGitHub();
  const res = await post({ id: 'abcd1234-ef', at: '2026-11-26T10:00:00Z', game: 'snake-forest', gameTitle: 'Forest Snake', kind: 'feature', rating: 4, text: 'کاش مار کلاه داشت', nickname: 'شیر دریا', age: 8, lang: 'fa', drawing: PNG });
  assert.equal(res.status, 201);
  assert.deepEqual(await res.json(), { ok: true, number: 7 });
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), 'https://skhaligh.github.io');
  const put = calls.find((c) => c.method === 'PUT');
  assert.equal(put.path, '/contents/drawings/2026-11/abcd1234-ef.png');
  const issue = calls.find((c) => c.method === 'POST').body;
  assert.deepEqual(issue.labels, ['game:snake-forest', 'kind:feature', 'rating:4']);
  assert.match(issue.title, /Forest Snake: کاش مار کلاه داشت/);
  assert.match(issue.body, /شیر دریا, age 8/);
  assert.match(issue.body, /drawings\/2026-11\/abcd1234-ef\.png/);
  const data = JSON.parse(issue.body.match(/<!-- shahr:(.*) -->/)[1]);
  assert.equal(data.text, 'کاش مار کلاه داشت');
  assert.equal(data.drawing, 'drawings/2026-11/abcd1234-ef.png');
});

test('a face alone is enough; an empty message is refused', async () => {
  fakeGitHub();
  assert.equal((await post({ game: 'gulp', rating: 5 })).status, 201);
  assert.equal((await post({ game: 'gulp', text: '   ' })).status, 400);
  assert.equal((await post({ game: 'Bad Game!', text: 'hi' })).status, 400);
});

test('other websites cannot post', async () => {
  const calls = fakeGitHub();
  assert.equal((await post({ game: 'gulp', text: 'hi' }, 'https://elsewhere.example')).status, 403);
  assert.equal(calls.length, 0);
});

test('the daily brake stops a flood', async () => {
  const now = new Date().toISOString();
  const calls = fakeGitHub({ recent: [{ created_at: now }, { created_at: now }, { created_at: now }] });
  assert.equal((await post({ game: 'gulp', text: 'hi' })).status, 429);
  assert.equal(calls.filter((c) => c.method !== 'GET').length, 0);
});

test('typed text cannot break out of its box or tag people', async () => {
  const calls = fakeGitHub();
  await post({ game: 'gulp', text: 'x\n~~~~\n# big @someone --> <b>', nickname: '@boss [link](http://x)', gameTitle: 'Gulp' });
  const issue = calls.find((c) => c.method === 'POST').body;
  assert.ok(!issue.body.includes('\n~~~~\n# big'), 'fence was closed early');
  assert.match(issue.body, /\*\*From:\*\* boss linkhttp:\/\/x/);
  const comment = issue.body.slice(issue.body.indexOf('<!-- shahr:'));
  assert.equal(comment.match(/-->/g).length, 1, 'only the real comment end');
  assert.equal(JSON.parse(issue.body.match(/<!-- shahr:(.*) -->/)[1]).text, 'x\n~~~~\n# big @someone --> <b>');
});

test('a file that is not a PNG is dropped, the words are kept', () => {
  const m = clean({ game: 'gulp', text: 'hi', drawing: 'data:image/png;base64,PHNjcmlwdD4=' });
  assert.equal(m.drawing, null);
  assert.equal(m.text, 'hi');
});

test('preflight and wrong methods', async () => {
  const pre = await worker.fetch(new Request('https://inbox.example/', { method: 'OPTIONS', headers: { Origin: 'https://skhaligh.github.io' } }), ENV);
  assert.equal(pre.status, 204);
  assert.equal((await worker.fetch(new Request('https://inbox.example/', { method: 'DELETE' }), ENV)).status, 405);
});
