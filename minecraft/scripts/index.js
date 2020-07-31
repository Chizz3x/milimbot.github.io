const IP = '51.79.33.103';
const PORT = '25678';

document.getElementById('serverLoc').innerText = `${IP}:${PORT}`;



let blocks = [];

function destroyBlock(id) {
  blocks.splice(blocks.indexOf(blocks.find(f => f.id === id)), 1);
  document.getElementById('container-blocks').removeChild(document.getElementById(id+'-box'));
}

class Block {
  pos = 0;
  int = null;
  constructor(id, speed) {
    this.id = id;
    this.speed = speed;
  }

  spawn() {
    let blockBox = document.createElement('div');
    let block = document.createElement('img');

    blockBox.id = this.id+'-box';
    block.id = this.id;

    blockBox.classList.add('block');
    block.classList.add('block-img');

    blockBox.style.transition = `${this.speed / 1000}s transform linear`;
    block.style.animation = `${this.speed / 100}s rotateBlock linear infinite${Math.random() >= 0.5 ? ' reverse' : ''}`;
    blockBox.style.left = `${Math.random() * window.innerWidth}px`

    block.src = `../images/${this.id}.jpg`;

    blockBox.appendChild(block);
    document.getElementById('container-blocks').appendChild(blockBox);
  }

  destroy() {
    destroyBlock(this.id);
    clearInterval(this.int)
  }

  move() {
    this.int = setInterval((data) => {
      if(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) + 90 <= data.pos) return data.destroy();
      document.getElementById(`${data.id}-box`).style.transform = 'translateY('+(data.pos += 50)+'px)'
    }, this.speed, this)
  }
}

setInterval(() => {
  let i = Math.floor(Math.random() * 13); // blocks count
  if(blocks.find(f => f.id === 'b'+i)) return;
  let block = new Block('b'+i, Math.random() * (1000 - 200) + 200);
  block.spawn();
  block.move();
  blocks.push(block);
}, 1000);



function openInNewTab(url) {
  let win = window.open(url, '_blank');
  win.focus()
}

function timeoutBtn(btn) {
  copyToClipBoard('serverLoc');
  btn.style['pointer-events'] = 'none';
  btn.style['font-size'] = '11px';
  btn.innerText = 'Copied!';
  setTimeout(() => {
    btn.innerText = 'Copy';
    btn.style['font-size'] = '15px';
    btn.style['pointer-events'] = 'all';
  }, 1000)
}

function copyToClipBoard(id) {
  navigator.clipboard.writeText(document.getElementById(id).innerText);
}

fetch(`https://api.minetools.eu/ping/${IP}/${PORT}`).then(resp =>
  resp.json()
).then(res => {
  document.getElementById('desc').innerHTML = res.description
    .replace(/§(.+?)/gi, '')
    .replace(/gd(.+)gd/, '<i style="color:grey">$1</i>')
    .replace(/(https:\/\/.+\/.+)/, '<b style="color:magenta;cursor:pointer" onmousedown="openInNewTab(`$1`)">$1</b>');
  document.getElementById('players').innerText = `${res.players.online}/${res.players.max}`;

  let ping = res.latency;

  document.getElementById('pingMs').innerHTML = Math.round(ping).toString()+" ms";

  ping = ping <= 150 ? 5 : ping <= 250 ? 4 : ping <= 400 ? 3 : ping <= 600 ? 2 : 1;

  for(let i = 0; i < ping; i++) {
    document.getElementById(`ping-${i}`).style.fill = 'rgb(10,200,10)';
    document.getElementById(`ping-${i}-b`).style.fill = 'darkgreen';
  };
})

document.addEventListener('mousemove', e => {
  let border = document.getElementById('border-shadow');
  let blockContainer = document.getElementById('container-blocks');
  let blockContainerOff = blockContainer.getBoundingClientRect();
  border.style.transform = `translate(${(e.clientX - blockContainerOff.left - blockContainerOff.width / 2) / 40}px,${(e.clientY - blockContainerOff.top - blockContainerOff.height / 2) / 70}px)`;
  blockContainer.style.transform = `translate(${(e.clientX - blockContainerOff.left - blockContainerOff.width / 2) / 30}px,${(e.clientY - blockContainerOff.top - blockContainerOff.height / 2) / 60}px)`;
})
