# شهرِ بازی (Shahr-e Bazi)

A family landing page for the kids' games, with a page per game where children send ideas for new features and new games.

Live at **https://skhaligh.github.io/shahr-e-bazi/** (GitHub Pages, from `main`).

No build step, no dependencies: plain HTML, CSS and ES modules. No ads, no tracking, no accounts.

## Run locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## What is where

| Path | What it is |
|---|---|
| `index.html`, `js/home.js` | The shelf of game cards, the new-game idea box and the "Ideas we built" wall |
| `play.html`, `js/play.js` | Runs one game full screen in a frame, with a pull-down tab: Home, Idea, Full screen |
| `feedback.html`, `js/feedback.js` | The idea page for each game (`feedback.html?game=<id>`) and for brand-new games (`?game=new-game`) |
| `js/games.js` | The list of games: id, folder, titles and blurbs in Farsi and English |
| `js/art.js` | Code-drawn cover pictures, one per game |
| `js/i18n.js` | All page text in Farsi and English |
| `js/outbox.js` | Saves each idea on the device first, then sends it; retries on later visits |
| `js/config.js` | The inbox address (`feedbackEndpoint`) and the site version |
| `data/built.json` | The "Ideas we built" wall |
| `games/<id>/` | The games themselves, copied in as they are |
| `sw.js`, `manifest.webmanifest`, `icons/` | Install-as-app support and offline play |
| `worker/` | The Cloudflare Worker that receives ideas and files them in the private inbox |
| `tools/fetch-feedback.mjs` | Reads the inbox and prints the ideas grouped by game |

## Add or update a game

1. Copy its files to `games/<id>/` (it must start from `index.html` and use relative paths).
2. Add an entry to `GAMES` in `js/games.js`.
3. Add a cover for the same id in `js/art.js` (without one it gets the light-bulb picture).
4. Bump `VERSION` in `sw.js` and `version` in `js/config.js`, then commit and push.

Where each game came from: `orbie`, `orbie-fa`, `hoot` are the single-file builds of the `orbies-journey` repo; `yeki-bud` and `dast-be-dast` are the `dist.nosync/` builds of `Pahlevan-Kuchuloo`; `cue-cards` is the Codex Apps root project; the rest are single HTML files.

## Feedback inbox

Kids' ideas go: page → Cloudflare Worker (`worker/`) → an issue in the private repo `skhaligh/shahr-e-bazi-feedback`, labelled `game:<id>`, `kind:<feature|bug|new-game>` and `rating:<1-5>`. Drawings are saved in that repo under `drawings/`. The Worker exists so the GitHub token never appears in this public site.

The form never closes: a child can send as many ideas as they like. Each idea is saved on the device before it is sent, so nothing is lost offline; it goes out the next time a page of the site opens with internet.

### One-time setup

1. Create a free Cloudflare account at https://dash.cloudflare.com/sign-up.
2. On GitHub, create a fine-grained personal access token (Settings → Developer settings → Fine-grained tokens): repository access **only** `shahr-e-bazi-feedback`; permissions **Issues: Read and write** and **Contents: Read and write**.
3. In a terminal:

   ```bash
   cd worker
   npx wrangler login
   npx wrangler deploy
   npx wrangler secret put GITHUB_TOKEN
   ```

   Paste the token when the last command asks for it.
4. Put the address that `wrangler deploy` printed (`https://shahr-e-bazi-feedback.<your-name>.workers.dev`) into `feedbackEndpoint` in `js/config.js`, bump `VERSION` in `sw.js`, commit and push.

Test the Worker without Cloudflare: `node --test worker/test.mjs`.

### Read the ideas

```bash
node tools/fetch-feedback.mjs              # open ideas, grouped by game
node tools/fetch-feedback.mjs --drawings   # also download the drawings to feedback-inbox/
node tools/fetch-feedback.mjs --since 2026-12-01 --game snake-forest
```

When an idea has been dealt with, close its issue so it drops out of the list:

```bash
gh issue close <number> -R skhaligh/shahr-e-bazi-feedback
```

### The "Ideas we built" wall

When an idea is built, add it to `data/built.json` and push:

```json
[
  {
    "game": "snake-forest",
    "idea": { "fa": "مار حالا می‌تواند کلاه بگذارد", "en": "The snake can now wear a hat" },
    "by": "شیر دریا",
    "date": "2026-12-20"
  }
]
```

Use the child's nickname only, never a real name.

## Deploy

Push to `main`; GitHub Pages publishes in about a minute. This repo is public, so commits use the `skhaligh` no-reply identity and `.claude/` is ignored.

## Notes

- `cue-cards` loads its photos from loremflickr.com and `skybound` loads three.js from cdnjs, so those two need internet. Some games load Google Fonts and fall back to system fonts without it.
- All games share one browser storage area (same site), so each keeps its own save keys.
