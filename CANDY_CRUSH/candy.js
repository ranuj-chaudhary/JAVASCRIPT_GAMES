const rows = 9;
const columns = 9;

const candies = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];
const boardItem = [];
let currentTile;
let otherTile;
let score = 0;

window.onload = () => {
  startGame();
  setInterval(() => {
    crushCandies();
    fillCandies();
    generateCadies();
  }, 200);
  document.querySelector(".score").innerHTML = score;
};

function randomCandies(candies) {
  const random = Math.floor(Math.random() * candies.length);
  return candies[random];
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      const img = document.createElement("img");
      img.src = "./images/" + randomCandies(candies) + ".png";
      img.id = r.toString() + "-" + c.toString();
      img.setAttribute("draggable", "true");
      img.addEventListener("dragstart", dragstart);
      img.addEventListener("dragover", dragover);
      img.addEventListener("dragenter", dragenter);
      img.addEventListener("dragleave", dragleave);
      img.addEventListener("drop", dragdrop);
      img.addEventListener("dragend", dragend);

      document.querySelector("#game-board").append(img);
      row.push(img);
    }
    boardItem.push(row);
  }
}

function dragstart() {
  currentTile = this;
}
function dragover(e) {
  e.preventDefault();
}
function dragenter() {}
function dragleave() {}
function dragdrop() {
  otherTile = this;
}

function dragend() {
  // STOP FROM SWAPPING WITH BLANK SPACE
  if (currentTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }
  let [r, c] = currentTile.id.split("-").map((ele) => parseInt(ele));
  let [r2, c2] = otherTile.id.split("-").map((ele) => parseInt(ele));

  let moveLeft = c2 == c - 1 && r == r2;
  let moveRight = c2 == c + 1 && r == r2;
  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let adjacetMove = moveLeft || moveRight || moveUp || moveDown;
  if (adjacetMove) {
    let currTileSrc = currentTile.src;
    let otherTileSrc = otherTile.src;
    currentTile.src = otherTileSrc;
    otherTile.src = currTileSrc;
  }
}

function crushCandies() {
  // compare row wise

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = boardItem[r][c];
      let candy2 = boardItem[r][c + 1];
      let candy3 = boardItem[r][c + 2];
      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
      }
    }
  }

  // compare column wise
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = boardItem[r][c];
      let candy2 = boardItem[r + 1][c];
      let candy3 = boardItem[r + 2][c];

      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        score += 30;
      }
    }
  }

  // update the score on the screen
  document.querySelector(".score").innerText = score;
}

function fillCandies() {
  for (let c = 0; c < columns; c++) {
    let index = rows - 1;
    for (let r = rows - 1; r >= 0; r--) {
      if (!boardItem[r][c].src.includes("blank")) {
        boardItem[index][c].src = boardItem[r][c].src;
        index -= 1;
      }
    }
    for (let r = index; r >= 0; r--) {
      boardItem[r][c].src = "./images/blank.png";
    }
  }
}

function generateCadies() {
  for (let c = 0; c < columns; c++) {
    if (boardItem[0][c].src.includes("blank")) {
      boardItem[0][c].src = "./images/" + randomCandies(candies) + ".png";
    }
  }
}
