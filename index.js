const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const startBtn = document.querySelector("#restart");

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  startBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (option[cellIndex] !== "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  option[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const cellA = option[condition[0]];
    const cellB = option[condition[1]];
    const cellC = option[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins!`;
    running = false;
  } else if (!option.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  option = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
