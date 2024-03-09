import './style.css';

document.querySelector('#app').innerHTML = `
  <div>
  <h1 id="title">Pixel-Art</h1>
  <ul id="color-palette">
      <li id="color-red" class="color"></li>
      <li id="color-blue" class="color"></li>
      <li id="color-yellow" class="color"></li>
      <li id="color-black" class="color"></li>
      <li id="color-orange" class="color"></li>
      <li id="color-green" class="color"></li>
      <li id="color-white" class="color"></li>
  </ul>
  <button id="generate-board">Board</button>    
  <input id="board-size" type="number" min="1">
  <p> Auto-Save<p>
  <section>
      <ul id="pixel-board"></ul>
  </section>       
  </div>
`;

// 2
const btnBoardText = document.getElementById('board-size');
const btnBoard = document.getElementById('generate-board');
btnBoardText.value = JSON.parse(localStorage.getItem('boardSize')) || 40;
let rowPixels;
let pixelNumber;
const colum = document.getElementById('pixel-board');
// 12/10 14/20 17/30 14/40 11.2/50
const creatPixelBoard = (value) => {
  rowPixels = value;
  const row = rowPixels * rowPixels;
  let rowId = 0;
  const widthPix = 11.6;
  const columWidth = `${rowPixels * widthPix}px`;
  colum.style.width = columWidth;
  for (let indexA = 0; indexA < row; indexA += 1) {
    rowId += 1;
    const pixel = document.createElement('li');
    pixel.className = 'pixel';
    pixel.id = rowId;
    colum.appendChild(pixel);
  }
};

// BÔNUS

const deletPixelBoard = () => {
  const list = document.getElementsByClassName('pixel').length;
  for (let index = 0; index < list; index += 1) {
    const deletList = document.querySelector('.pixel');
    deletList.remove();
    console.log('li deleted');
  }
};

const changePixelBoardSize = () => {
  deletPixelBoard();
  pixelNumber = parseInt(btnBoardText.value, 10);
  localStorage.setItem('boardSize', JSON.stringify(pixelNumber));
  if (btnBoardText.value === '') {
    alert('Board inválido!');
  } else if (pixelNumber < 5) {
    pixelNumber = 5;
    creatPixelBoard(pixelNumber);
  } else {
    creatPixelBoard(pixelNumber);
  }
};

btnBoard.addEventListener('click', changePixelBoardSize);

// 3

const markSelected = (event) => {
  const findClass = event.target.className;
  const elementColor = event.target;
  if (findClass.includes('color' || 'white')) {
    const colorClass = document.getElementsByClassName('color' || 'white');
    for (let index = 0; index < colorClass.length; index += 1) {
      colorClass[index].classList.remove('selected');
    }
    elementColor.classList.add('selected');
  }
};

document.addEventListener('click', markSelected);

// 4 & 7
const getStoreColors = JSON.parse(localStorage.getItem('pixelBoard'));
let arrayPixels;
if (getStoreColors !== null) {
  arrayPixels = getStoreColors;
} else {
  arrayPixels = [];
}

const paintPixel = (event) => {
  const findId = event.target.id;
  const findClass = event.target.className;
  const elementPixel = event.target;
  const colorPaint = document.querySelector('.selected');
  if (findClass.includes('pixel')) {
    const cssObj = getComputedStyle(colorPaint, null);
    const bgcolor = cssObj.getPropertyValue('background-color');
    elementPixel.style.backgroundColor = bgcolor;
    arrayPixels.push({ findId, bgcolor });
    localStorage.setItem('pixelBoard', JSON.stringify(arrayPixels));
  }
};

document.addEventListener('click', paintPixel);

// 5

const ulElement = document.querySelector('#color-palette');
const clearButton = document.createElement('button');
clearButton.id = 'clear-board';
clearButton.innerText = 'Clear';
ulElement.insertAdjacentElement('afterend', clearButton);

const clearPixel = () => {
  const getPixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < getPixels.length; index += 1) {
    getPixels[index].style.backgroundColor = 'white';
    localStorage.clear();
  }
};

const getButtonClear = document.querySelector('#clear-board');
getButtonClear.addEventListener('click', clearPixel);

// 6

const colorButton = document.createElement('button');
colorButton.id = 'button-random-color';
colorButton.innerText = 'Generate colors';
getButtonClear.insertAdjacentElement('afterend', colorButton);

let colors;
const randomColors = () => {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  colors = `rgb(${parseInt(r, 10)}, ${parseInt(g, 10)}, ${parseInt(b, 10)})`;
  return colors;
};

const changeRandomColors = () => {
  const getPaintColor = document.getElementsByClassName('color');
  for (let index = 0; index < getPaintColor.length; index += 1) {
    randomColors();
    getPaintColor[index].style.backgroundColor = colors;
  }
};

const getButtonRandomColor = document.getElementById('button-random-color');
getButtonRandomColor.addEventListener('click', changeRandomColors);

// 7
const setPixelsPaint = () => {
  if (getStoreColors !== null) {
    for (let index = 0; index < getStoreColors.length; index += 1) {
      const { findId } = getStoreColors[index];
      const bgColor = getStoreColors[index].bgcolor;
      const getPixelsId = document.getElementById(findId);
      getPixelsId.style.backgroundColor = bgColor;
    }
  }
};

const changePixelBoardSizeLoad = () => {
  if (JSON.parse(localStorage.getItem('boardSize'))) {
    deletPixelBoard();
    pixelNumber = JSON.parse(localStorage.getItem('boardSize'));
    creatPixelBoard(pixelNumber);
    setPixelsPaint();
  } else {
    deletPixelBoard();
    pixelNumber = 40;
    creatPixelBoard(pixelNumber);
    setPixelsPaint();
  }
};

const body = document.querySelector('body');
body.onload = changePixelBoardSizeLoad();
