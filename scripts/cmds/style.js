/**
 * @license
 * GoatBot V2 Command: .style
 * Premium Font & Text Style Generator with 50+ Fonts and 500+ Decorations.
 * 
 * Author: RIYAD-HASAN (GoatBot V2 Style Generator)
 * Version: 2.1.0
 * 
 * Command Format:
 *   .style <font_style> <text_style> <your_text>
 *   .style list
 */

const SMALL_CAPS_MAP = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ',
  n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
  A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ',
  N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ'
};

const UPSIDE_DOWN_MAP = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ',
  n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: 'ᗺ', C: 'Ɔ', D: 'ᗜ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W',
  N: 'N', O: 'O', P: 'Ԁ', Q: 'Ὁ', R: 'ᴚ', S: 'S', T: '┴', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
  '.': '˙', ',': "'", '\'': ',', '"': '„', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[',
  '{': '}', '}': '{', '<': '>', '>': '<', '_': '‾'
};

const GREEK_PSEUDO_MAP = {
  a: 'α', b: 'β', c: '¢', d: '∂', e: 'є', f: 'ƒ', g: 'g', h: 'н', i: 'ι', j: 'ʝ', k: 'к', l: 'ℓ', m: 'м',
  n: 'и', o: 'σ', p: 'ρ', q: 'q', r: 'я', s: 'ѕ', t: 'т', u: 'υ', v: 'ν', w: 'ω', x: 'χ', y: 'у', z: 'z',
  A: 'Α', B: 'Β', C: 'ℂ', D: 'Δ', E: 'Ε', F: 'Φ', G: 'Γ', H: 'Η', I: 'Ι', J: 'ℑ', K: 'Κ', L: 'Λ', M: 'Μ',
  N: 'Ν', O: 'Ο', P: 'Π', Q: 'Θ', R: 'ℝ', S: 'Σ', T: 'Τ', U: 'Υ', V: '∇', W: 'Ω', X: 'Χ', Y: 'Υ', Z: 'Ζ'
};

const CYRILLIC_PSEUDO_MAP = {
  a: 'а', b: 'в', c: 'с', d: 'ԁ', e: 'е', f: 'ғ', g: 'g', h: 'н', i: 'і', j: 'ј', k: 'к', l: 'ӏ', m: 'м',
  n: 'и', o: 'о', p: 'р', q: 'ԛ', r: 'г', s: 'ѕ', t: 'т', u: 'и', v: 'ѵ', w: 'ѡ', x: 'х', y: 'у', z: 'z',
  A: 'А', B: 'Б', C: 'С', D: 'Д', E: 'Е', F: 'Ф', G: 'Г', H: 'Х', I: 'И', J: 'Й', K: 'К', L: 'Л', M: 'М',
  N: 'Н', O: 'О', P: 'П', Q: 'Ҁ', R: 'Я', S: 'Ѕ', T: 'Т', U: 'У', V: 'В', W: 'Ш', X: 'Х', Y: 'У', Z: 'З'
};

const MIRROR_MAP = {
  a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'ʇ', g: 'ϱ', h: 'ʜ', i: 'i', j: 'Ⴑ', k: 'ʞ', l: 'l', m: 'm',
  n: 'ᴎ', o: 'o', p: 'q', q: 'p', r: 'я', s: 'ꙅ', t: 'ƚ', u: 'υ', v: 'v', w: 'w', x: 'x', y: 'ʏ', z: 'ƹ',
  A: 'A', B: 'ᙗ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'ㅋ', G: 'Ↄ', H: 'H', I: 'I', J: 'Ⴑ', K: 'K', L: '⅃', M: 'M',
  N: 'ᴎ', O: 'O', P: 'Գ', Q: 'Ọ', R: 'Я', S: 'Ꙅ', T: 'T', U: 'U', V: 'V', W: 'W', X: 'X', Y: 'Y', Z: 'S'
};

const SUPERSCRIPT_MAP = {
  a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ',
  n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
  A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ',
  N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', S: 'ˢ', T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ', X: 'ˣ', Y: 'ʸ', Z: 'ᶻ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
};

const SUBSCRIPT_MAP = {
  a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ', s: 'ₛ',
  t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
  A: 'ₐ', E: 'ₑ', H: 'ₕ', I: 'ᵢ', J: 'ⱼ', K: 'ₖ', L: 'ₗ', M: 'ₘ', N: 'ₙ', O: 'ₒ', P: 'ₚ', R: 'ᵣ', S: 'ₛ',
  T: 'ₜ', U: 'ᵤ', V: 'ᵥ', X: 'ₓ',
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
};

const LEET_MAP = {
  a: '4', b: '8', c: '<', d: '|)', e: '3', f: '|=', g: '6', h: '#', i: '1', j: '_|', k: '|<', l: '7', m: '|\\/|',
  n: '|\\|', o: '0', p: '|*', q: 'O_', r: '|2', s: '5', t: '7', u: '|_|', v: '\\/', w: '\\/\\/', x: '><', y: '`/', z: '2',
  A: '4', B: '8', C: '<', D: '|)', E: '3', F: '|=', G: '6', H: '#', I: '1', J: '_|', K: '|<', L: '7', M: '|\\/|',
  N: '|\\|', O: '0', P: '|*', q: 'O_', R: '|2', S: '5', T: '7', U: '|_|', V: '\\/', W: '\\/\\/', X: '><', Y: '`/', Z: '2'
};

const ZALGO_UP = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u035c', '\u035b', '\u0346', '\u039a'];
const ZALGO_DOWN = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
const ZALGO_MID = ['\u0315', '\u0334', '\u0335', '\u0336', '\u034f', '\u035f', '\u035d', '\u035e', '\u0360', '\u0361', '\u0338', '\u0337', '\u031b'];

function makeZalgo(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') {
      result += ' ';
      continue;
    }
    result += char;
    const count = 2 + Math.floor(Math.random() * 3);
    for (let j = 0; j < count; j++) {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) result += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
      else if (type === 1) result += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
      else result += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
    }
  }
  return result;
}

function getMathUnicode(char, baseUpper, baseLower, baseDigit) {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return String.fromCodePoint(baseUpper + (code - 65));
  } else if (code >= 97 && code <= 122) {
    return String.fromCodePoint(baseLower + (code - 97));
  } else if (baseDigit !== undefined && code >= 48 && code <= 57) {
    return String.fromCodePoint(baseDigit + (code - 48));
  }
  return char;
}

const FONT_TRANSFORMS = {
  '01': (t) => t.split('').map(c => getMathUnicode(c, 0x1D5EC, 0x1D606, 0x1D7EC)).join(''),
  '02': (t) => t.split('').map(c => getMathUnicode(c, 0x1D400, 0x1D41A, 0x1D7CE)).join(''),
  '03': (t) => t.split('').map(c => getMathUnicode(c, 0x1D622, 0x1D63C)).join(''),
  '04': (t) => t.split('').map(c => c === 'h' ? 'ℎ' : getMathUnicode(c, 0x1D434, 0x1D44E)).join(''),
  '05': (t) => t.split('').map(c => getMathUnicode(c, 0x1D656, 0x1D670)).join(''),
  '06': (t) => t.split('').map(c => getMathUnicode(c, 0x1D468, 0x1D482)).join(''),
  '07': (t) => t.split('').map(c => {
    const exc = { B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ', e: 'ℯ', g: 'ℊ', o: 'ℴ' };
    return exc[c] || getMathUnicode(c, 0x1D49C, 0x1D4B6);
  }).join(''),
  '08': (t) => t.split('').map(c => getMathUnicode(c, 0x1D4EA, 0x1D504)).join(''),
  '09': (t) => t.split('').map(c => {
    const exc = { C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ' };
    return exc[c] || getMathUnicode(c, 0x1D51E, 0x1D538);
  }).join(''),
  '10': (t) => t.split('').map(c => getMathUnicode(c, 0x1D552, 0x1D56C)).join(''),
  '11': (t) => t.split('').map(c => {
    const exc = { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' };
    return exc[c] || getMathUnicode(c, 0x1D538, 0x1D552, 0x1D7D8);
  }).join(''),
  '12': (t) => t.split('').map(c => getMathUnicode(c, 0x1D670, 0x1D68A, 0x1D7F6)).join(''),
  '13': (t) => t.split('').map(c => SMALL_CAPS_MAP[c] || c).join(''),
  '14': (t) => t.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
    if (code >= 48 && code <= 57) return code === 48 ? '⓪' : String.fromCodePoint(0x2460 + (code - 49));
    return c;
  }).join(''),
  '15': (t) => t.split('').map(c => {
    const code = c.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F150 + (code - 65));
    if (code >= 48 && code <= 57) return code === 48 ? '⓿' : String.fromCodePoint(0x2776 + (code - 49));
    return c;
  }).join(''),
  '16': (t) => t.split('').map(c => {
    const code = c.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + (code - 65));
    return c;
  }).join(''),
  '17': (t) => t.split('').map(c => {
    const code = c.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F170 + (code - 65));
    return c;
  }).join(''),
  '18': (t) => t.split('').map(c => {
    const code = c.toLowerCase().charCodeAt(0);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x249C + (code - 97));
    const digitCode = c.charCodeAt(0);
    if (digitCode >= 49 && digitCode <= 57) return String.fromCodePoint(0x2474 + (digitCode - 49));
    return c;
  }).join(''),
  '19': (t) => t.split('').map(c => SUPERSCRIPT_MAP[c] || c).join(''),
  '20': (t) => t.split('').map(c => SUBSCRIPT_MAP[c] || c).join(''),
  '21': (t) => t.split('').map(c => {
    const code = c.charCodeAt(0);
    return (code >= 33 && code <= 126) ? String.fromCodePoint(code + 0xFEE0) : c;
  }).join(''),
  '22': (t) => t.split('').reverse().map(c => UPSIDE_DOWN_MAP[c] || c).join(''),
  '23': (t) => makeZalgo(t),
  '24': (t) => t.split('').join(' '),
  '25': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '\u0332').join(''),
  '26': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '\u0336').join(''),
  '27': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '\u0337').join(''),
  '28': (t) => t.split('').map(c => c === ' ' ? ' ' : '°' + c + '°').join(''),
  '29': (t) => t.split('').map(c => CYRILLIC_PSEUDO_MAP[c] || c).join(''),
  '30': (t) => t.split('').map(c => LEET_MAP[c] || c).join(''),
  '31': (t) => '★' + t.split('').join('★') + '★',
  '32': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '♥').join(''),
  '33': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '✨').join(''),
  '34': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '♦').join(''),
  '35': (t) => '➽ ' + t.split('').join(' ➽ '),
  '36': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '\u0333').join(''),
  '37': (t) => t.split('').map(c => c === ' ' ? ' ' : c + '\u0330').join(''),
  '38': (t) => t.split('').map((c, idx) => idx % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join(''),
  '39': (t) => t.split('').map(c => GREEK_PSEUDO_MAP[c] || c).join(''),
  '40': (t) => t.split('').map(c => CYRILLIC_PSEUDO_MAP[c] || c).join(''),
  '41': (t) => t.split('').reverse().map(c => MIRROR_MAP[c] || c).join(''),
  '42': (t) => t.split('').map(c => c === ' ' ? ' ' : '[' + c + ']').join(''),
  '43': (t) => t.split('').map(c => c === ' ' ? ' ' : '(' + c + ')').join(''),
  '44': (t) => '╱' + t.split('').join('╱') + '╱',
  '45': (t) => '♪ ' + t.split('').join(' ♪ ') + ' ♪',
  '46': (t) => '🔥' + t.split('').join('🔥') + '🔥',
  '47': (t) => '•' + t.split('').join('•') + '•',
  '48': (t) => '# ' + t.split('').join(' # ') + ' #',
  '49': (t) => '//' + t.split('').join('//') + '//',
  '50': (t) => '۞ ' + t.split('').join(' ۞ ') + ' ۞'
};

const FONT_NAMES = {
  '01': 'Bold Sans', '02': 'Bold Serif', '03': 'Italic Sans', '04': 'Italic Serif', '05': 'Bold Italic Sans',
  '06': 'Bold Italic Serif', '07': 'Script Regular', '08': 'Script Bold', '09': 'Fraktur Regular', '10': 'Fraktur Bold',
  '11': 'Double Struck', '12': 'Monospace', '13': 'Small Caps', '14': 'Circled (White)', '15': 'Circled (Black)',
  '16': 'Squared (White)', '17': 'Squared (Black)', '18': 'Parenthesized', '19': 'Superscript', '20': 'Subscript',
  '21': 'Vaporwave', '22': 'Upside Down', '23': 'Glitch Zalgo', '24': 'Aesthetic Spaced', '25': 'Underline',
  '26': 'Strikethrough', '27': 'Slash', '28': 'Bubble', '29': 'Gothic Medieval', '30': 'Cyber Leet',
  '31': 'Magic Stars', '32': 'Heart Accent', '33': 'Sparkles Accent', '34': 'Diamond Accent', '35': 'Arrow Accent',
  '36': 'Double Underline', '37': 'Wave Underline', '38': 'Alternating Case', '39': 'Greek Pseudo', '40': 'Cyrillic Pseudo',
  '41': 'Mirror Text', '42': 'Bracketed', '43': 'Parenthesized Chars', '44': 'Slanted Accents', '45': 'Music Note Accent',
  '46': 'Fire Sparks', '47': 'Enclosed Dots', '48': 'Cross Hatch', '49': 'Double Slash', '50': 'Gothic Block'
};

const DECOR_EMOJI_SETS = [
  { l: '👑 VIP', r: 'VIP 👑', name: 'VIP Crown' },
  { l: '👑 ROYAL •', r: '• ROYAL 👑', name: 'Royal Crown' },
  { l: '👑 CROWN', r: 'CROWN 👑', name: 'Crown Classic' },
  { l: '💼 CEO [', r: '] CEO 💼', name: 'CEO Executive' },
  { l: '💎 LUXURY', r: 'LUXURY 💎', name: 'Luxury Diamond' },
  { l: '💎 ELITE •', r: '• ELITE 💎', name: 'Elite Diamond' },
  { l: '🌸 FLOWER', r: 'FLOWER 🌸', name: 'Flower Pink' },
  { l: '🦋 BUTTERFLY', r: 'BUTTERFLY 🦋', name: 'Butterfly' },
  { l: '🔥 FIRE', r: 'FIRE 🔥', name: 'Fire Flame' },
  { l: '😈 BAD BOY', r: 'BAD BOY 😈', name: 'Bad Boy' },
  { l: '💀 DEATH', r: 'DEATH 💀', name: 'Skull Death' },
  { l: '🖤 DARK', r: 'DARK 🖤', name: 'Dark Heart' },
  { l: '🎮 GAMING', r: 'GAMING 🎮', name: 'Gaming Control' },
  { l: '💻 HACKER', r: 'HACKER 💻', name: 'Hacker Terminal' },
  { l: '⚡ NEON', r: 'NEON ⚡', name: 'Neon Bolt' },
  { l: '🤖 CYBER', r: 'CYBER 🤖', name: 'Robot Cyber' },
  { l: '✨ PREMIUM', r: 'PREMIUM ✨', name: 'Premium Glow' },
  { l: '🌟 STAR', r: 'STAR 🌟', name: 'Star Gold' },
  { l: '⚜️ LEGEND', r: 'LEGEND ⚜️', name: 'Legend Emblem' },
  { l: '🌹 ROSE', r: 'ROSE 🌹', name: 'Rose Red' },
  { l: '🦅 EAGLE', r: 'EAGLE 🦅', name: 'Eagle Flight' },
  { l: '🦁 LION', r: 'LION 🦁', name: 'Lion King' },
  { l: '🛸 SPACE', r: 'SPACE 🛸', name: 'Space UFO' },
  { l: '🩸 BLOOD', r: 'BLOOD 🩸', name: 'Blood Drop' },
  { l: '🛡️ CHAMPION', r: 'CHAMPION 🛡️', name: 'Shield Def' }
];

const DECOR_FRAMING_SETS = [
  { l: '꧁༺ ', r: ' ༻꧂', name: 'Wings' },
  { l: '•´¯`•. ', r: ' .•´¯`•', name: 'Swirl' },
  { l: '๑۩۞۩๑ ', r: ' ๑۩۞۩๑', name: 'Temple' },
  { l: '◤ ', r: ' ◢', name: 'Slash' },
  { l: '░▒▓ ', r: ' ▓▒░', name: 'Pixel' },
  { l: '⫷ ', r: ' ⫸', name: 'Arrows' },
  { l: 'ღ ', r: ' ღ', name: 'Cute Hearts' },
  { l: '❦ ', r: ' ❦', name: 'Scroll' },
  { l: '⛓️ ', r: ' ⛓️', name: 'Chains' },
  { l: '╭₪₪₪ ', r: ' ₪₪₪╮', name: 'Arch' },
  { l: '★彡 ', r: ' 彡★', name: 'Shooting' },
  { l: '【 ', r: ' 】', name: 'Box' },
  { l: '『 ', r: ' 』', name: 'Corners' },
  { l: '⟨⟨ ', r: ' ⟩⟩', name: 'Chevrons' },
  { l: '⧼ ', r: ' ⧽', name: 'Braces' },
  { l: '«« ', r: ' »»', name: 'Quotes' },
  { l: '☣️ ', r: ' ☣️', name: 'Biohazard' },
  { l: '☯️ ', r: ' ☯️', name: 'YinYang' },
  { l: '⚔️ ', r: ' ⚔️', name: 'Swords' },
  { l: '⚜️ ', r: ' ⚜️', name: 'Emblem' }
];

const LAYOUT_TEMPLATES = [
  { wrap: (l, r, text) => `${l}${text}${r}` },
  { wrap: (l, r, text) => `✩═══ • ═══✩\n  ${l}${text}${r}\n✩═══ • ═══✩` },
  { wrap: (l, r, text) => `╔═════ ✨ ═════╗\n  ${l}${text}${r}\n╚═════ ✨ ═════╝` },
  { wrap: (l, r, text) => `୨୧━━━━━━━━━━━━୨୧\n  ${l}${text}${r}\n୨୧━━━━━━━━━━━━୨୧` },
  { wrap: (l, r, text) => `۩۞۩━━━━━━━━━━۩۞۩\n  ${l}${text}${r}\n۩۞۩━━━━━━━━━━۩۞۩` }
];

const POPULAR_DECORATIONS = {
  '01': (t) => `👑 VIP • [ ${t} ] • VIP 👑`,
  '05': (t) => `👑 ꧁༺ ROYAL ${t} ROYAL ༻꧂ 👑`,
  '12': (t) => `💎 ⚜️ [ ${t} ] ⚜️ 💎`,
  '18': (t) => `💼 ᏟᎬᎾ | ${t} | ᏟᎬᎾ 💼`,
  '45': (t) => `😈 𐏓 ${t} 𐏔 😈`
};

function getDecoration(decorId, text) {
  const num = parseInt(decorId, 10);
  const strId = String(num).padStart(3, '0');
  const shortId = String(num).padStart(2, '0');
  
  if (POPULAR_DECORATIONS[strId]) return POPULAR_DECORATIONS[strId](text);
  if (POPULAR_DECORATIONS[shortId]) return POPULAR_DECORATIONS[shortId](text);
  
  const i = Math.max(1, Math.min(500, num));
  const emojiIdx = (i - 1) % DECOR_EMOJI_SETS.length;
  const framingIdx = Math.floor((i - 1) / DECOR_EMOJI_SETS.length) % DECOR_FRAMING_SETS.length;
  const layoutIdx = Math.floor((i - 1) / (DECOR_EMOJI_SETS.length * DECOR_FRAMING_SETS.length)) % LAYOUT_TEMPLATES.length;
  
  const emoji = DECOR_EMOJI_SETS[emojiIdx];
  const frame = DECOR_FRAMING_SETS[framingIdx];
  const layout = LAYOUT_TEMPLATES[layoutIdx];
  
  return layout.wrap(`${emoji.l} ${frame.l}`, `${frame.r} ${emoji.r}`, text);
}

module.exports.config = {
  name: "style",
  version: "1.0.0",
  author: "RIYAD",
  role: 0,
  shortDescription: "Premium Unicode Style Generator",
  longDescription: "Generate stylish Unicode text with fonts, borders, symbols and emoji decorations.",
  category: "utility",
  guide: {
    en: "{pn} list\n{pn} <font_style> <text_style> <your_text>"
  }
};

module.exports.onStart = async function ({ api, event, args, message }) {
  if (!args[0]) {
    return message.reply("⚠️ ব্যবহারের নিয়ম: .style <font_style> <text_style> <your_text>\n\nউদাহরণ: .style 05 18 VIP SIR RIYAD\n\nসকল স্টাইল দেখতে লিখুন: .style list");
  }

  if (args[0].toLowerCase() === "list") {
    let fontMenu = "━━━━ FONT STYLES (01–50) ━━━━\n";
    const fontKeys = Object.keys(FONT_TRANSFORMS).sort();
    for (let i = 0; i < 25; i++) {
      const k = fontKeys[i];
      if (k) fontMenu += `🔹 ${k} : ${FONT_NAMES[k]}\n`;
    }
    fontMenu += "\n(আরও দেখতে আরও ৫০টি ফন্ট এবং ৫০০+ ডেকোরেশন সাপোর্ট করে।)\n";
    fontMenu += "\n━━━━ TEXT STYLES (01–500+) ━━━━\n";
    fontMenu += "🔹 01 : VIP Style\n🔹 05 : Royal Guard\n🔹 12 : Luxury Prestige\n🔹 18 : CEO Style\n🔹 45 : Bad Boy Rebellion\n🔹 50-500+ : Programmatic Combinations (👑, 💎, 🌸, ⚡, 🦋, 🔥, 😈, etc.)\n";
    fontMenu += "\n📌 ব্যবহার করুন: .style <font_code> <decor_code> <your_text>";
    
    return message.reply(fontMenu);
  }

  const fontStyle = String(args[0]).padStart(2, '0');
  const textStyle = String(args[1]).padStart(2, '0');

  if (!FONT_TRANSFORMS[fontStyle]) {
    return message.reply(`⚠️ ফন্ট স্টাইল অবশ্যই '01' থেকে '50'-এর মধ্যে হতে হবে। উদাহরণ: .style 01 01 Riyad`);
  }

  const decorNum = parseInt(textStyle, 10);
  if (isNaN(decorNum) || decorNum < 1 || decorNum > 500) {
    return message.reply(`⚠️ ডেকোরেশন স্টাইল অবশ্যই '01' থেকে '500'-এর মধ্যে হতে হবে। উদাহরণ: .style 01 01 Riyad`);
  }

  const textToStyle = args.slice(2).join(" ");
  if (!textToStyle) {
    return message.reply("⚠️ অনুগ্রহ করে আপনার স্টাইল করার লেখাটি দিন!\nউদাহরণ: .style " + args[0] + " " + args[1] + " Your Text");
  }

  try {
    const fontTransformer = FONT_TRANSFORMS[fontStyle] || FONT_TRANSFORMS['01'];
    const stylizedFont = fontTransformer(textToStyle);
    const fullyDecorated = getDecoration(textStyle, stylizedFont);
    
    return message.reply(fullyDecorated);
  } catch (err) {
    return message.reply("❌ দুঃখিত, স্টাইল তৈরি করার সময় একটি ত্রুটি ঘটেছে: " + err.message);
  }
};
