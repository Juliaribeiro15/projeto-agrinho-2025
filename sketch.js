let gridSize = 16;
let words = [
  { word: "semente", x: 6, y: 0, dir: "vertical" },
  { word: "arado", x: 15, y: 9, dir: "vertical" },
  { word: "agricultura", x: 5, y: 9, dir: "horizontal" },
  { word: "colheita", x: 8, y: 4, dir: "vertical" },
  { word: "fertilizante", x: 0, y: 11, dir: "horizontal" },
  { word: "plantio", x: 2, y: 5, dir: "horizontal" }
];
let revealed = [];

function setup() {
  createCanvas(500, 500);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  // Inicializa o estado de revelação de todas as palavras
  for (let i = 0; i < words.length; i++) {
    revealed.push(false);
  }
}

function draw() {
  background(255);

  let cellSize = width / gridSize;
  
  // Desenha o grid
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      fill(200);
      rect(col * cellSize, row * cellSize, cellSize, cellSize);

      let cellText = getLetterAt(row, col);
      if (cellText !== "") {
        fill(0);
        text(cellText, col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
      }
    }
  }
}

function mousePressed() {
  let cellSize = width / gridSize;
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  
  // Verifica se o clique está em uma célula que contém uma palavra
  for (let i = 0; i < words.length; i++) {
    if (checkWordClick(words[i], x, y)) {
      revealed[i] = true;  // Marca a palavra como revelada
    }
  }
}

function checkWordClick(wordObj, x, y) {
  let wordLength = wordObj.word.length;
  if (wordObj.dir === "horizontal") {
    return y === wordObj.y && x >= wordObj.x && x < wordObj.x + wordLength;
  } else if (wordObj.dir === "vertical") {
    return x === wordObj.x && y >= wordObj.y && y < wordObj.y + wordLength;
  }
  return false;
}

function getLetterAt(row, col) {
  for (let i = 0; i < words.length; i++) {
    let wordObj = words[i];
    let wordLength = wordObj.word.length;

    if (wordObj.dir === "horizontal" && row === wordObj.y && col >= wordObj.x && col < wordObj.x + wordLength) {
      if (revealed[i]) {
        return wordObj.word[col - wordObj.x];
      }
    } else if (wordObj.dir === "vertical" && col === wordObj.x && row >= wordObj.y && row < wordObj.y + wordLength) {
      if (revealed[i]) {
        return wordObj.word[row - wordObj.y];
      }
    }
  }
  return "";
}
