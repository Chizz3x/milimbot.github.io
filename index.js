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
  let invite = document.getElementById('invite-container');
  let invoff = invite.getBoundingClientRect();
  let x = e.clientX - invoff.left - invoff.width / 2,
  y = e.clientY - invoff.top - invoff.height / 2;
  invite.style.transform = `matrix3d(
		1 /*y rot*/, 0, 0, ${x / 1000000} /*y smear*/,
		0, 1, 0, ${y / 1000000} /*x smear*/,
		0, 0, 1, 0,
		0 /*x move*/, 0 /*y move*/, 0, 1
	)`;
});
