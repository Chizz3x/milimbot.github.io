let doc = document.getElementsByTagName('body')[0];
doc.classList.add('disable-scroll');

let overlayText = document.getElementById('overlay-text');

let texts = [
  "¯\\_(ツ)_/¯",
  "(╯°□°）╯︵ ┻━┻",
  "Labuka ;P",
  "哦？",
  "Anime!",
  "Manga!",
  "I'm a weeb",
  "(╮°-°)╮┳━━┳",
  "☆*:.｡.o(≧▽≦)o.｡.:*☆",
  "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
  "＼(￣▽￣)／",
  "Hey!",
  "Hiya!",
  "Merhaba!",
  "Привет!",
  "你好",
  "(„• ֊ •„)",
  "(*￣▽￣)b",
  "♡( ◡‿◡ )",
  "(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
  "I love you.",
  "Ich liebe dich.",
  "Ti amo.",
  "Je t'aime.",
  "Sveiki!",
  "(￣▽￣*)ゞ",
  ".｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.",
  "＼(º □ º |||)/",
  "┐(￣～￣)┌",
  "Ello",
  "Whaddup",
  "Oh?",
  "Hola.",
  "Halo.",
  "(・・;)ゞ",
  "(¬_¬ )",
  "w(°ｏ°)w",
  "(＠´ー`)ﾉﾞ	",
  "(≧▽≦)/",
  "~ヾ(・ω・)",
  "( ~*-*)~",
  "┬┴┤･ω･)",
  "Ahoy!",
  "Cookies",
  "Bonjour.",
  "Ciao.",
  "آلو!",
  "(￣ρ￣)..zzZZ",
  "(－.－)...zzz",
  "/╲/\\( •̀ ω •́ )/\\╱\\",
  "＼(▽￣ \\ (￣▽￣) / ￣▽)／",
  "Salve!",
  "こんにちは！",
  "Guten Tag!",
  "ああ？",
  "¿Oh?",
  "♬♫♪◖(● o ●)◗♪♫♬",
  "(〜￣▽￣)〜",
  "(￣▽￣)/♫•*¨*•.¸¸♪",
  "Hello.",
  "Howdy",
  "Ayy Ayy",
  "Konnichiwa!",
  "އައްސަލާމު ޢަލައިކުމް"
];

let actions = [
  "hugs",
  "wink wink",
  "pouts",
  "wibble wobble",
  "swoosh",
  "claps",
  "stares~"
];

function end() {
  let endInt;

  function clrEndInt() {
    clearInterval(endInt)
  }

  endInt = setInterval(() => {
    if(sessionStorage.loaded) {
      clrEndInt();
      let overlay = document.getElementById('overlay');
      overlay.style.opacity = "0";
      overlay.style['pointer-events'] = 'none';
      doc.classList.remove('disable-scroll');
    }
  }, 500)
}

let n = 0;
let interval;
function disableInterval() {
  clearInterval(interval);
  end()
}
let choose = Math.random() * 2 - (100 / (texts.length + actions.length) * texts.length) / 100;
let chosen = choose >= 1 ? actions : texts;
if(!!chosen) {
  let text = chosen[Math.floor(Math.random() * chosen.length)];

  if(choose >= 1) {
    overlayText.style['font-style'] = 'italic';
    if(text.includes(' ')) {
      text = text.split(/ /g);

      interval = setInterval(() => {
        if(n === text.length) return disableInterval();
        overlayText.innerHTML += text[n];
        if(n + 1 !== text.length) overlayText.innerHTML += ' ';
        n++;
      }, 500)
    } else {
      interval = setInterval(() => {
        if(n === text.length) return disableInterval();
        overlayText.innerHTML += text[n];
        n++;
      }, Math.pow(2, -(text.length - 10)) + 100)
    }
  } else {
    interval = setInterval(() => {
      if(n === text.length) return disableInterval();
      overlayText.innerHTML += text[n];
      n++;
    }, Math.pow(2, -(text.length - 10)) + 100)
  }
} else end()
