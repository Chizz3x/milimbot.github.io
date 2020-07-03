let doc = document.getElementsByTagName('body')[0];
doc.classList.add('disable-scroll');

let overlayText = document.getElementById('overlay-text');

let texts = [
  ["H","e","l","l","o","."],
  ["H","o","w","d","y"],
  ["A","y","y"," ","A","y","y"],
  ["K","o","n","n","i","c","h","i","w","a","!"],
  ["L","a","b","u","k","a"," ",";","P"],
  ["H","e","y","!"],
  ["H","i","y","a","!"],
  ["A","h","o","y","!"],
  ["C","o","o","k","i","e","s"],
  ["E","l","l","o"],
  ["W","h","a","d","d","u","p"],
  ["O","h","?"],
  ["H","o","l","a","."],
  ["H","a","l","o","."],
  ["B","o","n","j","o","u","r","."],
  ["C","i","a","o","."]
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
