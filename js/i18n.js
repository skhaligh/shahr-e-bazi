// Farsi / English text for the site pages (the games keep their own language).
const KEY = 'shahr.lang';

const STR = {
  site: { fa: 'شهرِ بازی', en: 'Shahr-e Bazi' },
  siteSub: { fa: 'شهرِ بازی', en: 'Game City' },
  switchLang: { fa: 'English', en: 'فارسی' },
  heroA: { fa: 'شهرِ', en: 'Game' },
  heroB: { fa: 'بازی', en: 'City' },
  heroP: { fa: 'بازی کن، ایده بده، ما می‌سازیم!', en: 'Play, share your ideas, and we build them!' },
  heroPlay: { fa: '🎮 برو سراغ بازی‌ها', en: '🎮 See the games' },
  heroIdea: { fa: '💡 ایدهٔ بازی جدید', en: '💡 New game idea' },
  shelf: { fa: 'قفسهٔ بازی‌ها', en: 'The game shelf' },
  play: { fa: '▶ بازی کن', en: '▶ Play' },
  playFa: { fa: '▶ فارسی', en: '▶ فارسی' },
  playEn: { fa: '▶ English', en: '▶ English' },
  idea: { fa: '💡 ایده دارم', en: '💡 I have an idea' },
  langFa: { fa: 'فارسی', en: 'Farsi' },
  langEn: { fa: 'انگلیسی', en: 'English' },
  langBoth: { fa: 'فارسی و انگلیسی', en: 'Farsi & English' },
  newTitle: { fa: 'یک بازیِ تازه توی ذهنت داری؟', en: 'Got a brand-new game in your head?' },
  newP: { fa: 'بنویس یا نقاشی‌اش را بکش. شاید بازیِ بعدیِ این شهر، بازیِ تو باشد!', en: 'Write it or draw it. The next game in this city could be yours!' },
  newBtn: { fa: '✏️ ایده‌ام را می‌گویم', en: '✏️ Tell my idea' },
  wall: { fa: 'ایده‌هایی که ساختیم', en: 'Ideas we built' },
  wallSub: { fa: 'ایده‌های شما که واقعاً ساخته شد.', en: 'Your ideas that really got built.' },
  wallEmptyA: { fa: 'هنوز این دیوار خالی است.', en: 'This wall is still empty.' },
  wallEmptyB: { fa: 'اولین ایده‌ای که ساخته شود، با اسمِ مستعارِ صاحبش همین‌جا می‌آید!', en: 'The first idea we build goes right here, with its inventor’s nickname!' },
  by: { fa: 'ایده از', en: 'Idea by' },
  foot: { fa: 'بدون تبلیغ · بدون ردیابی · ساخته‌شده برای خانواده', en: 'No ads · No tracking · Made for family' },
  install: { fa: '📲 نصب روی صفحه', en: '📲 Install as app' },
  iosTitle: { fa: 'نصب روی آیفون یا آیپد', en: 'Install on iPhone or iPad' },
  ios1: { fa: 'در Safari دکمهٔ «اشتراک‌گذاری» را بزن.', en: 'In Safari, tap the Share button.' },
  ios2: { fa: '«افزودن به صفحهٔ اصلی» را انتخاب کن.', en: 'Choose “Add to Home Screen”.' },
  ios3: { fa: '«افزودن» را بزن. تمام!', en: 'Tap “Add”. Done!' },
  ok: { fa: 'باشه', en: 'OK' },
  // play page
  home: { fa: '🏠 خانه', en: '🏠 Home' },
  ideaShort: { fa: '💡 ایده', en: '💡 Idea' },
  full: { fa: '⛶ تمام‌صفحه', en: '⛶ Full screen' },
  close: { fa: '✕', en: '✕' },
  notFound: { fa: 'این بازی پیدا نشد.', en: 'That game was not found.' },
  backHome: { fa: 'برگرد به شهرِ بازی', en: 'Back to Game City' },
  // feedback page
  fbFor: { fa: 'ایده‌ات برای «{g}» چیست؟', en: 'What is your idea for “{g}”?' },
  fbForNew: { fa: 'بازیِ جدیدت چه شکلی است؟', en: 'What is your new game like?' },
  fbLead: { fa: 'هر چند بار که بخواهی می‌توانی ایده بفرستی.', en: 'You can send ideas as many times as you like.' },
  s1: { fa: 'این بازی چقدر خوش گذشت؟', en: 'How fun was this game?' },
  s2: { fa: 'چه جور ایده‌ای داری؟', en: 'What kind of idea is it?' },
  kFeature: { fa: 'یک چیز تازه اضافه کن', en: 'Add something new' },
  kBug: { fa: 'یک چیزی خراب است', en: 'Something is broken' },
  kNew: { fa: 'ایدهٔ بازی جدید', en: 'Idea for a new game' },
  s3: { fa: 'ایده‌ات را بنویس', en: 'Write your idea' },
  s3ph: { fa: 'مثلاً: کاش مار می‌توانست کلاه بگذارد…', en: 'For example: I wish the snake could wear a hat…' },
  s3phNew: { fa: 'بازی دربارهٔ چیست؟ چطور بازی می‌کنیم؟', en: 'What is the game about? How do we play it?' },
  s4: { fa: 'اگر دوست داری نقاشی‌اش را بکش', en: 'Draw it, if you like' },
  undo: { fa: '↩ برگرد', en: '↩ Undo' },
  clear: { fa: '🗑 پاک کن', en: '🗑 Clear' },
  eraser: { fa: 'پاک‌کن', en: 'Eraser' },
  s5: { fa: 'تو کی هستی؟ (اگر دوست داری)', en: 'Who are you? (if you like)' },
  nick: { fa: 'اسمِ مستعار', en: 'Nickname' },
  nickPh: { fa: 'مثلاً: شیرِ دریا', en: 'For example: Sea Lion' },
  age: { fa: 'سن', en: 'Age' },
  safe: { fa: 'اسمِ کامل، نشانی یا شمارهٔ تلفن ننویس.', en: 'Do not write your full name, address or phone number.' },
  send: { fa: '🚀 بفرست', en: '🚀 Send' },
  sending: { fa: 'در حال فرستادن…', en: 'Sending…' },
  needOne: { fa: 'اول یک چیزی بنویس، بکش یا یک شکلک انتخاب کن.', en: 'First write something, draw something or pick a face.' },
  thanksT: { fa: 'ایده‌ات رسید!', en: 'We got your idea!' },
  thanksP: { fa: 'ممنون! آن را می‌خوانیم و فکر می‌کنیم چطور بسازیمش.', en: 'Thank you! We will read it and think about how to build it.' },
  savedT: { fa: 'ایده‌ات ذخیره شد!', en: 'Your idea is saved!' },
  savedP: { fa: 'همین‌جا نگهش داشتیم. دفعهٔ بعد که این صفحه با اینترنت باز شود، خودش فرستاده می‌شود.', en: 'We kept it right here. It will be sent by itself the next time this page opens with internet.' },
  another: { fa: '➕ یک ایدهٔ دیگر', en: '➕ Another idea' },
  mine: { fa: 'ایده‌هایی که از این دستگاه فرستادی', en: 'Ideas sent from this device' },
  stSent: { fa: '✓ رسید', en: '✓ Sent' },
  stWait: { fa: '⏳ در صف', en: '⏳ Waiting' },
  stFail: { fa: '✗ نرسید', en: '✗ Not delivered' },
  drawing: { fa: '(نقاشی)', en: '(drawing)' },
  rated: { fa: '(فقط شکلک)', en: '(face only)' },
};

export function getLang() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'fa' || v === 'en') return v;
  } catch { /* private mode */ }
  return 'fa';
}

export function setLang(lang) {
  try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
  applyLang();
}

/** Text for a key in the current language; {name} placeholders are filled from vars. */
export function t(key, vars) {
  const entry = STR[key];
  let s = entry ? entry[getLang()] : key;
  if (vars) for (const k of Object.keys(vars)) s = s.replace(`{${k}}`, vars[k]);
  return s;
}

/** Pick the right side of a { fa, en } pair. */
export function pick(pair) {
  return pair ? pair[getLang()] || pair.fa || pair.en : '';
}

/** Farsi digits when the page is in Farsi. */
export function num(n) {
  const s = String(n);
  return getLang() === 'fa' ? s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]) : s;
}

/** Set page direction and fill every element marked with data-i18n / data-i18n-ph. */
export function applyLang() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
  for (const el of document.querySelectorAll('[data-i18n-ph]')) el.placeholder = t(el.dataset.i18nPh);
}
