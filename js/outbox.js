// Ideas are written to the device first, then sent. Nothing a child writes is lost when the
// internet is down or the inbox is not reachable: it waits here and goes out on a later visit.
import { CONFIG } from './config.js';

const OUTBOX = 'shahr.outbox'; // full messages still to send (may hold a drawing)
const HISTORY = 'shahr.history'; // small record of everything sent from this device (no drawings)

function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

function newId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

/** Save an idea on the device. Returns its history record. */
export function enqueue(message) {
  const item = { ...message, id: newId(), at: new Date().toISOString(), v: CONFIG.version };
  const box = read(OUTBOX);
  box.push(item);
  if (!write(OUTBOX, box)) {
    // Storage is full (most likely a large drawing): keep the words, drop the picture.
    box.pop();
    box.push({ ...item, drawing: null, drawingLost: true });
    write(OUTBOX, box);
  }
  const record = {
    id: item.id, at: item.at, game: item.game, kind: item.kind, rating: item.rating,
    text: (item.text || '').slice(0, 160), hasDrawing: !!item.drawing, sent: false,
  };
  const hist = read(HISTORY);
  hist.unshift(record);
  write(HISTORY, hist.slice(0, 200));
  return record;
}

let flushing = null;

/** Try to send everything that is waiting. Resolves to how many are still waiting. */
export function flush() {
  if (flushing) return flushing;
  flushing = (async () => {
    const url = CONFIG.feedbackEndpoint;
    if (!url || !navigator.onLine) return read(OUTBOX).length;
    for (const item of read(OUTBOX)) {
      let done = false;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        // 4xx (other than "too many") means the inbox refused this message for good:
        // retrying would never work, so stop holding it.
        done = res.ok || (res.status >= 400 && res.status < 500 && res.status !== 429);
        if (done) mark(item.id, res.ok ? 'sent' : 'failed');
      } catch {
        break; // offline or inbox unreachable: keep the rest for next time
      }
      if (!done) break;
      write(OUTBOX, read(OUTBOX).filter((x) => x.id !== item.id));
    }
    return read(OUTBOX).length;
  })().finally(() => { flushing = null; });
  return flushing;
}

function mark(id, flag) {
  const hist = read(HISTORY);
  const rec = hist.find((x) => x.id === id);
  if (rec) { rec[flag] = true; write(HISTORY, hist); }
}

/** Everything sent or saved from this device, newest first; optionally for one game. */
export function history(game) {
  const hist = read(HISTORY);
  return game ? hist.filter((x) => x.game === game) : hist;
}

export function isSent(id) {
  return !!read(HISTORY).find((x) => x.id === id && x.sent);
}
