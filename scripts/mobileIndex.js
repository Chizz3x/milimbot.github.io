document.getElementById('menu').addEventListener('touchstart', function(e) {
  let el = document.getElementById('menu');
  el.classList.remove('menu-drag');
  sessionStorage.pos = e.touches[0].clientX < el.offsetWidth ? el.classList.contains('menu-closed') ? el.offsetWidth + e.touches[0].clientX : e.touches[0].clientX : e.touches[0].clientX;
  sessionStorage.tms = new Date().getTime();
}, false);

document.getElementById('menu').addEventListener('touchend', function(e) {
  let el = document.getElementById('menu');
  el.classList.add('menu-drag');

  let pos = sessionStorage.pos,
  tms = sessionStorage.tms;

  let now = new Date().getTime();

  let open = false,
  close = false;
  if((pos - e.changedTouches[0].clientX < -100 && !el.classList.contains('menu-closed')) || (e.changedTouches[0].clientX + el.offsetWidth - pos > 100 && el.classList.contains('menu-closed') && now - tms <= 150)) open = true
    else if(pos - e.changedTouches[0].clientX > 100 && !el.classList.contains('menu-closed') && now - tms <= 150) close = true;

  if((Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth >= 50 || close) && !open) {
    el.classList.add('menu-closed');
    document.getElementById('menu-arrow-box').classList.remove('menu-arrow-box-out');
    el.style.transform = `translateX(${-el.offsetWidth}px)`;
  } else if(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth < 50 || open) {
    el.classList.remove('menu-closed');
    document.getElementById('menu-arrow-box').classList.add('menu-arrow-box-out');
    el.style.transform = `translateX(0px)`;
  };
}, false);

window.addEventListener('touchmove', e => {
  let el = document.getElementById('menu'),
  menuArrow = document.getElementById('menu-arrow-box');
  if(!el.classList.contains('menu-drag')) {
    let offset = sessionStorage.pos;
    if(!offset) offset = 0;
    let touch = e.targetTouches[0].pageX + (el.offsetWidth - offset);
    if(touch - el.offsetWidth > 0 || touch - el.offsetWidth < -el.offsetWidth) return menuArrow.classList.add('menu-arrow-box-out');
    if(menuArrow.classList.contains('menu-arrow-box-out') && el.classList.contains('menu-closed')) menuArrow.classList.remove('menu-arrow-box-out');
    el.style.transform = `translateX(${touch - el.offsetWidth}px)`;
  }
});

window.onload = () => {
  sessionStorage.loaded = true
};

function bubbleTouch(el) {
  el.style['box-shadow'] = '0 0 25px 10px rgba(242, 142, 131, 0.3)';
  el.style['background-color'] = 'rgba(242, 142, 131, 0.6)'
}

function bubbleTouchStop(el) {
  el.style['box-shadow'] = '0 0 20px 10px rgba(130, 130, 180, 0.3)';
  el.style['background-color'] = 'rgba(130, 130, 180, 0.6)'
}
