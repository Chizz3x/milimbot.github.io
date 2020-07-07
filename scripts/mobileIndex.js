function menuDragStart() {
  let el = document.getElementById('menu');
  el.classList.remove('menu-drag');
}

function menuDragStop() {
  let el = document.getElementById('menu');
  el.classList.add('menu-drag');
  if(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth >= 60) {
    el.style.transform = `translateX(${-el.offsetWidth}px)`;
  } else if(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth < 60) {
    el.style.transform = `translateX(0px)`;
  };
  console.log(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth)
}

window.addEventListener('touchmove', e => {
  let el = document.getElementById('menu');
  if(!el.classList.contains('menu-drag')) {
    if(e.targetTouches[0].pageX - el.offsetWidth > 0 || e.targetTouches[0].pageX - el.offsetWidth < -el.offsetWidth) return;
    el.style.transform = `translateX(${e.targetTouches[0].pageX - el.offsetWidth}px)`;
    console.log(e.targetTouches[0].pageX - el.offsetWidth)
  }
});
