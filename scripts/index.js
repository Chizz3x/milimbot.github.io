function openInNewTab(url) {
  let win = window.open(url, '_blank');
  win.focus()
}

function menuStick() {
  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  let menu = document.getElementById('menu');
  if(scrollTop <= 10 && menu.classList.contains('menu-shrink')) {
    menu.classList.remove('menu-shrink')
  } else if(scrollTop > 10 && !menu.classList.contains('menu-shrink')) {
    menu.classList.add('menu-shrink')
  }
}

function footer() {
  let foot = document.getElementById('footer');
  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
  if((scrollTop + window.innerHeight) >= (scrollHeight - 50)) {
    if(foot.classList.contains('footer-shrink'))
      foot.classList.remove('footer-shrink')
  } else {
    if(!foot.classList.contains('footer-shrink'))
      foot.classList.add('footer-shrink')
  }
}

let first = {top: document.documentElement.offsetHeight, el: null};

function faces() {
  if(!sessionStorage.loaded || !first.el) return;
  let faces = document.getElementsByClassName('face');

  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

  let rect = first.el.getBoundingClientRect();
  if(1120 < scrollTop + window.innerHeight) {
    let num = ((scrollTop + window.innerHeight) - (rect.top + window.scrollY)) / 20;
    for(let i = 0; i < faces.length; i++) {
      faces[i].style.transform = `translateY(${num}px)`;
    }
  }
}

function getFirstFace() {
  let faces = document.getElementsByClassName('face-box');
  for(let i = 0; i < faces.length; i++) {
    let rect = faces[i].getBoundingClientRect();
    if(first.top > rect.top + window.scrollY) {
      first.top = rect.top + window.scrollY;
      first.el = faces[i]
    }
  }
}

function moveLine() {
  let line = document.getElementById('left-path');
  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

  let lineRect = line.getBoundingClientRect();
  let middleOffset = scrollTop + window.innerHeight / 2 - line.offsetTop;

  if(line.offsetTop - scrollTop - window.innerHeight / 2 < 0
     && line.offsetTop + lineRect.height - scrollTop - window.innerHeight / 2 > 0) {
    let middlePoint = 100 / lineRect.height * middleOffset;
    line.style['border-image-source'] = `linear-gradient(to bottom, transparent ${middlePoint - 10 < 0 ? 0 : middlePoint - 10}%, rgba(180,100,200,.5) ${middlePoint}%, transparent ${middlePoint + 10 > 100 ? 100 : middlePoint + 10}%)`
  }
}

function topTop() {
  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  if(scrollTop >= 700) {
    let el = document.getElementById('to-top');

    el.style.transform = `translateY(0px)`
  } else {
    let el = document.getElementById('to-top');

    el.style.transform = `translateY(70px)`
  }
}

let aboutBoxes = document.getElementsByClassName('about-box');
let activeAboutBox = aboutBoxes[0];
aboutBoxes[0].classList.add('aboutBoxActive');

function aboutBox() {
  for(let i = 0; i < aboutBoxes.length; i++) {
    let abtBoxRect = aboutBoxes[i].getBoundingClientRect();
    if(abtBoxRect.top <= window.innerHeight / 2 && abtBoxRect.height + abtBoxRect.top >= window.innerHeight / 2) {
      if(!aboutBoxes[i].classList.contains('aboutBoxActive')) {
        activeAboutBox.classList.remove('aboutBoxActive');
        aboutBoxes[i].classList.add('aboutBoxActive');
        activeAboutBox = aboutBoxes[i];
      }
    }
  }
}

function toTop() {
  document.documentElement.scrollTop = 0;
}

window.onload = function() {
  sessionStorage.loaded = true;

  menuStick();
  footer();
  faces();
}

window.onFaceLoad = function() {
  getFirstFace();
}

window.onscroll = function() {
    menuStick();
    footer();
    faces();
    moveLine();
    topTop();
    aboutBox();
}

window.addEventListener('mousemove', e => {
  let invite = document.getElementById('invite-bubble'),
  inviteIcon = document.getElementById('invite-icon');

  let invoff = invite.getBoundingClientRect();
  let x = e.clientX - invoff.left - invoff.width / 2,
  y = e.clientY - invoff.top - invoff.height / 2;
  if(y > 416) y = 416;

  invite.style.transform = `matrix3d(
		1, 0, 0, ${x / 500000},
		0, 1, 0, ${y / 500000},
		0, 0, 1, 0,
		${x / 80}, ${y / 80}, 0, 1
	)`;

  let invoffi = inviteIcon.getBoundingClientRect();
  let xi = e.clientX - invoffi.left - invoffi.width / 2,
  yi = e.clientY - invoffi.top - invoffi.height / 2;
  if(yi > 416) yi = 416;

  inviteIcon.style.transform = `translate(${xi / 100}px, ${yi / 100}px)`;
});

const matr = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];

function editMatr(arr) {
  let newMatr = [...matr];
  for(let i = 0; i < arr.length; i++)
    newMatr[arr[i][0]] = arr[i][1];
  return newMatr
}

function activate() {
  let bubble = document.getElementById('invite-bubble');

  let ring1 = document.getElementById('ring-1'),
  ring2 = document.getElementById('ring-2')
  ring3 = document.getElementById('ring-3');

  bubble.style['background-color'] = "rgba(242, 142, 131, 0.6)";
  bubble.style['box-shadow'] = '0 0 5px 5px rgba(242, 142, 131, 0.3)';

  ring1.style['border-color'] = 'rgba(240, 101, 86, 0.6)';
  ring1.style.width = '210px';
  ring1.style.height = '210px';

  ring2.style['border-color'] = 'rgba(240, 125, 113, 0.5)';
  ring2.style.width = '230px';
  ring2.style.height = '230px';

  ring3.style['border-color'] = 'orange';
  ring3.style.width = '245px';
  ring3.style.height = '245px';

  let images = [
    document.getElementById('image-1'),
    document.getElementById('image-2'),
    document.getElementById('image-3'),
    document.getElementById('image-4'),
    document.getElementById('image-5'),
    document.getElementById('image-6'),
    document.getElementById('image-7'),
    document.getElementById('image-8'),
    document.getElementById('image-9'),
    document.getElementById('image-10'),
    document.getElementById('image-11'),
    document.getElementById('image-12')
  ];

  images[0].style.transform = `matrix3d(${editMatr([[12, 100], [13, 8]])})`;
  images[1].style.transform = `matrix3d(${editMatr([[12, -40], [13, -5]])})`;
  images[2].style.transform = `matrix3d(${editMatr([[12, -40], [13, -20], [15, 0.95]])})`;
  images[3].style.transform = `matrix3d(${editMatr([[12, 90], [13, -10], [3, -0.0002], [1, -0.09], [4, 0.09]])})`;
  images[4].style.transform = `matrix3d(${editMatr([[12, 110], [13, 2], [15, 0.9]])})`;
  images[5].style.transform = `matrix3d(${editMatr([[12, 30], [13, -30]])})`;
  images[6].style.transform = `matrix3d(${editMatr([[12, -20], [13, -50]])})`;
  images[7].style.transform = `matrix3d(${editMatr([[12, 30], [13, -20], [1, 0.09], [4, -0.09]])})`;
  images[8].style.transform = `matrix3d(${editMatr([[12, 20], [13, -20]])})`;
  images[9].style.transform = `matrix3d(${editMatr([[12, 10], [13, -20]])})`;
  images[10].style.transform = `matrix3d(${editMatr([[12, -5], [13, -20]])})`;
  images[11].style.transform = `matrix3d(${editMatr([[12, -10], [13, -20]])})`
}

function deactivate() {
  let bubble = document.getElementById('invite-bubble');

  let ring1 = document.getElementById('ring-1'),
  ring2 = document.getElementById('ring-2')
  ring3 = document.getElementById('ring-3');

  bubble.style['background-color'] = "rgba(130, 130, 180, 0.5)";
  bubble.style['box-shadow'] = 'none';

  ring1.style['border-color'] = 'rgba(130, 130, 180, 0.5)';
  ring1.style.width = '190px';
  ring1.style.height = '190px';

  ring2.style['border-color'] = 'rgba(170, 170, 220, 0.4)';
  ring2.style.width = '220px';
  ring2.style.height = '220px';

  ring3.style['border-color'] = 'rgba(230, 230, 255, 0.35)';
  ring3.style.width = '240px';
  ring3.style.height = '240px';

  let images = [
    document.getElementById('image-1'),
    document.getElementById('image-2'),
    document.getElementById('image-3'),
    document.getElementById('image-4'),
    document.getElementById('image-5'),
    document.getElementById('image-6'),
    document.getElementById('image-7'),
    document.getElementById('image-8'),
    document.getElementById('image-9'),
    document.getElementById('image-10'),
    document.getElementById('image-11'),
    document.getElementById('image-12')
  ];

  images.forEach(i => {i.style.transform = `none`})
}

function widgetSlide() {
  let widget = document.getElementById('widget')
  arrow = document.getElementById('widget-arrow');
  if(widget.classList.contains('widget-close')) {
    widget.classList.remove('widget-close');
    arrow.style.transform = 'scaleX(-1) translate(-3px)'
  } else {
    widget.classList.add('widget-close');
    arrow.style.transform = 'none'
  }
}

function checkbox(el) {
  if(el.classList.contains('overlay-checked')) {
    el.classList.remove('overlay-checked')
  } else {
    el.classList.add('overlay-checked')
  }
}

function breach(btn) {
  let check = document.getElementById('overlay-checkbox');
  if(check.classList.contains('overlay-checked')) {
    window.localStorage.breach = true;
  };

  btn.innerHTML = '███████';

  disableInterval()
}

//document.getElementById('widget').style.top = `${document.documentElement.clientHeight / 2}px`;
