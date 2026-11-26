const cuePool = [
  { id: "red", text: "Is red" },
  { id: "blue", text: "Is blue" },
  { id: "wheels", text: "Has wheels" },
  { id: "eat", text: "You can eat it" },
  { id: "water", text: "Lives in water" },
  { id: "wings", text: "Has wings" },
  { id: "soft", text: "Is soft" },
  { id: "loud", text: "Can be loud" },
  { id: "toy", text: "Is a toy" },
  { id: "ground", text: "Grows in the ground" },
  { id: "yellow", text: "Is yellow" },
  { id: "small", text: "Is small" },
  { id: "big", text: "Is big" },
  { id: "fly", text: "Can fly" },
  { id: "swim", text: "Can swim" },
  { id: "hug", text: "You can hug it" },
  { id: "tail", text: "Has a tail" },
  { id: "fast", text: "Can move fast" },
  { id: "house", text: "Lives in a house" },
  { id: "round", text: "Is round" },
  { id: "sweet", text: "Is sweet" },
];

const pictureCards = [
  { id: "apple", name: "Apple", keyword: "apple-fruit", tags: ["red", "eat", "round", "small", "sweet"] },
  { id: "banana", name: "Banana", keyword: "banana-fruit", tags: ["yellow", "eat", "sweet"] },
  { id: "fish", name: "Fish", keyword: "fish-animal", tags: ["water", "swim", "small"] },
  { id: "cat", name: "Cat", keyword: "cat-animal", tags: ["soft", "tail", "house", "small"] },
  { id: "dog", name: "Dog", keyword: "dog-animal", tags: ["soft", "tail", "house", "loud"] },
  {
    id: "firetruck",
    name: "Fire truck",
    keyword: "fire-truck",
    tags: ["red", "wheels", "loud", "big", "fast"],
  },
  { id: "balloon", name: "Balloon", keyword: "balloon", tags: ["fly", "round", "small"] },
  { id: "teddybear", name: "Teddy bear", keyword: "teddy-bear-toy", tags: ["toy", "soft", "hug"] },
  { id: "pizza", name: "Pizza", keyword: "pizza", tags: ["eat", "round", "small"] },
  { id: "duck", name: "Duck", keyword: "duck-bird", tags: ["water", "wings", "swim", "fly"] },
  { id: "car", name: "Car", keyword: "car", tags: ["wheels", "fast", "loud", "big"] },
  { id: "bicycle", name: "Bicycle", keyword: "bicycle", tags: ["wheels", "fast", "small"] },
  { id: "boat", name: "Boat", keyword: "boat", tags: ["water", "swim", "big"] },
  { id: "train", name: "Train", keyword: "train", tags: ["wheels", "fast", "loud", "big"] },
  { id: "orange", name: "Orange", keyword: "orange-fruit", tags: ["eat", "round", "sweet"] },
  { id: "broccoli", name: "Broccoli", keyword: "broccoli", tags: ["eat", "ground", "small"] },
  { id: "robot", name: "Robot", keyword: "toy-robot", tags: ["toy", "loud", "big"] },
  { id: "dino", name: "Dinosaur toy", keyword: "dinosaur-toy", tags: ["toy", "big", "tail"] },
  { id: "cup", name: "Cup", keyword: "cup", tags: ["small", "house"] },
  { id: "pillow", name: "Pillow", keyword: "pillow", tags: ["soft", "house", "hug"] },
  { id: "bus", name: "Bus", keyword: "school-bus", tags: ["wheels", "big", "loud", "yellow"] },
  { id: "helicopter", name: "Helicopter", keyword: "helicopter", tags: ["fly", "loud", "big", "fast"] },
  { id: "airplane", name: "Airplane", keyword: "airplane", tags: ["fly", "big", "fast"] },
  { id: "motorcycle", name: "Motorcycle", keyword: "motorcycle", tags: ["wheels", "loud", "fast", "small"] },
  { id: "tractor", name: "Tractor", keyword: "tractor", tags: ["wheels", "big", "loud"] },
  { id: "submarine", name: "Submarine", keyword: "submarine", tags: ["water", "big"] },
  { id: "shark", name: "Shark", keyword: "shark", tags: ["water", "swim", "big", "tail"] },
  { id: "whale", name: "Whale", keyword: "whale", tags: ["water", "swim", "big"] },
  { id: "frog", name: "Frog", keyword: "frog", tags: ["water", "small"] },
  { id: "turtle", name: "Turtle", keyword: "turtle", tags: ["water", "small"] },
  { id: "penguin", name: "Penguin", keyword: "penguin", tags: ["wings", "water", "small"] },
  { id: "parrot", name: "Parrot", keyword: "parrot", tags: ["wings", "fly", "small"] },
  { id: "owl", name: "Owl", keyword: "owl", tags: ["wings", "fly"] },
  { id: "horse", name: "Horse", keyword: "horse", tags: ["big", "fast", "tail"] },
  { id: "rabbit", name: "Rabbit", keyword: "rabbit", tags: ["small", "soft"] },
  { id: "lion", name: "Lion", keyword: "lion", tags: ["big", "tail", "loud"] },
  { id: "elephant", name: "Elephant", keyword: "elephant", tags: ["big"] },
  { id: "giraffe", name: "Giraffe", keyword: "giraffe", tags: ["big"] },
  { id: "strawberry", name: "Strawberry", keyword: "strawberry", tags: ["red", "eat", "sweet", "small"] },
  { id: "watermelon", name: "Watermelon", keyword: "watermelon", tags: ["eat", "sweet", "big", "round"] },
  { id: "carrot", name: "Carrot", keyword: "carrot", tags: ["eat", "ground", "small"] },
  { id: "potato", name: "Potato", keyword: "potato", tags: ["eat", "ground", "small"] },
  { id: "tomato", name: "Tomato", keyword: "tomato", tags: ["red", "eat", "round", "small"] },
  { id: "donut", name: "Donut", keyword: "donut", tags: ["eat", "round", "sweet"] },
  { id: "cookie", name: "Cookie", keyword: "cookie", tags: ["eat", "round", "sweet", "small"] },
  { id: "cake", name: "Cake", keyword: "birthday-cake", tags: ["eat", "sweet", "big"] },
  { id: "icecream", name: "Ice cream", keyword: "ice-cream", tags: ["eat", "sweet", "small"] },
  { id: "lollipop", name: "Lollipop", keyword: "lollipop", tags: ["sweet", "small", "round"] },
  { id: "soccerball", name: "Soccer ball", keyword: "soccer-ball", tags: ["round", "small"] },
  { id: "basketball", name: "Basketball", keyword: "basketball", tags: ["round", "big", "orange"] },
  { id: "baseball", name: "Baseball", keyword: "baseball", tags: ["round", "small"] },
  { id: "kite", name: "Kite", keyword: "kite", tags: ["fly", "toy", "small"] },
  { id: "yo_yo", name: "Yo-yo", keyword: "yo-yo-toy", tags: ["toy", "small", "round"] },
  { id: "toycar", name: "Toy car", keyword: "toy-car", tags: ["toy", "wheels", "small", "fast"] },
  { id: "doll", name: "Doll", keyword: "doll-toy", tags: ["toy", "soft", "small", "house"] },
  { id: "blocks", name: "Toy blocks", keyword: "toy-blocks", tags: ["toy", "small"] },
  { id: "drum", name: "Drum", keyword: "drum", tags: ["loud", "round"] },
  { id: "guitar", name: "Guitar", keyword: "guitar", tags: ["loud"] },
  { id: "book", name: "Book", keyword: "storybook", tags: ["small", "house"] },
  { id: "clock", name: "Clock", keyword: "clock", tags: ["round", "house"] },
  { id: "lamp", name: "Lamp", keyword: "lamp", tags: ["house"] },
  { id: "toothbrush", name: "Toothbrush", keyword: "toothbrush", tags: ["small", "house"] },
  { id: "backpack", name: "Backpack", keyword: "backpack", tags: ["small"] },
  { id: "shoe", name: "Shoe", keyword: "shoe", tags: ["small", "house"] },
  { id: "hat", name: "Hat", keyword: "hat", tags: ["small"] },
  { id: "chair", name: "Chair", keyword: "chair", tags: ["house", "big"] },
  { id: "table", name: "Table", keyword: "table", tags: ["house", "big"] },
  { id: "sofa", name: "Sofa", keyword: "sofa", tags: ["house", "big", "soft"] },
  { id: "bed", name: "Bed", keyword: "bed", tags: ["house", "big", "soft"] },
];

const ui = {
  setup: document.getElementById("setup"),
  game: document.getElementById("game"),
  versionSelect: document.getElementById("versionSelect"),
  playerCountSelect: document.getElementById("playerCountSelect"),
  styleWrap: document.getElementById("styleWrap"),
  styleSelect: document.getElementById("styleSelect"),
  tokenGoalInput: document.getElementById("tokenGoalInput"),
  readAloudToggle: document.getElementById("readAloudToggle"),
  soundToggle: document.getElementById("soundToggle"),
  startButton: document.getElementById("startButton"),
  resetButton: document.getElementById("resetButton"),
  statusLine: document.getElementById("statusLine"),
  scoreboard: document.getElementById("scoreboard"),
  roundTitle: document.getElementById("roundTitle"),
  roundMeta: document.getElementById("roundMeta"),
  cues: document.getElementById("cues"),
  guessArea: document.getElementById("guessArea"),
  readCuesButton: document.getElementById("readCuesButton"),
  secretHint: document.getElementById("secretHint"),
  secretImage: document.getElementById("secretImage"),
  puzzleMask: document.getElementById("puzzleMask"),
  revealProgress: document.getElementById("revealProgress"),
  challengePrompt: document.getElementById("challengePrompt"),
  answerYes: document.getElementById("answerYes"),
  answerNo: document.getElementById("answerNo"),
  challengeProgress: document.getElementById("challengeProgress"),
  guessOptions: document.getElementById("guessOptions"),
  guessFeedback: document.getElementById("guessFeedback"),
  guessActions: document.getElementById("guessActions"),
  createArea: document.getElementById("createArea"),
  readCreateCuesButton: document.getElementById("readCreateCuesButton"),
  ideaInput: document.getElementById("ideaInput"),
  createActions: document.getElementById("createActions"),
  sampleCues: document.getElementById("sampleCues"),
  samplePictures: document.getElementById("samplePictures"),
};

const game = {
  active: false,
  version: "quick",
  players: 1,
  style: "solo",
  round: 0,
  chooserIndex: 0,
  phase: "guess",
  tokenGoal: 5,
  readAloud: true,
  soundOn: true,
  scores: [],
  sharedScore: 0,
  cueDeck: [],
  cueDiscard: [],
  pictureDeck: [],
  pictureDiscard: [],
  currentCues: [],
  secretCard: null,
  revealTotal: 9,
  revealedPieces: new Set(),
  revealOrder: [],
  guessChoices: [],
  cueChecks: [],
  cueCheckIndex: 0,
  audioCtx: null,
};

function cardImageUrl(card) {
  return `https://loremflickr.com/640/480/${card.keyword}?lock=${card.id}`;
}

function shuffle(arr) {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function drawCard(deckKey, discardKey, fallback) {
  if (!game[deckKey].length) {
    game[deckKey] = shuffle(game[discardKey].length ? game[discardKey] : fallback);
    game[discardKey] = [];
  }
  const card = game[deckKey].pop();
  game[discardKey].push(card);
  return card;
}

function speak(text) {
  if (!game.readAloud || typeof window.speechSynthesis === "undefined") return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.08;
  window.speechSynthesis.speak(utter);
}

function ensureAudio() {
  if (!game.soundOn) return null;
  if (!game.audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    game.audioCtx = new Ctx();
  }
  return game.audioCtx;
}

function tone(freq, durationMs, type = "sine", gain = 0.05, delayMs = 0) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const start = ctx.currentTime + delayMs / 1000;
  const end = start + durationMs / 1000;

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(start);
  osc.stop(end);
}

function playSound(kind) {
  if (!game.soundOn) return;
  if (kind === "reveal") {
    tone(540, 120, "triangle", 0.04);
    return;
  }
  if (kind === "wrong") {
    tone(190, 180, "sawtooth", 0.035);
    return;
  }
  if (kind === "correct") {
    tone(560, 120, "triangle", 0.045);
    tone(760, 150, "triangle", 0.045, 110);
    return;
  }
  if (kind === "win") {
    tone(560, 140, "triangle", 0.05);
    tone(760, 140, "triangle", 0.05, 90);
    tone(980, 160, "triangle", 0.05, 180);
  }
}

function celebrate() {
  if (!game.soundOn) return;
  const wrap = document.createElement("div");
  wrap.className = "confetti-wrap";
  const colors = ["#ff7043", "#00a8a8", "#ffd166", "#4c8bf5", "#7bc96f"];

  for (let i = 0; i < 40; i += 1) {
    const bit = document.createElement("span");
    bit.className = "confetti";
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = colors[Math.floor(Math.random() * colors.length)];
    bit.style.animationDelay = `${Math.random() * 260}ms`;
    wrap.appendChild(bit);
  }

  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 1400);
}

function setModeChoices() {
  const players = Number(ui.playerCountSelect.value);
  ui.styleWrap.classList.toggle("hidden", players === 1);
  const options =
    players === 2
      ? [
          ["coop", "Co-op"],
          ["versus", "Versus"],
        ]
      : [
          ["versus", "Rotation (Versus)"],
          ["coop", "Rotation (Co-op)"],
        ];

  ui.styleSelect.innerHTML = "";
  options.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    ui.styleSelect.appendChild(option);
  });
  updateTokenGoalDefault();
}

function updateTokenGoalDefault() {
  const version = ui.versionSelect.value;
  const players = Number(ui.playerCountSelect.value);
  const style = ui.styleSelect.value || "solo";

  if (players === 1) {
    ui.tokenGoalInput.value = version === "quick" ? 5 : 8;
    return;
  }
  if (players === 2 && style === "coop") {
    ui.tokenGoalInput.value = 10;
    return;
  }
  if (players === 3 && style === "coop") {
    ui.tokenGoalInput.value = 12;
    return;
  }
  ui.tokenGoalInput.value = version === "quick" ? 5 : 8;
}

function initSampleCards() {
  cuePool.slice(0, 10).forEach((cue) => {
    const li = document.createElement("li");
    li.textContent = cue.text;
    ui.sampleCues.appendChild(li);
  });

  pictureCards.slice(0, 6).forEach((card) => {
    const article = document.createElement("article");
    article.className = "sample-photo";
    article.innerHTML = `<img src="${cardImageUrl(card)}" alt="${card.name}" loading="lazy" /><p>${card.name}</p>`;
    ui.samplePictures.appendChild(article);
  });
}

function playerLabel(index) {
  return `Player ${index + 1}`;
}

function startGame() {
  game.active = true;
  game.version = ui.versionSelect.value;
  game.players = Number(ui.playerCountSelect.value);
  game.style = game.players === 1 ? "solo" : ui.styleSelect.value;
  game.round = 0;
  game.chooserIndex = 0;
  game.phase = "guess";
  game.tokenGoal = Math.max(1, Number(ui.tokenGoalInput.value) || 5);
  game.readAloud = ui.readAloudToggle.checked;
  game.soundOn = ui.soundToggle.checked;
  game.scores = Array.from({ length: game.players }, () => 0);
  game.sharedScore = 0;
  game.cueDeck = shuffle(cuePool);
  game.cueDiscard = [];
  game.pictureDeck = shuffle(pictureCards);
  game.pictureDiscard = [];

  ui.setup.classList.add("hidden");
  ui.game.classList.remove("hidden");

  nextRound();
}

function cuesPerRound() {
  if (game.phase === "create") return 3;
  if (game.version === "quick") return 2;
  return 3;
}

function drawCuesForSecret(secretCard, count) {
  const matches = cuePool.filter((cue) => secretCard.tags.includes(cue.id));
  const picked = shuffle(matches).slice(0, count);
  if (picked.length < count) {
    const fillers = shuffle(cuePool.filter((cue) => !picked.includes(cue))).slice(0, count - picked.length);
    return [...picked, ...fillers];
  }
  return picked;
}

function makeCueChecks(secretCard, total = 7) {
  const trueCues = cuePool
    .filter((cue) => secretCard.tags.includes(cue.id))
    .map((cue) => ({ cue, isTrue: true }));
  const falseCues = cuePool
    .filter((cue) => !secretCard.tags.includes(cue.id))
    .map((cue) => ({ cue, isTrue: false }));

  const picks = [
    ...shuffle(trueCues).slice(0, Math.min(4, trueCues.length)),
    ...shuffle(falseCues).slice(0, Math.min(4, falseCues.length)),
  ];

  return shuffle(picks).slice(0, total);
}

function renderCues() {
  ui.cues.innerHTML = "";
  game.currentCues.forEach((cue) => {
    const chip = document.createElement("span");
    chip.className = "cue";
    chip.textContent = cue.text;
    ui.cues.appendChild(chip);
  });
}

function resetPuzzle() {
  game.revealedPieces = new Set();
  game.revealOrder = shuffle(Array.from({ length: game.revealTotal }, (_, i) => i));

  ui.puzzleMask.innerHTML = "";
  for (let i = 0; i < game.revealTotal; i += 1) {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.dataset.index = String(i);
    ui.puzzleMask.appendChild(piece);
  }

  updateRevealProgress();
}

function updateRevealProgress() {
  const total = game.revealTotal;
  const shown = game.revealedPieces.size;
  ui.revealProgress.textContent = `Photo pieces revealed: ${shown}/${total}`;
}

function revealOnePiece() {
  if (game.revealedPieces.size >= game.revealTotal) return;
  const nextPiece = game.revealOrder.find((idx) => !game.revealedPieces.has(idx));
  if (nextPiece === undefined) return;

  game.revealedPieces.add(nextPiece);
  const pieceNode = ui.puzzleMask.querySelector(`[data-index="${nextPiece}"]`);
  if (pieceNode) pieceNode.classList.add("revealed");

  updateRevealProgress();
  playSound("reveal");
}

function revealAllPieces() {
  for (let i = 0; i < game.revealTotal; i += 1) game.revealedPieces.add(i);
  ui.puzzleMask.querySelectorAll(".puzzle-piece").forEach((piece) => piece.classList.add("revealed"));
  updateRevealProgress();
}

function buildGuessOptions() {
  const choiceCount = 6;
  const others = shuffle(pictureCards.filter((c) => c.id !== game.secretCard.id)).slice(0, choiceCount - 1);
  game.guessChoices = shuffle([game.secretCard, ...others]);
  ui.guessOptions.innerHTML = "";

  game.guessChoices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "photo-card";
    button.innerHTML = `<img src="${cardImageUrl(choice)}" alt="${choice.name}" loading="lazy" /><strong>${choice.name}</strong>`;
    button.addEventListener("click", () => handleGuess(choice));
    ui.guessOptions.appendChild(button);
  });
}

function setChallengePrompt() {
  const item = game.cueChecks[game.cueCheckIndex];
  if (!item) {
    ui.challengePrompt.textContent = "All cue checks done. Make your photo guess.";
    ui.challengeProgress.textContent = "";
    return;
  }

  ui.challengePrompt.textContent = `Does it match: ${item.cue.text}?`;
  ui.challengeProgress.textContent = `Check ${game.cueCheckIndex + 1}/${game.cueChecks.length}`;

  if (game.readAloud) {
    speak(`Check ${game.cueCheckIndex + 1}. ${item.cue.text}. Answer yes or no.`);
  }
}

function handleCueCheck(answerYes) {
  const item = game.cueChecks[game.cueCheckIndex];
  if (!item) return;

  const isCorrect = item.isTrue === answerYes;
  if (isCorrect) {
    revealOnePiece();
    ui.guessFeedback.textContent = "Correct response. A piece was revealed.";
  } else {
    ui.guessFeedback.textContent = "Not this time. Try the next check.";
    playSound("wrong");
  }

  game.cueCheckIndex += 1;
  setChallengePrompt();
}

function awardGuessPoint(winnerIndex = 0) {
  if (game.players === 1) {
    game.scores[0] += 1;
  } else if (game.style === "coop") {
    game.sharedScore += 1;
  } else {
    game.scores[winnerIndex] += 1;
  }
  playSound("correct");
  celebrate();
  nextRound();
}

function handleGuess(choice) {
  if (!game.secretCard) return;

  if (choice.id !== game.secretCard.id) {
    ui.guessFeedback.textContent = "Not this one yet. Keep revealing pieces and try again.";
    playSound("wrong");
    return;
  }

  revealAllPieces();
  playSound("correct");

  if (game.players === 1) {
    ui.guessFeedback.textContent = `Correct: ${choice.name}!`;
    ui.guessActions.innerHTML = "";
    addAction(ui.guessActions, "Claim Token (+1)", () => awardGuessPoint(0));
    addAction(ui.guessActions, "Skip Token", nextRound, "ghost");
    return;
  }

  if (game.style === "coop") {
    ui.guessFeedback.textContent = `Correct team guess: ${choice.name}!`;
    ui.guessActions.innerHTML = "";
    addAction(ui.guessActions, "Team Token (+1)", () => awardGuessPoint());
    return;
  }

  ui.guessFeedback.textContent = `Correct: ${choice.name}. Who guessed it first?`;
  ui.guessActions.innerHTML = "";
  for (let i = 0; i < game.players; i += 1) {
    if (i === game.chooserIndex) continue;
    addAction(ui.guessActions, `${playerLabel(i)} gets token`, () => awardGuessPoint(i));
  }
}

function setupGuessRound() {
  game.secretCard = drawCard("pictureDeck", "pictureDiscard", pictureCards);
  game.currentCues = drawCuesForSecret(game.secretCard, cuesPerRound());
  game.cueChecks = makeCueChecks(game.secretCard);
  game.cueCheckIndex = 0;

  ui.roundTitle.textContent = `Round ${game.round}: Guess Mode`;
  ui.roundMeta.textContent =
    game.players === 1
      ? "Answer cue checks to reveal pieces, then guess the photo."
      : `${playerLabel(game.chooserIndex)} is the Chooser. Others solve cue checks and guess.`;

  ui.secretHint.textContent = "Each correct yes/no response reveals one puzzle piece.";
  ui.guessFeedback.textContent = "Pick the matching photo when you feel ready.";
  ui.guessArea.classList.remove("hidden");
  ui.createArea.classList.add("hidden");
  ui.guessActions.innerHTML = "";

  ui.secretImage.src = cardImageUrl(game.secretCard);
  ui.secretImage.alt = `Hidden answer: ${game.secretCard.name}`;

  resetPuzzle();
  buildGuessOptions();
  setChallengePrompt();

  addAction(ui.guessActions, "Reveal Hint Piece", revealOnePiece, "ghost");
  addAction(ui.guessActions, "Next Round (No point)", nextRound, "ghost");

  if (game.readAloud) {
    speak(`Guess mode. Cues are: ${game.currentCues.map((c) => c.text).join(", ")}. Answer cue checks to reveal pieces.`);
  }
}

function setupCreateRound() {
  game.currentCues = shuffle(cuePool).slice(0, 3);

  ui.roundTitle.textContent = `Round ${game.round}: Make-It-Up Mode`;
  ui.roundMeta.textContent = "Invent or draw something that matches all 3 cues.";
  ui.ideaInput.value = "";
  ui.guessArea.classList.add("hidden");
  ui.createArea.classList.remove("hidden");
  ui.createActions.innerHTML = "";

  if (game.players === 1) {
    addAction(ui.createActions, "Done (+1)", () => {
      game.scores[0] += 1;
      playSound("correct");
      celebrate();
      nextRound();
    });
  } else if (game.style === "coop") {
    addAction(ui.createActions, "Group favorite picked (+1)", () => {
      game.sharedScore += 1;
      playSound("correct");
      celebrate();
      nextRound();
    });
  } else {
    for (let i = 0; i < game.players; i += 1) {
      addAction(ui.createActions, `${playerLabel(i)} wins create round (+1)`, () => {
        game.scores[i] += 1;
        playSound("correct");
        celebrate();
        nextRound();
      });
    }
  }

  if (game.readAloud) {
    speak(`Create mode. Use these cues: ${game.currentCues.map((c) => c.text).join(", ")}.`);
  }
}

function addAction(container, label, onClick, kind = "primary") {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = kind;
  btn.addEventListener("click", onClick);
  container.appendChild(btn);
}

function renderScoreboard() {
  ui.scoreboard.innerHTML = "";
  if (game.style === "coop" && game.players > 1) {
    const pill = document.createElement("span");
    pill.className = "score-pill";
    pill.textContent = `Team: ${game.sharedScore}/${game.tokenGoal} tokens`;
    ui.scoreboard.appendChild(pill);
    return;
  }

  game.scores.forEach((score, i) => {
    const pill = document.createElement("span");
    pill.className = "score-pill";
    pill.textContent = `${playerLabel(i)}: ${score}/${game.tokenGoal}`;
    ui.scoreboard.appendChild(pill);
  });
}

function winnerText() {
  if (game.style === "coop" && game.players > 1) {
    return game.sharedScore >= game.tokenGoal ? "Team wins!" : "";
  }
  const idx = game.scores.findIndex((score) => score >= game.tokenGoal);
  return idx >= 0 ? `${playerLabel(idx)} wins!` : "";
}

function checkEnd() {
  const winner = winnerText();
  if (!winner) return false;

  ui.statusLine.textContent = `${winner} Start a new game to play again.`;
  ui.guessActions.innerHTML = "";
  ui.createActions.innerHTML = "";
  playSound("win");
  celebrate();
  if (game.readAloud) speak(`${winner} Great job.`);

  addAction(
    game.phase === "create" ? ui.createActions : ui.guessActions,
    "Start New Game",
    resetToSetup,
    "primary"
  );
  return true;
}

function choosePhaseForRound() {
  if (game.version === "quick") return "guess";
  return game.round % 2 === 1 ? "guess" : "create";
}

function nextRound() {
  renderScoreboard();
  if (checkEnd()) return;

  game.round += 1;
  game.phase = choosePhaseForRound();

  if (game.players > 1 && game.phase === "guess") {
    game.chooserIndex = (game.round - 1) % game.players;
  }

  if (game.phase === "guess") setupGuessRound();
  else setupCreateRound();

  renderCues();
  renderScoreboard();
  ui.statusLine.textContent = `Version: ${
    game.version === "quick" ? "Quick Guess" : "Imagination Builder"
  } | Round ${game.round}`;
}

function resetToSetup() {
  game.active = false;
  ui.game.classList.add("hidden");
  ui.setup.classList.remove("hidden");
  if (typeof window.speechSynthesis !== "undefined") window.speechSynthesis.cancel();
}

ui.versionSelect.addEventListener("change", updateTokenGoalDefault);
ui.playerCountSelect.addEventListener("change", setModeChoices);
ui.styleSelect.addEventListener("change", updateTokenGoalDefault);
ui.startButton.addEventListener("click", startGame);
ui.resetButton.addEventListener("click", resetToSetup);
ui.answerYes.addEventListener("click", () => handleCueCheck(true));
ui.answerNo.addEventListener("click", () => handleCueCheck(false));
ui.readCuesButton.addEventListener("click", () => {
  const message = `Cues are: ${game.currentCues.map((c) => c.text).join(", ")}.`;
  speak(message);
});
ui.readCreateCuesButton.addEventListener("click", () => {
  const message = `Create with cues: ${game.currentCues.map((c) => c.text).join(", ")}.`;
  speak(message);
});

setModeChoices();
initSampleCards();
