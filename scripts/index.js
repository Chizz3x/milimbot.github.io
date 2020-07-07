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

function linkBubbles() {
  let b1 = document.getElementById('link-bubble-1');
  let b2 = document.getElementById('link-bubble-2');
  let b3 = document.getElementById('link-bubble-3');
  let b4 = document.getElementById('link-bubble-4');
  if(document.body.scrollTop + window.innerHeight >= (document.body.scrollHeight - 20)) {
    if(!b1.classList.contains('link-bubble-1-out'))
      b1.classList.add('link-bubble-1-out');
    if(!b2.classList.contains('link-bubble-2-out'))
      b2.classList.add('link-bubble-2-out');
    if(!b3.classList.contains('link-bubble-3-out'))
      b3.classList.add('link-bubble-3-out');
    if(!b4.classList.contains('link-bubble-4-out'))
      b4.classList.add('link-bubble-4-out');
  } else {
    if(b1.classList.contains('link-bubble-1-out'))
      b1.classList.remove('link-bubble-1-out');
    if(b2.classList.contains('link-bubble-2-out'))
      b2.classList.remove('link-bubble-2-out');
    if(b3.classList.contains('link-bubble-3-out'))
      b3.classList.remove('link-bubble-3-out');
    if(b4.classList.contains('link-bubble-4-out'))
      b4.classList.remove('link-bubble-4-out');
  }
}

window.onscroll = function() {
    menuStick();
    footer();
}

window.addEventListener('mousemove', e => {
  let invite = document.getElementById('invite-bubble');
  if(!invite) return;
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
});

const matr = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

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

  document.getElementById('btn-1').style.transform = `matrix3d(${editMatr([[13, -30]])})`;
  document.getElementById('btn-2').style.transform = `matrix3d(${editMatr([[12, 20], [13, -30], [1, 0.09], [4, -0.09]])})`;
  document.getElementById('btn-3').style.transform = `matrix3d(${editMatr([[12, -20], [13, -30], [1, -0.09], [4, 0.09]])})`
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
    document.getElementById('image-12'),
    document.getElementById('btn-1'),
    document.getElementById('btn-2'),
    document.getElementById('btn-3')
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

function buttonHover(ind) {
  let btn = document.getElementById(`btn-${ind}`);
  btn.classList.add('main-button-hover')
}

function buttonUnhover(ind) {
  let btn = document.getElementById(`btn-${ind}`);
  btn.classList.remove('main-button-hover')
}

function prIn(img) {
  if(!img.classList.contains('logged-in')) {
    img.style.filter = "brightness(50%)";
    document.getElementById('profile-image-box').style.color = 'rgba(255,255,255,0.8)'
  }
}

function prOut(img) {
  if(!img.classList.contains('logged-in')) {
    img.style.filter = "none";
    document.getElementById('profile-image-box').style.color = 'transparent'
  }
}
