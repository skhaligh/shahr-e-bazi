// The shelf: every game on the site, in display order.
// To add a game: copy its files into games/<id>/, add an entry here, add a cover in art.js,
// and add `game:<id>` to the labels list in the feedback repo (tools/fetch-feedback.mjs lists unknown ones too).
//
// langs: which languages the game itself speaks. variants: separate builds per language.
export const GAMES = [
  {
    id: 'orbie',
    color: '#7CC8FF',
    langs: ['fa', 'en'],
    variants: [
      { lang: 'fa', path: 'games/orbie-fa/' },
      { lang: 'en', path: 'games/orbie/' },
    ],
    title: { fa: 'سفر اُربی', en: "Orbie's Journey" },
    blurb: {
      fa: 'توپِ کوچولو را در ۱۶ دنیای سه‌بعدی قِل بده، بپر و ستاره جمع کن.',
      en: 'Roll a little ball through 16 3D worlds. Jump, explore and collect stars.',
    },
    kind: { fa: 'ماجراجویی', en: 'Adventure' },
  },
  {
    id: 'hoot',
    color: '#5B4BCE',
    langs: ['fa'],
    path: 'games/hoot/',
    title: { fa: 'کلاس پروفسور هوت', en: "Professor Hoot's Class" },
    blurb: {
      fa: 'فارسی و ریاضی چهارم دبستان، با غلت و پرش در ۱۳ کلاس.',
      en: 'Grade 4 Farsi and maths, learned by rolling and jumping through 13 classes.',
    },
    kind: { fa: 'فارسی و ریاضی', en: 'Farsi & maths' },
  },
  {
    id: 'gulp',
    color: '#9CCB8B',
    langs: ['en'],
    path: 'games/gulp/',
    title: { fa: 'گالپ، چالهٔ شهر', en: 'Gulp the City Hole' },
    blurb: {
      fa: 'چالهٔ مهربان همه‌چیز را قورت می‌دهد و سالم به شهر جدید می‌برد. کوچک شروع کن، بزرگ شو!',
      en: 'A friendly hole swallows the town and delivers it safely to the new city. Start tiny, grow huge!',
    },
    kind: { fa: 'سرگرمی', en: 'Fun' },
  },
  {
    id: 'snake-forest',
    color: '#1F5B3A',
    langs: ['fa'],
    path: 'games/snake-forest/',
    title: { fa: 'مار جنگل', en: 'Forest Snake' },
    blurb: {
      fa: 'مار را در جنگل راه ببر و سیب بخور. سیب طلایی ۱۰۰ امتیاز دارد، ولی زود ناپدید می‌شود!',
      en: 'Guide the snake through the forest and eat apples. The golden apple is worth 100, but it vanishes fast!',
    },
    kind: { fa: 'سرعتی', en: 'Action' },
  },
  {
    id: 'snake',
    color: '#14213A',
    langs: ['en'],
    path: 'games/snake/',
    title: { fa: 'مار', en: 'Snake' },
    blurb: {
      fa: 'بازی مار کلاسیک: غذا بخور، دراز شو، به دیوار و خودت نخور.',
      en: 'The classic: eat, grow longer, and do not hit the walls or yourself.',
    },
    kind: { fa: 'سرعتی', en: 'Action' },
  },
  {
    id: 'turbo-math-racer',
    color: '#6FC3FF',
    langs: ['en'],
    path: 'games/turbo-math-racer/',
    title: { fa: 'مسابقهٔ توربو ریاضی', en: 'Turbo Math Racer' },
    blurb: {
      fa: 'در بزرگراه مسابقه بده، از دروازهٔ جواب درست رد شو و ماشین‌های تازه باز کن.',
      en: 'Race the highway, drive through the gate with the right answer and unlock new cars.',
    },
    kind: { fa: 'ریاضی', en: 'Maths' },
  },
  {
    id: 'yeki-bud',
    color: '#F4E4C6',
    langs: ['fa'],
    path: 'games/yeki-bud/',
    title: { fa: 'یکی بود', en: 'Yeki Bud' },
    blurb: {
      fa: 'عددها را صدا بزن، به هم بچسبان و از هم جدا کن. بازی با شمردن و جمع.',
      en: 'Call the numbers, join them and pull them apart. Play with counting and adding (in Farsi).',
    },
    kind: { fa: 'عددها', en: 'Numbers' },
  },
  {
    id: 'dast-be-dast',
    color: '#FFE9B8',
    langs: ['fa'],
    path: 'games/dast-be-dast/',
    title: { fa: 'دست‌به‌دست', en: 'Dast be Dast' },
    blurb: {
      fa: 'حرف‌ها دست هم را می‌گیرند و کلمه می‌شوند. آب، باد، بادام…',
      en: 'Letters hold hands and turn into words. First Farsi reading.',
    },
    kind: { fa: 'حرف و کلمه', en: 'Letters & words' },
  },
  {
    id: 'flight-simulator',
    color: '#8FD3FF',
    langs: ['en'],
    path: 'games/flight-simulator/',
    title: { fa: 'شبیه‌ساز پرواز سسنا', en: 'Flight Simulator: Cessna 172' },
    blurb: {
      fa: 'خلبان یک هواپیمای سسنا ۱۷۲ شو: بلند شو، پرواز کن و آرام فرود بیا.',
      en: 'Be the pilot of a Cessna 172: take off, fly around and land gently.',
    },
    kind: { fa: 'پرواز', en: 'Flying' },
  },
  {
    id: 'skybound',
    color: '#FF9A6B',
    langs: ['en'],
    path: 'games/skybound/',
    title: { fa: 'اسکای‌باند', en: 'Skybound' },
    blurb: {
      fa: 'یک شبیه‌ساز پروازِ جیبی. سرعتت را بالا نگه دار؛ هواپیمای کُند پایین می‌آید!',
      en: 'A pocket flight simulator. Keep your speed up: slow planes sink!',
    },
    kind: { fa: 'پرواز', en: 'Flying' },
  },
  {
    id: 'aseman-peyma',
    color: '#18245A',
    langs: ['fa'],
    // ?r=2: a new address for the fixed build, so devices that saved the broken one fetch this one.
    path: 'games/aseman-peyma/?r=2',
    title: { fa: 'آسمان‌پیما', en: 'Aseman-Peyma' },
    blurb: {
      fa: 'مأموریت آموزشی خلبانی: چک‌لیست را انجام بده و از میان حلقه‌ها پرواز کن.',
      en: 'A pilot training mission in Farsi: run the checklist and fly through the rings.',
    },
    kind: { fa: 'پرواز', en: 'Flying' },
  },
  {
    id: 'cue-cards',
    color: '#FF8FB3',
    langs: ['en'],
    path: 'games/cue-cards/',
    title: { fa: 'کارت‌های کاپوچینو', en: "Cappucino's Cue Cards" },
    blurb: {
      fa: 'با نشانه‌ها حدس بزن عکسِ پنهان کدام است. یک تا سه نفره.',
      en: 'Use the clues to guess the hidden picture. For 1 to 3 players.',
    },
    kind: { fa: 'فکری', en: 'Thinking' },
  },
];

// Not a game: the "idea for a brand-new game" box. It has a feedback page like the games do.
export const NEW_GAME = {
  id: 'new-game',
  color: '#FFCE3A',
  title: { fa: 'ایدهٔ بازی جدید', en: 'A brand-new game' },
};

export function findGame(id) {
  if (id === NEW_GAME.id) return NEW_GAME;
  return GAMES.find((g) => g.id === id) || null;
}

/** The folder to open for a game, in the wanted language when it has one. */
export function gamePath(game, lang) {
  if (game.variants) {
    const v = game.variants.find((x) => x.lang === lang) || game.variants[0];
    return v.path;
  }
  return game.path;
}
