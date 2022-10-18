// A very basic snake game code.
let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 1;
let intervalTime = 0;
let interval = 0;

window.onload = function () {
  createBoard();
  startGame();
  playAgain.addEventListener("click", replay);
};

// Creating CreateBoard function
function createBoard() {
  popup.style.display = "none";
  for (let i = 0; i < 400; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

// Start of the game
function startGame() {
  let squares = document.querySelectorAll(".grid div");
  randomApple(squares);
  direction = 1;
  scoreDisplay.innerHTML = score;
  intervalTime = 500;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  interval = setInterval(moveOutcome, intervalTime);
}

async function moveOutcome() {
  let squares = document.querySelectorAll(".grid div");
  if (checkForHits(squares)) {
    await new Audio("./sounds/game_over.mp3").play()
    alert("Oops!! You hit something");
    popup.style.display = "flex";
    score = 0;
    return clearInterval(interval);
  } else {
    moveSnake(squares);
  }
}

function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  //movement ends here
  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true;
  } else {
    return false;
  }
}

// eating the food provided
function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    new Audio("./sounds/ting.mp3").play()
    randomApple(squares);
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
}

function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

function control(e) {
  if (e.code === "ArrowRight") {
    direction = 1; //right
  } else if (e.code === "ArrowUp") {
    direction = -width; //if we press the uparrow, the snake will go 20 divs up
  } else if (e.code === "ArrowLeft") {
    direction = -1; //left, the snake will go left on div
  } else if (e.code === "ArrowDown") {
    direction = width; //down the snake head will instantly appear 10 divs below from the current div
  }
}

up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));

function replay() {
  grid.innerHTML = "";
  createBoard();
  startGame();
  popup.style.display = "none";
}

document.onkeyup = (e) => control(e);

// buttons
