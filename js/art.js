// Code-drawn cover pictures, one per game, all in the same chunky toy style.
// Every cover is a 320x200 SVG. K = the shared ink outline.
const INK = '#2A1F3D';
const K = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const F = `font-family="Vazirmatn, sans-serif" font-weight="900"`;

const svg = (inner) =>
  `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${inner}</svg>`;

const cloud = (x, y, s = 1) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M10 34h62a15 15 0 0 0 2-30 24 24 0 0 0-45-5A18 18 0 0 0 10 34z" fill="#fff" ${K}/>`;

const star = (x, y, s = 1, fill = '#FFCE3A') =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0-14l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="${fill}" ${K}/>`;

const eyes = (x, y, gap = 16, r = 6) =>
  `<circle cx="${x - gap / 2}" cy="${y}" r="${r}" fill="#fff" ${K}/><circle cx="${x + gap / 2}" cy="${y}" r="${r}" fill="#fff" ${K}/>` +
  `<circle cx="${x - gap / 2 + 1}" cy="${y + 1}" r="${r / 2.4}" fill="${INK}"/><circle cx="${x + gap / 2 + 1}" cy="${y + 1}" r="${r / 2.4}" fill="${INK}"/>`;

const COVERS = {
  orbie: () => svg(`
    <rect width="320" height="200" fill="#7CC8FF"/>
    <circle cx="266" cy="40" r="22" fill="#FFE27A" ${K}/>
    ${cloud(22, 20, 0.9)}
    <rect x="-10" y="150" width="150" height="70" rx="14" fill="#3CC47C" ${K}/>
    <rect x="176" y="116" width="120" height="30" rx="12" fill="#FFCE3A" ${K}/>
    <rect x="236" y="168" width="100" height="50" rx="12" fill="#FF6FA8" ${K}/>
    <path d="M66 96q20-44 62-40" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>
    <circle cx="150" cy="80" r="34" fill="#FF7A3C" ${K}/>
    <path d="M128 66a26 26 0 0 1 20-14" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>
    ${eyes(156, 80, 22, 7)}
    <path d="M148 94q9 8 18 0" fill="none" ${K}/>
    ${star(236, 92, 1.1)}${star(60, 128, 0.8)}`),

  hoot: () => svg(`
    <rect width="320" height="200" fill="#5B4BCE"/>
    ${star(40, 36, 0.6, '#FFE27A')}${star(292, 150, 0.5, '#FFE27A')}${star(150, 22, 0.45, '#FFE27A')}
    <rect x="22" y="56" width="130" height="92" rx="10" fill="#2E7D5B" ${K}/>
    <rect x="16" y="144" width="142" height="12" rx="6" fill="#E9A867" ${K}/>
    <text x="87" y="116" text-anchor="middle" font-size="40" fill="#fff" ${F}>۲×۳</text>
    <ellipse cx="228" cy="124" rx="52" ry="58" fill="#C98B4A" ${K}/>
    <ellipse cx="228" cy="142" rx="30" ry="34" fill="#F4D9A8" ${K}/>
    <path d="M182 86l-8-28 30 14zM274 86l8-28-30 14z" fill="#C98B4A" ${K}/>
    <circle cx="208" cy="104" r="20" fill="#fff" ${K}/><circle cx="248" cy="104" r="20" fill="#fff" ${K}/>
    <circle cx="210" cy="106" r="8" fill="${INK}"/><circle cx="246" cy="106" r="8" fill="${INK}"/>
    <path d="M220 120h16l-8 14z" fill="#FF9A3C" ${K}/>
    <path d="M176 58l52-20 52 20-52 20z" fill="${INK}" ${K}/>
    <path d="M280 58v26" fill="none" stroke="#FFCE3A" stroke-width="5" stroke-linecap="round"/><circle cx="280" cy="88" r="6" fill="#FFCE3A" ${K}/>`),

  gulp: () => svg(`
    <rect width="320" height="200" fill="#9CCB8B"/>
    <rect y="0" width="320" height="64" fill="#BDE3F5"/>
    <rect x="14" y="16" width="52" height="60" rx="6" fill="#FF9A3C" ${K}/>
    <rect x="76" y="30" width="44" height="46" rx="6" fill="#FFCE3A" ${K}/>
    <rect x="212" y="10" width="46" height="66" rx="6" fill="#3D8BFF" ${K}/>
    <rect x="266" y="34" width="42" height="42" rx="6" fill="#FF6FA8" ${K}/>
    <path d="M26 30h10v10H26zM44 30h10v10H44zM26 50h10v10H26zM44 50h10v10H44zM224 24h10v10h-10zM240 24h10v10h-10zM224 44h10v10h-10zM240 44h10v10h-10z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <rect y="72" width="320" height="18" fill="#8D8FA3" ${K}/>
    <ellipse cx="160" cy="146" rx="96" ry="40" fill="${INK}"/>
    <ellipse cx="160" cy="150" rx="78" ry="28" fill="#0E0A17"/>
    ${eyes(160, 138, 34, 10)}
    <path d="M142 158q18 14 36 0" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <g transform="rotate(-24 82 108)"><rect x="66" y="92" width="32" height="30" rx="4" fill="#C98B4A" ${K}/><path d="M66 104h32M82 92v30" stroke="${INK}" stroke-width="3"/></g>
    <g transform="rotate(26 246 106)"><rect x="241" y="100" width="10" height="22" fill="#8A5A2B" ${K}/><circle cx="246" cy="92" r="16" fill="#3CC47C" ${K}/></g>`),

  'snake-forest': () => svg(`
    <rect width="320" height="200" fill="#1F5B3A"/>
    <g fill="#2F7D4F" ${K}><path d="M6 80l26-52 26 52zM268 70l24-48 24 48zM252 196l28-56 28 56zM-8 204l30-60 30 60z"/></g>
    <g fill="#3F9A60" ${K}><path d="M38 118l20-40 20 40zM232 108l18-36 18 36z"/></g>
    <path d="M70 160c40 24 60-52 100-34s38 52 76 20" fill="none" stroke="${INK}" stroke-width="34" stroke-linecap="round"/>
    <path d="M70 160c40 24 60-52 100-34s38 52 76 20" fill="none" stroke="#8BD95A" stroke-width="26" stroke-linecap="round"/>
    <path d="M70 160c40 24 60-52 100-34s38 52 76 20" fill="none" stroke="#4F9E33" stroke-width="26" stroke-linecap="round" stroke-dasharray="6 30"/>
    <circle cx="250" cy="142" r="22" fill="#8BD95A" ${K}/>
    ${eyes(254, 136, 16, 6)}
    <path d="M270 148l16 4-12 6" fill="none" stroke="#FF5A4F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="150" cy="58" r="20" fill="#FF5A4F" ${K}/><path d="M150 40q4-14 16-12" fill="none" ${K}/><path d="M152 38q10-8 18 0-10 8-18 0z" fill="#3CC47C" ${K}/>
    <circle cx="96" cy="58" r="13" fill="#FFCE3A" ${K}/>${star(96, 58, 0.36, '#fff')}`),

  snake: () => svg(`
    <rect width="320" height="200" fill="#14213A"/>
    <path d="M0 40h320M0 80h320M0 120h320M0 160h320M40 0v200M80 0v200M120 0v200M160 0v200M200 0v200M240 0v200M280 0v200" stroke="#22345A" stroke-width="2"/>
    <g fill="#3CC47C" ${K}>
      <rect x="44" y="124" width="32" height="32" rx="8"/><rect x="84" y="124" width="32" height="32" rx="8"/>
      <rect x="124" y="124" width="32" height="32" rx="8"/><rect x="124" y="84" width="32" height="32" rx="8"/>
      <rect x="124" y="44" width="32" height="32" rx="8"/><rect x="164" y="44" width="32" height="32" rx="8"/>
    </g>
    <rect x="202" y="40" width="40" height="40" rx="10" fill="#82CF55" ${K}/>
    <circle cx="228" cy="50" r="5" fill="#fff" ${K}/><circle cx="228" cy="70" r="5" fill="#fff" ${K}/>
    <path d="M242 60h14" fill="none" stroke="#FF5A4F" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="262" cy="140" rx="20" ry="14" fill="#B8BEC8" ${K}/><circle cx="246" cy="130" r="7" fill="#B8BEC8" ${K}/><circle cx="250" cy="150" r="7" fill="#B8BEC8" ${K}/>
    <circle cx="246" cy="140" r="2.5" fill="${INK}"/><path d="M282 140q14-10 22 2" fill="none" stroke="#E59AA0" stroke-width="4" stroke-linecap="round"/>`),

  'turbo-math-racer': () => svg(`
    <rect width="320" height="200" fill="#6FC3FF"/>
    ${cloud(232, 10, 0.7)}
    <rect y="96" width="320" height="104" fill="#3CC47C"/>
    <path d="M120 96h80l110 104H10z" fill="#5B5F73" ${K}/>
    <path d="M160 104v14M160 132v18M160 166v26" stroke="#FFCE3A" stroke-width="6" stroke-linecap="round"/>
    <path d="M70 96V40M250 96V40" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
    <rect x="58" y="16" width="204" height="52" rx="12" fill="#FFCE3A" ${K}/>
    <text x="160" y="56" text-anchor="middle" font-size="38" fill="${INK}" ${F} direction="ltr">7 × 8 = ?</text>
    <rect x="112" y="150" width="20" height="30" rx="7" fill="${INK}"/><rect x="188" y="150" width="20" height="30" rx="7" fill="${INK}"/>
    <path d="M118 166q0-30 42-30t42 30v8H118z" fill="#FF5A4F" ${K}/>
    <path d="M136 148q24-12 48 0v10h-48z" fill="#BDE3F5" ${K}/>
    <circle cx="130" cy="166" r="5" fill="#FFE27A" ${K}/><circle cx="190" cy="166" r="5" fill="#FFE27A" ${K}/>
    <path d="M262 176l10-26 10 26z" fill="#FF9A3C" ${K}/>`),

  'yeki-bud': () => svg(`
    <rect width="320" height="200" fill="#F4E4C6"/>
    <path d="M232 200V96a40 40 0 0 1 80 0v104z" fill="#22B8B0" ${K}/><circle cx="246" cy="150" r="5" fill="#FFCE3A" ${K}/>
    <rect y="184" width="320" height="16" fill="#E9A867" ${K}/>
    <g ${K}>
      <rect x="36" y="140" width="44" height="44" rx="9" fill="#FF5A4F"/><rect x="36" y="96" width="44" height="44" rx="9" fill="#FF5A4F"/><rect x="36" y="52" width="44" height="44" rx="9" fill="#FF5A4F"/>
      <rect x="138" y="140" width="44" height="44" rx="9" fill="#3D8BFF"/><rect x="138" y="96" width="44" height="44" rx="9" fill="#3D8BFF"/>
    </g>
    ${eyes(58, 70, 16, 5)}${eyes(160, 114, 16, 5)}
    <path d="M98 118h24M110 106v24" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="58" cy="26" r="20" fill="#fff" ${K}/><text x="58" y="36" text-anchor="middle" font-size="26" fill="${INK}" ${F}>۳</text>
    <circle cx="160" cy="68" r="20" fill="#fff" ${K}/><text x="160" y="78" text-anchor="middle" font-size="26" fill="${INK}" ${F}>۲</text>`),

  'dast-be-dast': () => svg(`
    <rect width="320" height="200" fill="#FFE9B8"/>
    <path d="M24 164h272" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 14"/>
    <path d="M132 112q28 22 56 0" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <rect x="182" y="64" width="84" height="92" rx="20" fill="#FF6FA8" ${K}/>
    <rect x="54" y="64" width="84" height="92" rx="20" fill="#22B8B0" ${K}/>
    <text x="224" y="134" text-anchor="middle" font-size="62" fill="#fff" ${F}>آ</text>
    <text x="96" y="126" text-anchor="middle" font-size="62" fill="#fff" ${F}>ب</text>
    ${eyes(224, 82, 18, 5)}${eyes(96, 82, 18, 5)}
    <path d="M160 14c14 18 20 26 20 36a20 20 0 0 1-40 0c0-10 6-18 20-36z" fill="#3D8BFF" ${K}/>
    <path d="M152 48a9 9 0 0 0 8 10" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`),

  'flight-simulator': () => svg(`
    <rect width="320" height="200" fill="#8FD3FF"/>
    ${cloud(16, 18, 0.9)}${cloud(224, 54, 0.7)}
    <rect y="160" width="320" height="40" fill="#3CC47C" ${K}/>
    <path d="M96 200l30-40h68l30 40z" fill="#5B5F73" ${K}/><path d="M160 166v8M160 182v12" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <g transform="rotate(-8 160 100)">
      <path d="M60 104q0-22 44-22h92l52-30h14l-18 52q-8 22-40 22H96q-36 0-36-22z" fill="#fff" ${K}/>
      <path d="M64 108h176" stroke="#FF5A4F" stroke-width="8" stroke-linecap="round"/>
      <path d="M96 84q4-18 30-18h14v18z" fill="#3D8BFF" ${K}/>
      <rect x="84" y="56" width="124" height="16" rx="8" fill="#FF5A4F" ${K}/>
      <path d="M120 72v12M172 72v12" stroke="${INK}" stroke-width="4"/>
      <ellipse cx="56" cy="104" rx="6" ry="30" fill="#D5DAE3" ${K}/>
      <path d="M122 126v14M178 126v14" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="122" cy="146" r="9" fill="${INK}"/><circle cx="178" cy="146" r="9" fill="${INK}"/>
    </g>`),

  skybound: () => svg(`
    <defs><linearGradient id="sb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7A5BD6"/><stop offset=".55" stop-color="#FF7FA0"/><stop offset="1" stop-color="#FFC25A"/></linearGradient></defs>
    <rect width="320" height="200" fill="url(#sb)"/>
    <circle cx="232" cy="132" r="34" fill="#FFE27A" ${K}/>
    <path d="M-10 200l70-84 50 52 44-64 70 96z" fill="#4A2F8A" ${K}/>
    <path d="M150 200l70-60 110 60z" fill="#3A2470" ${K}/>
    <path d="M30 96q50-30 96-36" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>
    <g transform="rotate(-16 184 54)">
      <path d="M130 58l110-26-34 60-22-22z" fill="#fff" ${K}/>
      <path d="M240 32l-56 38v22" fill="none" ${K}/>
    </g>
    ${star(40, 34, 0.5, '#fff')}${star(288, 26, 0.4, '#fff')}`),

  'aseman-peyma': () => svg(`
    <rect width="320" height="200" fill="#18245A"/>
    <circle cx="48" cy="42" r="22" fill="#FFE27A" ${K}/><circle cx="58" cy="36" r="18" fill="#18245A"/>
    ${star(120, 28, 0.4, '#fff')}${star(292, 44, 0.45, '#fff')}${star(210, 18, 0.35, '#fff')}${star(24, 150, 0.4, '#fff')}
    <ellipse cx="258" cy="96" rx="20" ry="40" fill="none" stroke="${INK}" stroke-width="14"/><ellipse cx="258" cy="96" rx="20" ry="40" fill="none" stroke="#FFCE3A" stroke-width="7"/>
    <ellipse cx="196" cy="106" rx="26" ry="52" fill="none" stroke="${INK}" stroke-width="15"/><ellipse cx="196" cy="106" rx="26" ry="52" fill="none" stroke="#FF9A3C" stroke-width="8"/>
    <g transform="rotate(-6 100 124)">
      <path d="M40 126q0-16 36-16h56l34-22h12l-12 38q-6 16-30 16H70q-30 0-30-16z" fill="#fff" ${K}/>
      <path d="M72 108q4-12 22-12h12v12z" fill="#7CC8FF" ${K}/>
      <path d="M78 132l-26 30h22l34-30z" fill="#22B8B0" ${K}/>
      <path d="M44 128h118" stroke="#22B8B0" stroke-width="6" stroke-linecap="round"/>
    </g>
    <path d="M0 190q80-22 160-6t160-8v24H0z" fill="#0F1740"/>`),

  'cue-cards': () => svg(`
    <rect width="320" height="200" fill="#FF8FB3"/>
    <g transform="rotate(-14 96 110)"><rect x="52" y="44" width="92" height="124" rx="14" fill="#fff" ${K}/>
      <circle cx="98" cy="108" r="26" fill="#FF5A4F" ${K}/><path d="M98 84q4-14 16-12" fill="none" ${K}/></g>
    <g transform="rotate(12 228 110)"><rect x="182" y="44" width="92" height="124" rx="14" fill="#fff" ${K}/>
      <rect x="200" y="100" width="56" height="24" rx="8" fill="#3D8BFF" ${K}/><path d="M210 100q6-18 18-18h8q10 0 14 18z" fill="#BDE3F5" ${K}/>
      <circle cx="214" cy="128" r="8" fill="${INK}"/><circle cx="244" cy="128" r="8" fill="${INK}"/></g>
    <rect x="112" y="28" width="96" height="132" rx="14" fill="#FFCE3A" ${K}/>
    <text x="160" y="126" text-anchor="middle" font-size="90" fill="${INK}" ${F} direction="ltr">?</text>
    ${star(40, 36, 0.6, '#fff')}${star(288, 172, 0.6, '#fff')}`),

  'new-game': () => svg(`
    <rect width="320" height="200" fill="#FFF1B8"/>
    <path d="M160 14v18M92 36l12 14M228 36l-12 14M60 96h18M242 96h18" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M160 44a46 46 0 0 1 28 82c-6 6-8 12-8 20h-40c0-8-2-14-8-20a46 46 0 0 1 28-82z" fill="#FFCE3A" ${K}/>
    <rect x="138" y="146" width="44" height="14" rx="5" fill="#B8BEC8" ${K}/><rect x="144" y="160" width="32" height="12" rx="5" fill="#8D8FA3" ${K}/>
    <path d="M146 100l14 14 14-14M160 114v32" fill="none" ${K}/>
    ${star(52, 44, 0.7, '#FF6FA8')}${star(270, 150, 0.8, '#3CC47C')}${star(64, 160, 0.5, '#3D8BFF')}`),
};

/** SVG markup for a game's cover. Unknown ids get the light-bulb picture. */
export function cover(id) {
  return (COVERS[id] || COVERS['new-game'])();
}

/** The شهرِ بازی mark: three toy blocks as a tiny skyline. */
export const LOGO = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="3" y="20" width="14" height="24" rx="4" fill="#FF5A4F" stroke="${INK}" stroke-width="3"/>
  <rect x="17" y="8" width="14" height="36" rx="4" fill="#FFCE3A" stroke="${INK}" stroke-width="3"/>
  <rect x="31" y="26" width="14" height="18" rx="4" fill="#3D8BFF" stroke="${INK}" stroke-width="3"/>
  <path d="M17 8l7-6 7 6z" fill="#3CC47C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
</svg>`;

/** The big hero picture: a city built from toy blocks. */
export const CITY = `<svg class="city" viewBox="0 0 520 330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="436" cy="62" r="34" fill="#FFCE3A" ${K}/>
  <path d="M436 12v-10M486 62h10M472 26l8-8M400 26l-8-8" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  ${cloud(40, 30, 1.1)}${cloud(250, 14, 0.8)}
  <rect x="30" y="170" width="90" height="150" rx="12" fill="#FF5A4F" ${K}/>
  <path d="M30 172l45-44 45 44z" fill="#FF9A3C" ${K}/>
  <rect x="128" y="96" width="96" height="224" rx="12" fill="#3D8BFF" ${K}/>
  <rect x="232" y="150" width="84" height="170" rx="12" fill="#FFCE3A" ${K}/>
  <path d="M232 152a42 42 0 0 1 84 0z" fill="#FF6FA8" ${K}/>
  <rect x="324" y="200" width="78" height="120" rx="12" fill="#3CC47C" ${K}/>
  <rect x="410" y="130" width="84" height="190" rx="12" fill="#8B5CF6" ${K}/>
  <path d="M410 132l42-40 42 40z" fill="#22B8B0" ${K}/>
  <g fill="#FFFDF6" ${K}>
    <rect x="48" y="196" width="22" height="24" rx="5"/><rect x="82" y="196" width="22" height="24" rx="5"/><rect x="48" y="236" width="22" height="24" rx="5"/><rect x="82" y="236" width="22" height="24" rx="5"/>
    <rect x="146" y="120" width="24" height="26" rx="5"/><rect x="182" y="120" width="24" height="26" rx="5"/><rect x="146" y="164" width="24" height="26" rx="5"/><rect x="182" y="164" width="24" height="26" rx="5"/><rect x="146" y="208" width="24" height="26" rx="5"/><rect x="182" y="208" width="24" height="26" rx="5"/>
    <rect x="250" y="176" width="20" height="24" rx="5"/><rect x="280" y="176" width="20" height="24" rx="5"/><rect x="250" y="216" width="20" height="24" rx="5"/><rect x="280" y="216" width="20" height="24" rx="5"/>
    <rect x="340" y="220" width="20" height="22" rx="5"/><rect x="368" y="220" width="20" height="22" rx="5"/>
    <rect x="428" y="156" width="20" height="24" rx="5"/><rect x="458" y="156" width="20" height="24" rx="5"/><rect x="428" y="196" width="20" height="24" rx="5"/><rect x="458" y="196" width="20" height="24" rx="5"/>
  </g>
  <g ${K}>
    <path d="M62 320v-36a14 14 0 0 1 28 0v36z" fill="#FFCE3A"/><path d="M160 320v-44a16 16 0 0 1 32 0v44z" fill="#FF5A4F"/>
    <path d="M262 320v-36a12 12 0 0 1 24 0v36z" fill="#3D8BFF"/><path d="M350 320v-40a13 13 0 0 1 26 0v40z" fill="#FF9A3C"/><path d="M440 320v-44a13 13 0 0 1 26 0v44z" fill="#FFCE3A"/>
  </g>
  ${star(176, 70, 1.3)}${star(364, 174, 1.0, '#FF6FA8')}
  <path d="M6 322h508" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
</svg>`;
