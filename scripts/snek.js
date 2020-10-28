const step = 30;
let path;
let moveLock;
let pendingParts;
let pendingPlace;
const startPos = [180, 120];
const bodyLength = 3;
let stop;
let speed;
let food;
let foodEaten;
let elements = {};
let parts = {},
foods = {};
let holder;

let snek;

function resetVariables() {
  path = [];
  moveLock = false;
  pendingParts = [];
  pendingPlace = [];
  stop = false;
  speed = 200;
  food = [];
  foodEaten = false;
  snek = [];
}

const partsFood = [
  'cherries',
  'apple',
  'carrot',
  'honey'
];

const partsNames = [
  'head_top_1',
  'head_top_2',
  'head_bottom_1',
  'head_bottom_2',
  'head_left_1',
  'head_left_2',
  'head_right_1',
  'head_right_2',
  'body_l_1',
  'body_l_2',
  'body_h_1',
  'body_h_2',
  'tip_bottom_1',
  'tip_bottom_2',
  'tip_left_1',
  'tip_left_2',
  'tip_right_1',
  'tip_right_2',
  'tip_top_1',
  'tip_top_2',
  'bottom_left',
  'bottom_right',
  'top_left',
  'top_right'
];

let gameArea;

function component(width, height, x, y, id) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.sx = 0;
  this.id = id;
  this.sprite = {};
  this.move = [step, 0];
  this.stop = function(sx, sy) {
    stop = true;
    this.x = sx;
    this.y = sy;
    gameArea.stop()
  }

  this.updateSprite = function() {
    let before = snek[this.id + 1],
    after = snek[this.id - 1];

    let junct1,
    junct2;

    if(this.id !== 0 && this.id + 1 !== snek.length) {
      junct1 = after.y - step === this.y && after.x === this.x ?
        1
      : after.y + step === this.y && after.x === this.x ?
        3
      : after.x - step === this.x && after.y === this.y ?
        4
      : 2;

      junct2 = before.y - step === this.y && before.x === this.x ?
        1
      : before.y + step === this.y && before.x === this.x ?
        3
      : before.x - step === this.x && before.y === this.y ?
        4
      : 2
    };

    let nowPart = this.id === 0 ?
      this.move[0] < 0 ?
        'head_left'
      : this.move[0] > 0 ?
        'head_right'
      : this.move[1] > 0 ?
        'head_bottom'
      : 'head_top'
    : this.id + 1 === snek.length ?
      after.y - this.y > 0 ?
        'tip_top'
      : after.x - this.x > 0 ?
        'tip_left'
      : after.x - this.x < 0 ?
        'tip_right'
      : 'tip_bottom'
    : (junct1 === 2 && junct2 === 1)
      || (junct1 === 1 && junct2 === 2) ?
      'bottom_left'
    : (junct1 === 4 && junct2 === 1)
      || (junct1 === 1 && junct2 === 4) ?
      'bottom_right'
    : (junct1 === 3 && junct2 === 2)
      || (junct1 === 2 && junct2 === 3) ?
      'top_left'
    : (junct1 === 3 && junct2 === 4)
      || (junct1 === 4 && junct2 === 3) ?
      'top_right'
    : this.x - this.sx === 0 ?
      'body_h'
    : 'body_l';

    if(nowPart.startsWith('bottom') || nowPart.startsWith('top')) {
      this.sprite.id = this.sprite.id % 2 === 0 ? 1 : 2;
      this.sprite.el = parts[nowPart];
    } else if(this.id === 0) {
      this.sprite.id = this.sprite.id % 2 === 0 ? 1 : 2;
      this.sprite.el = parts[nowPart+'_'+this.sprite.id];
    } else {
      this.sprite.id = snek[this.id - 1].sprite.id % 2 === 0 ? 1 : 2;
      this.sprite.el = parts[nowPart+'_'+this.sprite.id];
    };

    if(gameArea.moving) gameArea.context.drawImage(this.sprite.el, this.x, this.y, this.width, this.height);
  }

  this.updatePos = function() {
    if(!path[this.id]) path.push([this.x, this.y])
      else path.splice(this.id, 1, [this.x, this.y]);

    if(foodEaten && this.id + 1 === snek.length) return foodEaten = false;

    pendingPlace = [snek[snek.length - 2].x, snek[snek.length - 2].y];

    this.sx = this.x
    let sy = this.y;
    if(this.id !== 0) {
      this.x = path[this.id - 1][0];
      this.y = path[this.id - 1][1];
    } else {
      this.x += !this.move[0] ? 0 : this.move[0];
      this.y += !this.move[1] ? 0 : this.move[1];

      // snake hits itself
      let front = snek.slice(1).find(f => f.x === this.x && f.y === this.y);
      if(!!front) if(front.id + 1 !== snek.length) {
        this.stop(this.sx, sy)
      };
    };
    if(stop) return;

    // snake hits border
    if(this.x > gameArea.canvas.width - this.width) return this.stop(gameArea.canvas.width - this.width, this.y);
    if(this.x < 0) return this.stop(0, this.y);
    if(this.y > gameArea.canvas.height - this.height) this.stop(this.x, this.y = gameArea.canvas.height - this.height);
    if(this.y < 0) return this.stop(this.x, 0);

    let foodEat = food.find(f => f.pos[0] === this.x && f.pos[1] === this.y);
    if(!!foodEat) {
      food.splice(food.indexOf(foodEat), 1);
      if(speed > 100) {
        speed *= 0.95;
        elements.speed.innerHTML = eval(elements.speed.innerHTML) + 1;
      };
      elements.score.innerHTML = eval(elements.score.innerHTML) + 10;
      gameArea.updateMove();
      snek.push(new component(step, step, pendingPlace[0], pendingPlace[1], snek.length));
      foodEaten = true;
    }
  }
}

let foodSpawnTimeout = 0;

function updateGameArea() {
  gameArea.clear();

  for(let i = 0; i < snek.length; i++)
    snek[i].updatePos();

  for(let i = 0; i < snek.length; i++)
    snek[i].updateSprite();

  spawnFood();
  drawFood();

  if(!!pendingParts[0]) {
    pendingParts.shift();
    snek.push(new component(step, step, pendingPlace[0], pendingPlace[1], snek.length))
  };
  moveLock = false;

  foodSpawnTimeout++;
}

function drawFood() {
  for(let i = 0; i < food.length; i++) {
    gameArea.context.drawImage(food[i].el, food[i].pos[0], food[i].pos[1], step, step);
  }
}

function getFoodPos() {
  let xpos, ypos;
  do {
    let randx = Math.random() * gameArea.canvas.width;
    let randy = Math.random() * gameArea.canvas.height;
    xpos = randx - (randx % 30);
    ypos = randy - (randy % 30)
  } while(food.find(f => f.pos[0] === xpos && f.pos[1] === ypos) || snek.find(f => f.x === xpos && f.y === ypos))

  return [xpos, ypos]
}

function spawnFood() {
  if(food.length < 5) {
    if(Math.random() > 0.95 || foodSpawnTimeout >= 10) {
      foodSpawnTimeout = 0;

      let pos = getFoodPos();

      let randomFood = {
        pos: [pos[0], pos[1]],
        el: foods[partsFood[Math.floor(Math.random() * partsFood.length)]]
      };
      food.push(randomFood);
    }
  }
}

function loadScreen() {
  gameArea.start();

  for(let i = 0; i < bodyLength; i++) {
    snek.push(new component(step, step, startPos[0] - step * i, startPos[1], i))
  };

  let tvlines = document.createElement('div');
  tvlines.id = 'tvlines';
  holder.appendChild(tvlines);

  let filter = document.createElement('img');
  filter.id = 'snek-filter';
  filter.src = 'https://github.com/Chizz3x/Milim.bot.github.io/blob/master/images/snek/whitenoise.png?raw=true';
  holder.appendChild(filter);

  holder.appendChild(elements.frame);
}

document.onkeydown = function(e) {
  if(!(gameArea || {started: false}).started) return;

  e = e || window.event;

  if(!document.body.classList.contains('disable-scroll'))
    document.body.classList.add('disable-scroll');

  if(!snek[0]) return;

  if(e.keyCode == 38 && !snek[0].move[1] && !moveLock) {
    snek[0].move = [0, -step];
    moveLock = true;
  } else if (e.keyCode == 40 && !snek[0].move[1] && !moveLock) {
    snek[0].move = [0, step];
    moveLock = true;
  } else if (e.keyCode == 37 && !snek[0].move[0] && !moveLock) {
    snek[0].move = [-step, 0];
    moveLock = true;
  } else if (e.keyCode == 39 && !snek[0].move[0] && !moveLock) {
    snek[0].move = [step, 0];
    moveLock = true;
  } else if(e.keyCode == 13) {
    if(!gameArea.moving) {
      gameArea.move();
      elements.scoreDisplayBox.classList.add('snek-hide')
    }
  }
}

function start() {
  holder = document.getElementById('snek-holder');
  holder.classList.remove('snek-hide');

  document.body.classList.add('disable-scroll');

  holder.style['background-color'] = 'rgba(10,10,10,0.5)';

  elements.frame = document.createElement('div');
  elements.frame.id = 'snek-frame';

  elements.close = document.createElement('img');
  elements.close.id = 'snek-close';
  elements.close.src = 'https://github.com/Chizz3x/Milim.bot.github.io/blob/master/images/snek/close.png?raw=true'
  elements.frame.appendChild(elements.close);

  elements.header = document.createElement('div');
  elements.header.id = 'snek-header';
  elements.frame.appendChild(elements.header);

  elements.headerText = document.createElement('div');
  elements.headerText.innerHTML = "SNEK!";
  elements.headerText.id = 'snek-header-text';
  elements.header.appendChild(elements.headerText);

  elements.scoreBox = document.createElement('div');
  elements.scoreBox.id = 'snek-score-box';
  elements.header.appendChild(elements.scoreBox);

  elements.scoreText = document.createElement('div');
  elements.scoreText.id = 'snek-score-text';
  elements.scoreText.innerHTML = "Score:";
  elements.scoreBox.appendChild(elements.scoreText);

  elements.score = document.createElement('div');
  elements.score.id = 'snek-score';
  elements.score.innerHTML = "0";
  elements.scoreBox.appendChild(elements.score);

  elements.speedText = document.createElement('div');
  elements.speedText.id = 'snek-speed-text';
  elements.speedText.innerHTML = ":Speed";
  elements.scoreBox.appendChild(elements.speedText);

  elements.speed = document.createElement('div');
  elements.speed.id = 'snek-speed';
  elements.speed.innerHTML = "0";
  elements.scoreBox.appendChild(elements.speed);

  elements.scoreDisplayBox = document.createElement('div');
  elements.scoreDisplayBox.id = 'score-display-box';
  elements.frame.appendChild(elements.scoreDisplayBox);

  elements.scoreDisplayText = document.createElement('p');
  elements.scoreDisplayText.id = 'score-display-text';
  elements.scoreDisplayText.innerHTML = "Best score";
  elements.scoreDisplayBox.appendChild(elements.scoreDisplayText);

  elements.scoreDisplay = document.createElement('p');
  elements.scoreDisplay.id = 'score-display';
  elements.scoreDisplay.innerHTML = window.localStorage.snekBestScore || '0';
  elements.scoreDisplayBox.appendChild(elements.scoreDisplay);

  elements.pressEnter = document.createElement('p');
  elements.pressEnter.id = 'press-enter';
  elements.pressEnter.innerHTML = "Press Enter";
  elements.scoreDisplayBox.appendChild(elements.pressEnter);

  elements.helperBox = document.createElement('div');
  elements.helperBox.id = 'snek-helper-box';
  elements.scoreDisplayBox.appendChild(elements.helperBox);

  elements.helperText = document.createElement('p');
  elements.helperText.id = 'snek-helper-text';
  elements.helperText.innerHTML = "Controls";
  elements.helperBox.appendChild(elements.helperText);

  elements.helperImage = document.createElement('img');
  elements.helperImage.id = 'snek-helper-image';
  elements.helperImage.src = 'https://github.com/Chizz3x/Milim.bot.github.io/blob/master/images/snek/controls.png?raw=true'
  elements.helperBox.appendChild(elements.helperImage);

  waitUntilElementExists('#snek-close', el => {
    el.addEventListener('mousedown', () => {
      closeSnek()
    });
  })

  gameArea = {
    moving: false,
    canvas: document.createElement("canvas"),
    started: false,
    interval: null,
    start: function() {
      this.started = true;

      let part;
      for(let i = 0; i < partsNames.length; i++) {
        part = document.createElement('img');
        part.classList.add('sprite');
        part.src = `https://github.com/Chizz3x/Milim.bot.github.io/blob/master/images/snek/${partsNames[i]}.png?raw=true`;
        holder.appendChild(part);
        parts[partsNames[i]] = part;
      };

      for(let i = 0; i < partsFood.length; i++) {
        part = document.createElement('img');
        part.classList.add('sprite');
        part.src = `https://github.com/Chizz3x/Milim.bot.github.io/blob/master/images/snek/${partsFood[i]}.png?raw=true`;
        holder.appendChild(part);
        foods[partsFood[i]] = part;
      };

      this.canvas.width = 690;
      this.canvas.height = 480;
      this.canvas.id = 'snek-game';
      this.context = this.canvas.getContext("2d");
      elements.frame.appendChild(this.canvas);
    },
    move: function() {
      this.moving = true;
      this.interval = setInterval(updateGameArea, speed);
    },
    updateMove: function() {
      clearInterval(this.interval);
      this.interval = setInterval(updateGameArea, speed);
    },
    stop: function(close) {
      clearInterval(this.interval);

      if(close) return;

      for(let i = 0; i < snek.length; i++)
        gameArea.context.drawImage(snek[i].sprite.el, snek[i].x, snek[i].y, snek[i].width, snek[i].height);

      resetVariables();

      elements.scoreDisplayBox.classList.remove('snek-hide');
      this.moving = false;

      for(let i = 0; i < bodyLength; i++) {
        snek.push(new component(step, step, startPos[0] - step * i, startPos[1], i))
      };

      window.localStorage.snekScore = elements.score.innerHTML;
      if((window.localStorage.snekBestScore || 0) < eval(elements.score.innerHTML))
        window.localStorage.snekBestScore = eval(elements.score.innerHTML);

      elements.scoreDisplay.innerHTML = window.localStorage.snekScore;
      elements.scoreDisplayText.innerHTML = 'Recent score';

      elements.speed.innerHTML = 0;
      elements.score.innerHTML = 0;
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  resetVariables();

  loadScreen();
}

const waitUntilElementExists = (selector, callback) => {
  const el = document.querySelector(selector);
  if(el) return callback(el);
  setTimeout(() => waitUntilElementExists(selector, callback), 500);
}

function closeSnek() {
  holder.style['background-color'] = '';
  holder.classList.add('snek-hide');
  document.body.classList.remove('disable-scroll');
  gameArea.stop(true);
  gameArea = {};
  Array.from(holder.children).forEach(child => {
    child.remove()
  });
}

document.getElementById('love').children[0].addEventListener('mousedown', () => {
  start()
});
