const chars = {
  "10000000": "⠁",
  "10000001": "⢁",
  "10000010": "⡁",
  "10000011": "⣁",
  "10000100": "⠡",
  "10000101": "⢡",
  "10000110": "⡡",
  "10000111": "⣡",
  "10001000": "⠅",
  "10001001": "⢅",
  "10001010": "⡅",
  "10001011": "⣅",
  "10001100": "⠥",
  "10001101": "⢥",
  "10001110": "⡥",
  "10001111": "⣥",
  "10010000": "⠑",
  "10010001": "⢑",
  "10010010": "⡑",
  "10010011": "⣑",
  "10010100": "⠱",
  "10010101": "⢱",
  "10010110": "⡱",
  "10010111": "⣱",
  "10011000": "⠕",
  "10011001": "⢕",
  "10011010": "⡕",
  "10011011": "⣕",
  "10011100": "⠵",
  "10011101": "⢵",
  "10011110": "⡵",
  "10011111": "⣵",
  "10100000": "⠃",
  "10100001": "⢃",
  "10100010": "⡃",
  "10100011": "⣃",
  "10100100": "⠣",
  "10100101": "⢣",
  "10100110": "⡣",
  "10100111": "⣣",
  "10101000": "⠇",
  "10101001": "⢇",
  "10101010": "⡇",
  "10101011": "⣇",
  "10101100": "⠧",
  "10101101": "⢧",
  "10101110": "⡧",
  "10101111": "⣧",
  "10110000": "⠓",
  "10110001": "⢓",
  "10110010": "⡓",
  "10110011": "⣓",
  "10110100": "⠳",
  "10110101": "⢳",
  "10110110": "⡳",
  "10110111": "⣳",
  "10111000": "⠗",
  "10111001": "⢗",
  "10111010": "⡗",
  "10111011": "⣗",
  "10111100": "⠷",
  "10111101": "⢷",
  "10111110": "⡷",
  "10111111": "⣷",
  "11000000": "⠉",
  "11000001": "⢉",
  "11000010": "⡉",
  "11000011": "⣉",
  "11000100": "⠩",
  "11000101": "⢩",
  "11000110": "⡩",
  "11000111": "⣩",
  "11001000": "⠍",
  "11001001": "⢍",
  "11001010": "⡍",
  "11001011": "⣍",
  "11001100": "⠭",
  "11001101": "⢭",
  "11001110": "⡭",
  "11001111": "⣭",
  "11010000": "⠙",
  "11010001": "⢙",
  "11010010": "⡙",
  "11010011": "⣙",
  "11010100": "⠹",
  "11010101": "⢹",
  "11010110": "⡹",
  "11010111": "⣹",
  "11011000": "⠝",
  "11011001": "⢝",
  "11011010": "⡝",
  "11011011": "⣝",
  "11011100": "⠽",
  "11011101": "⢽",
  "11011110": "⡽",
  "11011111": "⣽",
  "11100000": "⠋",
  "11100001": "⢋",
  "11100010": "⡋",
  "11100011": "⣋",
  "11100100": "⠫",
  "11100101": "⢫",
  "11100110": "⡫",
  "11100111": "⣫",
  "11101000": "⠏",
  "11101001": "⢏",
  "11101010": "⡏",
  "11101011": "⣏",
  "11101100": "⠯",
  "11101101": "⢯",
  "11101110": "⡯",
  "11101111": "⣯",
  "11110000": "⠛",
  "11110001": "⢛",
  "11110010": "⡛",
  "11110011": "⣛",
  "11110100": "⠻",
  "11110101": "⢻",
  "11110110": "⡻",
  "11110111": "⣻",
  "11111000": "⠟",
  "11111001": "⢟",
  "11111010": "⡟",
  "11111011": "⣟",
  "11111100": "⠿",
  "11111101": "⢿",
  "11111110": "⡿",
  "11111111": "⣿",
  "00000000": "⠀",
  "00100000": "⠂",
  "00001000": "⠄",
  "00101000": "⠆",
  "01000000": "⠈",
  "01100000": "⠊",
  "01001000": "⠌",
  "01101000": "⠎",
  "00010000": "⠐",
  "00110000": "⠒",
  "00011000": "⠔",
  "00111000": "⠖",
  "01010000": "⠘",
  "01110000": "⠚",
  "01011000": "⠜",
  "01111000": "⠞",
  "00000100": "⠠",
  "00100100": "⠢",
  "00001100": "⠤",
  "00101100": "⠦",
  "01000100": "⠨",
  "01100100": "⠪",
  "01001100": "⠬",
  "01101100": "⠮",
  "00010100": "⠰",
  "00110100": "⠲",
  "00011100": "⠴",
  "00111100": "⠶",
  "01010100": "⠸",
  "01110100": "⠺",
  "01011100": "⠼",
  "01111100": "⠾",
  "00000010": "⡀",
  "00100010": "⡂",
  "00001010": "⡄",
  "00101010": "⡆",
  "01000010": "⡈",
  "01100010": "⡊",
  "01001010": "⡌",
  "01101010": "⡎",
  "00010010": "⡐",
  "00110010": "⡒",
  "00011010": "⡔",
  "00111010": "⡖",
  "01010010": "⡘",
  "01110010": "⡚",
  "01011010": "⡜",
  "01111010": "⡞",
  "00000110": "⡠",
  "00100110": "⡢",
  "00001110": "⡤",
  "00101110": "⡦",
  "01000110": "⡨",
  "01100110": "⡪",
  "01001110": "⡬",
  "01101110": "⡮",
  "00010110": "⡰",
  "00110110": "⡲",
  "00011110": "⡴",
  "00111110": "⡶",
  "01010110": "⡸",
  "01110110": "⡺",
  "01011110": "⡼",
  "01111110": "⡾",
  "00000001": "⢀",
  "00100001": "⢂",
  "00001001": "⢄",
  "00101001": "⢆",
  "01000001": "⢈",
  "01100001": "⢊",
  "01001001": "⢌",
  "01101001": "⢎",
  "00010001": "⢐",
  "00110001": "⢒",
  "00011001": "⢔",
  "00111001": "⢖",
  "01010001": "⢘",
  "01110001": "⢚",
  "01011001": "⢜",
  "01111001": "⢞",
  "00000101": "⢠",
  "00100101": "⢢",
  "00001101": "⢤",
  "00101101": "⢦",
  "01000101": "⢨",
  "01100101": "⢪",
  "01001101": "⢬",
  "01101101": "⢮",
  "00010101": "⢰",
  "00110101": "⢲",
  "00011101": "⢴",
  "00111101": "⢶",
  "01010101": "⢸",
  "01110101": "⢺",
  "01011101": "⢼",
  "01111101": "⢾",
  "00000011": "⣀",
  "00100011": "⣂",
  "00001011": "⣄",
  "00101011": "⣆",
  "01000011": "⣈",
  "01100011": "⣊",
  "01001011": "⣌",
  "01101011": "⣎",
  "00010011": "⣐",
  "00110011": "⣒",
  "00011011": "⣔",
  "00111011": "⣖",
  "01010011": "⣘",
  "01110011": "⣚",
  "01011011": "⣜",
  "01111011": "⣞",
  "00000111": "⣠",
  "00100111": "⣢",
  "00001111": "⣤",
  "00101111": "⣦",
  "01000111": "⣨",
  "01100111": "⣪",
  "01001111": "⣬",
  "01101111": "⣮",
  "00010111": "⣰",
  "00110111": "⣲",
  "00011111": "⣴",
  "00111111": "⣶",
  "01010111": "⣸",
  "01110111": "⣺",
  "01011111": "⣼",
  "01111111": "⣾"
};

let contrastSlider = document.getElementById('slider-contrast');
let leapSlider = document.getElementById('slider-leap');
let sizeSlider = document.getElementById('slider-size');

let chosenFile;

function prevDef(e) {
  e.preventDefault();
  e.stopPropagation();
}

function style() {
  let el = document.getElementById('upload-box');
  let btn = document.getElementById('upload-button');

  el.classList.add('upload-box-drag-active');
  btn.classList.add('upload-button-drag-active');
}

function unstyle() {
  let el = document.getElementById('upload-box');
  let btn = document.getElementById('upload-button');

  el.classList.remove('upload-box-drag-active');
  btn.classList.remove('upload-button-drag-active');
}

function greyscale(pixels) {
  for(var i = 0; i < pixels.length; i += 4) {

    let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

    pixels[i] = lightness;
    pixels[i + 1] = lightness;
    pixels[i + 2] = lightness;
  }
}

function contrast(imageData, contrast) {
    let data = imageData.data;
    contrast *= 2.55;
    let factor = (255 + contrast) / (255.01 - contrast);

    for(let i = 0; i < data.length; i += 4)
    {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;

    }
    return imageData;
}

async function processImage() {
  let img = document.getElementById('uploaded-image');
  let out = document.getElementById('output');
  let prev = document.getElementById('image-preview');

  out.innerHTML = '';

  let reader = new FileReader();

  let scale = eval(sizeSlider.value) / 100;
  let leap = eval(leapSlider.value) / 100;
  let lines = true;

  reader.onloadend = function() {
    let image = new Image();

    image.onload = function() {
      let cnv = document.createElement('canvas');

      let prevctx = prev.getContext("2d"); // preview
      prevctx.clearRect(0, 0, prev.width, prev.height);
      prevctx.scale(1, 0.5);
      prevctx.drawImage(image, 0, 0);

      cnv.width = image.width / 100 * eval(sizeSlider.value);
      cnv.height = image.height / 100 * eval(sizeSlider.value);

      let ctx = cnv.getContext('2d');
      ctx.scale(scale, scale);
      ctx.drawImage(image, 0, 0);

      let imageData = ctx.getImageData(0, 0, cnv.width, cnv.height);

      imageData.height *= scale;
      imageData.width *= scale;

      greyscale(imageData.data);
      contrast(imageData, eval(contrastSlider.value));

      let rowData = [];
      let ix, r, g, b, a,
          avg1, avg2;

      let pxc = 0;

      leap *= 255;
      // FIRST BYTES ARE WRONG [2 MORE THAN NEEDED]
      for(let y = 0; y < imageData.height; y++) {
        ix = 0;

        for(let x = imageData.width * y; x < imageData.width * y + imageData.width; x += 2) {
          r = imageData.data[pxc];
          g = imageData.data[pxc + 1];
          b = imageData.data[pxc + 2];
          a = imageData.data[pxc + 3];

          pxc += 4;

          avg1 = (r + g + b + a) / 4;

          r = imageData.data[pxc];
          g = imageData.data[pxc + 1];
          b = imageData.data[pxc + 2];
          a = imageData.data[pxc + 3];

          if(!r || !g || !b || !a) console.log(r, g, b, a);

          pxc += 4;

          avg2 = (r + g + b + a) / 4;

          rowData[ix] = !rowData[ix] ?
            (avg1 <= leap ? '1' : '0') + (avg2 <= leap ? '1' : '0')
          : rowData[ix] + (avg1 <= leap ? '1' : '0') + (avg2 <= leap ? '1' : '0');

          ix += 1;
        };

        if(y % 4 === 0 && y !== 0) {
          console.log(rowData);

          out.innerHTML += rowData.map(m => m[6] === '0' && lines ? chars[m] : chars[m]).join('') + '\n';
          ctx.putImageData(imageData, 0, 0);
          document.body.appendChild(cnv);
          rowData = [];
        }
      }
    }

    image.src = reader.result;
  };

  reader.readAsDataURL(chosenFile);
}

function choose(e, files) {
  if(!!files) {
    e = {target: {files: files}};
    unstyle();
  };

  if(e.target.files.length > 0) {
    let preview = document.getElementById("uploaded-image");

    preview.src = URL.createObjectURL(e.target.files[0]);

    document.getElementById("upload-button").innerHTML = e.target.files[0].name;

    chosenFile = e.target.files[0];
    processImage()
  } else {

  }
}

function handleDrop(e) {
  prevDef(e);

  let dt = e.dataTransfer;
  let files = dt.files;

  choose(undefined, files)
}

function draggedOver(e) {
  prevDef(e);

  style();
}

function draggedOut(e) {
  prevDef(e)

  unstyle();
}

let dropArea = document.getElementById('upload-box')

dropArea.addEventListener('dragover', prevDef, false);
dropArea.addEventListener('dragleave', draggedOut, false);
dropArea.addEventListener('dragenter', draggedOver, false);
dropArea.addEventListener('drop', handleDrop, false);

let sliderTimeout;

[
  contrastSlider,
  leapSlider,
  sizeSlider
].forEach(slider => {
  slider.oninput = function() {
    if(!!chosenFile) {
      if(!!sliderTimeout) clearTimeout(sliderTimeout);
      sliderTimeout = setTimeout(function() {
        document.getElementById('output').innerHTML = '';
        processImage()
      }, 500)
    }
  }
})
