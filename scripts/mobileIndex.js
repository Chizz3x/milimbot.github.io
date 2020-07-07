document.getElementById('menu').addEventListener('touchstart', function(e) {
  let el = document.getElementById('menu');
  el.classList.remove('menu-drag');
  el.classList.add(`pos-${e.touches[0].clientX < el.offsetWidth ? el.classList.contains('menu-closed') ? el.offsetWidth + e.touches[0].clientX : e.touches[0].clientX : e.touches[0].clientX}`)
}, false);

function menuDragStop() {
  let el = document.getElementById('menu');
  el.classList.add('menu-drag');
  el.classList.forEach(name => {
    if(name.startsWith('pos-'))
      el.classList.remove(name)
  });
  if(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth >= 50) {
    el.classList.add('menu-closed');
    el.style.transform = `translateX(${-el.offsetWidth}px)`;
  } else if(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth < 50) {
    el.classList.remove('menu-closed');
    el.style.transform = `translateX(0px)`;
  };
}

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
