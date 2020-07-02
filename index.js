function openInNewTab(url) {
  let win = window.open(url, '_blank');
  win.focus()
}

function menuStick() {
  let posFromTop = document.body.scrollTop;
  let menu = document.getElementById('menu'),
  btns = document.getElementById('main-buttons-box');
  if(posFromTop === 0 && menu.classList.contains('menu-shrink')) {
    menu.classList.remove('menu-shrink')
  } else if(posFromTop !== 0 && !menu.classList.contains('menu-shrink')) {
    menu.classList.add('menu-shrink')
  }
}

window.onscroll = function() {
    menuStick()
}

window.addEventListener('mousemove', e => {
  let invite = document.getElementById('invite-bubble');
  let invoff = invite.getBoundingClientRect();
  let x = e.clientX - invoff.left - invoff.width / 2,
  y = e.clientY - invoff.top - invoff.height / 2;
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

function activate(bubble) {
  let ring1 = document.getElementById('ring-1'),
  ring2 = document.getElementById('ring-2')
  ring3 = document.getElementById('ring-3');

  bubble.style['background-color'] = "rgba(150, 150, 220, 0.6)";
  bubble.style['box-shadow'] = '0 0 5px 5px rgba(150, 150, 220, 0.3)';

  ring1.style['border-color'] = 'rgba(160, 160, 200, 0.6)';
  ring1.style.width = '210px';
  ring1.style.height = '210px';

  ring2.style['border-color'] = 'rgba(200, 200, 240, 0.5)';
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
    document.getElementById('image-8')
  ];

  images[0].style.transform = `matrix3d(${editMatr([[12, 30], [13, 8]])})`;
  images[1].style.transform = `matrix3d(${editMatr([[12, -10], [13, -5]])})`;
  images[2].style.transform = `matrix3d(${editMatr([[13, -15]])})`;
  images[3].style.transform = `matrix3d(${editMatr([[12, 10], [13, -10]])})`
}

function deactivate(bubble) {
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
    document.getElementById('image-8')
  ];

  images.forEach(i => {i.style.transform = `none`})
}
