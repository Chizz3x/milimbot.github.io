let cont = document.getElementById('faces-container');
let height = document.documentElement.scrollHeight - 1100;
let width = document.documentElement.scrollWidth;
let stepx = (width - 200) / 5;
let imagesCount = Math.floor(height / 220);
let stepy = (height - 750) / imagesCount;
cont.style.height = height+"px";
let Ypositions = [];

for(let i = 0; i < imagesCount; i++)
  Ypositions.push(i * stepy);

let el, box, max, ind;
for(let i = 0; i < imagesCount; i++) {
  el = document.createElement('img');
  box = document.createElement('div');
  el.src = 'https://github.com/Chizz3x/Milim.bot.github.io/blob/master/images/faces/'+((i % 15) + 1)+'.png?raw=true';
  min = stepx * (i % 5);
  box.style.right = `${min + Math.random() * stepx}px`;
  ind = Math.floor(Math.random() * Ypositions.length);
  min = Ypositions[ind];
  Ypositions.splice(ind, 1);
  box.style.top = `${min + Math.random() * stepy}px`;
  box.classList.add('face-box');
  el.classList.add('face');
  el.style.transition = `transform ${Math.random() * (1.8 - 0.8) + 0.8}s cubic-bezier(.25,.85,.25,1.5)`;
  box.id = 'f'+i;
  box.appendChild(el);
  cont.appendChild(box);
};

let faceInterval = setInterval(() => {
  if(window.hasOwnProperty('onFaceLoad')) {
    killFaceInterval();
    window.onFaceLoad()
  }
})

function killFaceInterval() {
  clearInterval(faceInterval)
}
