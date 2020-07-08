document.getElementById('menu').addEventListener('touchstart', function(e) {
  let el = document.getElementById('menu');
  el.classList.remove('menu-drag');
  el.classList.add(`pos-${e.touches[0].clientX < el.offsetWidth ? el.classList.contains('menu-closed') ? el.offsetWidth + e.touches[0].clientX : e.touches[0].clientX : e.touches[0].clientX}`)
  el.classList.add(`tms-${new Date().getTime()}`)
}, false);

document.getElementById('menu').addEventListener('touchend', function(e) {
  let el = document.getElementById('menu');
  el.classList.add('menu-drag');

  let pos, tms;
  el.classList.forEach(name => {
    if(name.startsWith('pos-'))
      pos = name;
    if(name.startsWith('tms-'))
      tms = name;
  });
  if(!!pos) {
    el.classList.remove(pos);
    pos = eval(pos.slice(4))
  };
  if(!!tms) {
    el.classList.remove(tms);
    tms = eval(tms.slice(4))
  };

  let now = new Date().getTime();

  let open = false,
  close = false;
  if((pos - e.changedTouches[0].clientX < -100 && !el.classList.contains('menu-closed')) || (e.changedTouches[0].clientX + el.offsetWidth - pos > 100 && el.classList.contains('menu-closed') && now - tms <= 150)) open = true
    else if(pos - e.changedTouches[0].clientX > 100 && !el.classList.contains('menu-closed') && now - tms <= 150) close = true;

  if((Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth >= 50 || close) && !open) {
    el.classList.add('menu-closed');
    el.style.transform = `translateX(${-el.offsetWidth}px)`;
  } else if(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth < 50 || open) {
    el.classList.remove('menu-closed');
    el.style.transform = `translateX(0px)`;
  };
}, false);

window.addEventListener('touchmove', e => {
  let el = document.getElementById('menu');
  if(!el.classList.contains('menu-drag')) {
    let offset;
    el.classList.forEach(name => {
      if(name.startsWith('pos-')) offset = eval(name.slice(4));
    });
    if(!offset) offset = 0;
    let touch = e.targetTouches[0].pageX + (el.offsetWidth - offset);
    if(touch - el.offsetWidth > 0 || touch - el.offsetWidth < -el.offsetWidth) return;
    el.style.transform = `translateX(${touch - el.offsetWidth}px)`;
  }
});
