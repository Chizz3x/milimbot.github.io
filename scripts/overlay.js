let doc = document.getElementsByTagName('body')[0];
doc.classList.add('disable-scroll');

let overlayText = document.getElementById('overlay-text');

let texts = [
  "Hello.",
  "Howdy",
  "Ayy Ayy",
  "Konnichiwa!",
  "Labuka ;P",
  "Hey!",
  "Hiya!",
  "Ahoy!",
  "Cookies",
  "Ello",
  "Whaddup",
  "Oh?",
  "Hola.",
  "Halo.",
  "Bonjour.",
  "Ciao."
];

function disableInterval() {
  clearInterval(interval);
  setTimeout(() => {
    let overlay = document.getElementById('overlay');
    overlay.style.opacity = "0";
    overlay.style['pointer-events'] = 'none';
    doc.classList.remove('disable-scroll');
  }, 500)
}

let n = 0;
let text = texts[Math.floor(Math.random() * texts.length)];
let interval = setInterval(function() {
  if(n === text.length) return disableInterval();
  overlayText.innerHTML += text[n];
  n++;
}, Math.pow(2, -(text.length - 10)) + 100)
