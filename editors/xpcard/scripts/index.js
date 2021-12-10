document.getElementById('back-button').addEventListener('mousedown', e => {
  window.location.href = window.location.origin+'/editors'
})

document.getElementById('home-button').addEventListener('mousedown', e => {
  window.location.href = window.location.origin
})

let defaults = {
  overall: {
    color: [85,85,238]
  },
  'xp-card-layout': {
    color: [85,85,238]
  },
  level:  {
    invert: 'false'
  },
  rank:  {
    invert: 'false'
  },
  'xp-box': {
    invert: 'true'
  },
  'xp-card-bar': {
    color: [85,85,238]
  },
  'xp-card-bar-bg': {
    color: [255,255,255]
  },
  'xp-card-bg': {
    hue: 0,
    sat: 100
  }
}

let options = {
  type: 'long',
  overall: {
    color: {
      value: [85,85,238],
      control: document.getElementById('c-overall')
    },
    els: [
      document.getElementById('xp-card-layout'),
      document.getElementById('xp-card-bar')
    ]
  },
  'xp-card-layout': {
    color: {
      value: [85,85,238],
      control: document.getElementById('c-xp-card-layout')
    },
    el: document.getElementById('xp-card-layout')
  },
  rank: {
    invert: {
      value: 'false',
      control: document.getElementById('i-rank')
    },
    el: document.getElementById('rank')
  },
  level: {
    invert: {
      value: 'false',
      control: document.getElementById('i-level')
    },
    el: document.getElementById('level')
  },
  'xp-box': {
    invert: {
      value: 'true',
      control: document.getElementById('i-xp-box')
    },
    el: document.getElementById('xp-box')
  },
  'xp-card-bar': {
    color: {
      value: [85,85,238],
      control: document.getElementById('c-xp-card-bar')
    },
    el: document.getElementById('xp-card-bar')
  },
  'xp-card-bar-bg': {
    color: {
      value: [255,255,255],
      control: document.getElementById('c-xp-card-bar-bg')
    },
    el: document.getElementById('xp-card-bar-bg')
  },
  'xp-card-bg': {
    hue: 0,
    sat: 100,
    el: document.getElementById('xp-card-bg')
  }
};

// interface swap {

let cont = document.getElementById('content'),
    editor = document.getElementById('editor'),
    swapperBox = document.getElementById('swapper-box'),
    editorBox = document.getElementById('editor-box');

document.getElementById('swapper').addEventListener('click', e => {
  window.localStorage.swap = cont.style.float === 'left' ? true : false;
  cont.style.float = cont.style.float === 'left' ? 'right' : 'left';
  editor.style.float = cont.style.float === 'left' ? 'right' : 'left';
  swapperBox.style.left = swapperBox.style.left === '70%' ? '30%' : '70%';
  editorBox.style.direction = editorBox.style.direction === 'rtl' ? 'ltr' : 'rtl';
})

if(window.localStorage.swap === 'true') {
  cont.style.float = 'right';
  editor.style.float = 'left';
  swapperBox.style.left = '30%';
  editorBox.style.direction = 'rtl';
} else {
  cont.style.float = 'left';
  editor.style.float = 'right';
  swapperBox.style.left = '70%';
  editorBox.style.direction = 'ltr';
};

// } interface swap

// custom functions {

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

function rgbToHex(rgb) {
  return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}


// https://stackoverflow.com/questions/13586999/color-difference-similarity-between-two-values-with-js

/*
  <= 1    : not perceptable
  1 - 2   : perceptable through close observation
  2 - 10  : perceptable instantly
  11 - 49 : more simmilar than opposite
  100     : exact opposite
*/
function deltaE(rgbA, rgbB) {
  if(rgbA[0] === '#')
    rgbA = hexToRgb(rgbA);

  if(rgbB[0] === '#')
    rgbB = hexToRgb(rgbB);

  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / (1.0);
  let deltaCkcsc = deltaC / (sc);
  let deltaHkhsh = deltaH / (sh);
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb) {
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

function checkboxToggle(id, load) {
  if(load) {
    if(options[id].invert.value === 'true') {
      options[id].el.style.mixBlendMode = 'difference';
      options[id].invert.control.children[0].classList.add('checkbox-checked');
    } else {
      options[id].el.style.mixBlendMode = 'none';
      options[id].invert.control.children[0].classList.remove('checkbox-checked');
    }
  } else if(options[id].invert.value === 'false') {
    options[id].invert.value = 'true';
    options[id].el.style.mixBlendMode = 'difference';
    options[id].invert.control.children[0].classList.add('checkbox-checked');
  } else {
    options[id].invert.value = 'false';
    options[id].el.style.removeProperty('mix-blend-mode');
    options[id].invert.control.children[0].classList.remove('checkbox-checked');
  }
}

// } custom functions

// Card Element Controllers {

// } Card Element Controllers

// defaults load {

function loadDefaults() {
  // overall: color
  options.overall.color.control.value = rgbToHex(options['xp-card-layout'].color.value);

  // layout: color
  options['xp-card-layout'].color.control.value = rgbToHex(options['xp-card-layout'].color.value);
  options['xp-card-layout'].el.style.backgroundColor = `rgb(${options.overall.color.value})`;

  // bar: color
  options['xp-card-bar'].color.control.value = rgbToHex(options['xp-card-bar'].color.value);
  options['xp-card-bar'].el.style.backgroundColor = `rgb(${options.overall.color.value})`;

  // bar bg: color
  options['xp-card-bar-bg'].color.control.value = rgbToHex(options['xp-card-bar-bg'].color.value);
  options['xp-card-bar-bg'].el.style.backgroundColor = `rgb(${options['xp-card-bar-bg'].color.value})`;

  // bg: hue, saturation
  options['xp-card-bg'].el.style.filter = `hue-rotate(${options['xp-card-bg'].hue}deg) saturate(${options['xp-card-bg'].sat}%)`;

  // bar text: invert, color
  checkboxToggle('xp-box', true);

  // level text: invert
  checkboxToggle('level', true);

  // rank text: invert
  checkboxToggle('rank', true);
}

loadDefaults();

// } defaults load

function invertText(name, bool) {
  options[name].invert = bool.toString();
  if(bool) options[name].el.style['mix-blend-mode'] = 'difference';
    else options[name].el.style.removeProperty('mix-blend-mode');
}

const errorLine = document.getElementById('error-line-1');
let problems = [];

function validateColor(color, id) {
  const relies = {
    'xp-card-bar': ['xp-box'],
    'xp-card-bar-bg': ['xp-box'],
    'xp-card-layout': ['level','rank'],
    'overall': ['level','rank','xp-box']
  };

  if(!relies[id]) return false;

  let bool = true;

  for(let i = 0; i < relies[id].length; i++) {
    if(options[relies[id][i]].invert.value === 'true') {
      if(deltaE(color, [127.5,127.5,127.5]) < 20) {
        bool = false;
        if(!problems.includes(id)) problems.push(id);
        break;
      }
    } else {
      if(deltaE(color, [255,255,255]) < 20) {
        bool = false;
        if(!problems.includes(id)) problems.push(id);
        console.log('wrong');
        break;
      }
    }
  };

  if(!bool) {
    errorLine.innerHTML = `WARNING: ${id.split('-').length > 1 ?
      id.split('-').slice(2).join(' ')
    : id} blends with text.`;
  } else if(problems.includes(id)) {
    problems.splice(problems.indexOf(id), 1);
    errorLine.innerHTML = problems.length > 0 ?
      `WARNING: ${problems[0].split('-').length > 1 ?
        problems[0].split('-').slice(2).join(' ')
      : problems[0]} blends with text.`
    : '';
  } else if(problems.length > 0) {
    errorLine.innerHTML = `WARNING: ${problems[0].split('-').length > 1 ?
      problems[0].split('-').slice(2).join(' ')
    : problems[0]} blends with text.`;
  }


  return true;
}

// color pickers {

function colorPickerChange(el) {
  let rgb = hexToRgb(el.value);
  if(!validateColor(rgb, el.id.slice(2))) return;
  if(el.id === 'c-overall') {
    options['xp-card-bar'].el.style['background-color'] = `rgb(${rgb})`;
    options['xp-card-layout'].el.style['background-color'] = `rgb(${rgb})`;
  } else {
    let attr = el.getAttribute('target');
    options[el.id.slice(2)].el.style[attr] = `rgb(${rgb})`;
  }
}

let colorPickers = document.getElementsByClassName('color-picker');

for(let i = 0; i < colorPickers.length; i++)
  colorPickers[i].addEventListener('input', e => {
    colorPickerChange(colorPickers[i])
  })

// } color pickers

// checkboxes {

function checkboxed(id, value) {
  if(!!options[id].el.style['mix-blend-mode'])
    options[id].el.style.removeProperty('mix-blend-mode')
  else options[id].el.style['mix-blend-mode'] = 'difference'
}

let checkboxes = document.getElementsByClassName('checkbox');
for(let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', e => {
    checkboxToggle(checkboxes[i].id.slice(2));
  })
};

// } checkboxes

// on window resize, refresh sliders
window.onresize = function() {
  sliders.refresh();
}

// Prevent shift + click text selection {

window.addEventListener("keyup", (e) => {
    document.onselectstart = function() {
        return !(e.key == "Shift" && e.shiftKey)
    }
})
window.addEventListener("keydown", (e) => {
    document.onselectstart = function() {
        return !(e.key == "Shift" && e.shiftKey)
    }
})

// }

// sliders {

class slider {
  constructor(c, max, cur) {
    this.class = c;
    let els = document.getElementsByClassName(c);
    for(let i = 0; i < els.length; i++)
      this.create(els[i]);
  }

  refresh() {
    let knobs = document.getElementsByClassName('slider-knob');
    for(let i = 0; i < knobs.length; i++) {
      let el = knobs[i].parentElement.parentElement;
      knobs[i].style.transform = `translateX(${(el.getBoundingClientRect().width - 14) / el.getAttribute('max') * el.value}px)`;
    }
  }

  moveKnob(e, el, knob, valueDisp, zero) {
    let knobRect = knob.getBoundingClientRect(),
        rect = el.getBoundingClientRect();

    let knobPos = e.layerX - knobRect.width / 2;
    let perc = el.parentElement.getAttribute('max') / (rect.width - 14) * knobPos;

    if(perc < 0) {
      perc = 0;
      knobPos = 0;
    };
    if(perc > el.parentElement.getAttribute('max')) {
      perc = eval(el.parentElement.getAttribute('max'));
      knobPos = rect.width - 14;
    };
    if(zero) {
      perc = eval(el.parentElement.getAttribute('value'));
      knobPos = (el.parentElement.getBoundingClientRect().width - 14) / el.parentElement.getAttribute('max') * el.parentElement.getAttribute('value');
    };

    valueDisp.innerHTML = Math.round(perc).toString();

    options[el.parentElement.id.slice(2)].sat = perc;
    options[el.parentElement.id.slice(2)].el.style.filter = `hue-rotate(${options[el.parentElement.id.slice(2)].hue}deg) saturate(${perc}%)`;

    knob.style.transform = `translateX(${knobPos}px)`;

    el.parentElement.value = perc;
  }

  create(el) {
    let slide = document.createElement('div');
    slide.classList.add('slider-bg');
    el.appendChild(slide);
    el.value = el.getAttribute('value');
    let knob = document.createElement('div');
    knob.classList.add('slider-knob');
    slide.appendChild(knob);
    let valueDisp = document.createElement('span');
    valueDisp.innerHTML = el.getAttribute('value');
    knob.style.transform = `translateX(${(el.getBoundingClientRect().width - 14) / el.getAttribute('max') * el.getAttribute('value')}px)`;
    valueDisp.classList.add('value-disp');
    el.appendChild(valueDisp);

    el.addEventListener('click', e => {
      if(e.shiftKey)
        this.moveKnob(e, slide, knob, valueDisp, true)
    })

    el.addEventListener('mousedown', e => {
      el['aria-label'] = 'true';
      if(!e.shiftKey)
        this.moveKnob(e, slide, knob, valueDisp)
    })

    el.addEventListener('mouseout', e => {
      el['aria-label'] = 'false';
    })

    el.addEventListener('mouseup', e => {
      el['aria-label'] = 'false';
    })

    el.addEventListener('mousemove', e => {
      if(el['aria-label'] === 'true') {
        this.moveKnob(e, slide, knob, valueDisp)
      }
    })
  }
}

let sliders = new slider('slider');

// } sliders

// circle sliders {

class circleSlider {
  constructor(c) {
    this.class = c;
    let els = document.getElementsByClassName(c);
    for(let i = 0; i < els.length; i++)
      this.create(els[i]);
  }

  moveKnob(e, circle, knob, valueDisp, zero) {
    let rect = circle.getBoundingClientRect();
    let middle = rect.width / 2;

    let x = zero ? 0 : e.layerX - middle,
        y = zero ? -middle : e.layerY - middle;

    let r = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));

    let theta = Math.atan2(y, x);
    theta *= 180 / Math.PI;
    theta += 90;
    if(theta < 0)
      theta += 360;

    valueDisp.innerHTML = Math.round(theta).toString();

    options[circle.parentElement.id.slice(2)].hue = theta;
    options[circle.parentElement.id.slice(2)].el.style.filter = `hue-rotate(${theta}deg) saturate(${options[circle.parentElement.id.slice(2)].sat}%)`;

    knob.style.transform = `translate(${middle * Math.sin(Math.PI * 2 * theta / 360)}px,${-middle * Math.cos(Math.PI * 2 * theta / 360)}px)`;

    circle.parentElement.value = theta;
  }

  create(el) {
    let circle = document.createElement('div');
    circle.classList.add('circle-slider-border');
    el.appendChild(circle);
    let knob = document.createElement('div');
    knob.classList.add('circle-slider-knob');
    circle.appendChild(knob);
    let valueDisp = document.createElement('span');
    valueDisp.innerHTML = '0';
    valueDisp.classList.add('circle-value-disp');
    circle.appendChild(valueDisp);

    knob.style.transform = `translate(0px,${circle.getBoundingClientRect().width / -2}px)`;

    circle.addEventListener('click', e => {
      if(e.shiftKey)
        this.moveKnob(e, circle, knob, valueDisp, true)
    })

    circle.addEventListener('mousedown', e => {
      circle['aria-label'] = 'true';
      if(!e.shiftKey)
        this.moveKnob(e, circle, knob, valueDisp)
    })

    circle.addEventListener('mouseout', e => {
      circle['aria-label'] = 'false';
    })

    circle.addEventListener('mouseup', e => {
      circle['aria-label'] = 'false';
    })

    circle.addEventListener('mousemove', e => {
      if(circle['aria-label'] === 'true') {
        this.moveKnob(e, circle, knob, valueDisp)
      }
    })
  }
}

let circleSliders = new circleSlider('circle-slider');

// } circle sliders


// type change {

let cardBody = document.getElementById('xp-card-body');

function changeType(holder) {
  document.getElementsByClassName('type-selected')[0].classList.remove('type-selected');
  holder.classList.add('type-selected');

  let name = holder.children[0].classList[0].split('-')[1];

  if(cardBody.classList[0].split('-')[0] === name) return;
  console.log(cardBody.classList[0], holder.children[0].classList[0]);

  cardBody.classList.remove(cardBody.classList[0]);
  cardBody.classList.add(name+'-card-body');

  options['xp-card-bg'].el.src = './images/'+name+'/1.jpg';

  options['xp-card-layout'].el.classList.remove(`${options.type}-layout`);
  options['xp-card-bar-bg'].el.classList.remove(`${options.type}-bar-bg`);
  options['xp-card-bar'].el.classList.remove(`${options.type}-bar`);
  options['level'].el.parentElement.classList.remove(`${options.type}-level`);
  options['rank'].el.parentElement.classList.remove(`${options.type}-rank`);
  options['xp-box'].el.classList.remove(`${options.type}-xp-box`);
  options.type = name;
  options['xp-card-layout'].el.classList.add(`${name}-layout`);
  options['xp-card-bar-bg'].el.classList.add(`${name}-bar-bg`);
  options['xp-card-bar'].el.classList.add(`${name}-bar`);
  options['level'].el.parentElement.classList.add(`${name}-level`);
  options['rank'].el.parentElement.classList.add(`${name}-rank`);
  options['xp-box'].el.classList.add(`${name}-xp-box`);

  if(name === 'square') {
    options['xp-card-bar-bg'].el.style['background-image'] = "url('./images/square/1.jpg')";
    options['level'].el.innerHTML = 'Level : 11';
    options['rank'].el.innerHTML = 'Rank : 3698';
  } else {
    options['xp-card-bar-bg'].el.style.removeProperty('background-image');
    options['level'].el.innerHTML = 'L11';
    options['rank'].el.innerHTML = 'R3698';
  };
}

let typeHolers = document.getElementsByClassName('type-holder');
for(let i = 0; i < typeHolers.length; i++) {
  typeHolers[i].addEventListener('click', (e) => {
    changeType(typeHolers[i])
  })
};

// } type change




// Easter egg shittery ...
let mention = document.getElementById('eastr-egg');

const hits = {
  5: {
    text: 'click?',
    color: '#9372da'
  },
  10: {
    text: 'click click??',
    color: '#b472da'
  },
  20: {
    text: 'oOo CLICK!?',
    color: '#e051d9'
  },
  30: {
    text: 'click nya nya?',
    color: '#e0387e'
  },
  50: {
    text: 'NYAAA~~!',
    color: '#f50c0c'
  }
};

let tempHit;

let clickCount = 0,
    clickTs = 0,
    now = 0;

class comicText {
  colors = [
    '#eb3434',
    '#eb9c34',
    '#ebdc34',
    '#59eb34',
    '#34eb86',
    '#34ebd0',
    '#34a2eb',
    '#3440eb',
    '#7d34eb',
    '#bd34eb',
    '#eb34d0',
    '#eb3483'
  ];

  constructor(el, text) {
    this.el = el;
    let span = document.createElement('span');
    span.innerHTML = text;
    span.classList.add('comicText');
    span.style.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    span.style.transform = `rotateZ(${Math.random() * (45 - -45) + -45}deg) translate(${(Math.random() * (80 - -80) + -80) - 50}px, ${Math.random() * (80 - -80) + -80}px)`
    this.span = span;
    el.appendChild(span)
  }

  start() {
    setTimeout(function(el, span) {
      el.removeChild(span);
    }, 700, this.el, this.span)
  }
}

function resetColors() {
  mention.style.removeProperty('background');
  mention.style.removeProperty('box-shadow');
}
let removeColorsTm,
    clickUnlocked = true;

function easterEgg() {
  clickUnlocked = false;
  setTimeout(function() {
    let theNya = document.getElementById('nya');

    nya.style.display = 'block';
    nya.style.opacity = '1';
    nya.style.transform = `rotateZ(${Math.random() * (45 - -45) + -45}deg) translate(${Math.random() * 80}px, ${Math.random() * 80}px)`;

    let nyamp3 = document.getElementById('nyamp3');
    nyamp3.currentTime = '1';
    nyamp3.play();

    setTimeout(function() {
      nya.style.opacity = '0';
      setTimeout(function() {
        nya.style.display = 'none';
      }, 1000)
    }, 1000)

    clickUnlocked = true;
  }, 2000)
}

mention.addEventListener('mousedown', e => {
  now = new Date().getTime();
  if((now - clickTs <= 200 || clickTs == 0) && clickUnlocked) {
    clickCount++;

    if(!!removeColorsTm)
      clearTimeout(removeColorsTm);

    removeColorsTm = setTimeout(resetColors, 500)

    if(!!hits[clickCount]) {
      tempHit = hits[clickCount].text;
      mention.style.background = hits[clickCount].color;
    };

    mention.style['box-shadow'] = `0 0 ${clickCount / 3}px #f50a0a,0 0 ${clickCount}px #f0ec7d`;

    if(!!tempHit)
      new comicText(mention, tempHit).start();

    if(clickCount >= 70)
      easterEgg();
  } else {
    clickCount = 0;
    tempHit = undefined;
  };
  clickTs = now;
})

// Make sure scrolling stays at 0 no matter what
window.onload = function() {
  window.scrollTo(0, 0);
}
window.scrollTo(0, 0);
