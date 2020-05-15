const squers = document.querySelectorAll(".squer");
const end = document.getElementById("end");
let origBoard;
const huPlayer = "O";
const aiPlayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

startGame();

function startGame() {
  origBoard = Array.from(Array(9).keys());
  end.style.display = "none";
  console.log(origBoard);
  squers.forEach((squer) => {
    squer.innerText = "";
    squer.addEventListener("click", handleClick);
    squer.style.removeProperty("background-color");
  });
}

function handleClick(squer) {
  if (typeof origBoard[squer.target.id] == "number") {
    playTurn(squer.target.id, huPlayer);
    if (!tie()) playTurn(bestSpot(), aiPlayer);
  }
}

function tie() {
  if (emptySquares().length == 0) {
    squers.forEach((squer) => {
      squer.style.setProperty("background-color", "blue");
      squer.removeEventListener("click", handleClick);
    });
    end.style.display = "flex";

    end.innerHTML = ` <h2>Try Again It's a Tie<h2>
      <button class="play-again" onClick="startGame()">Play Again</button>`;
    return true;
  }
  return false;
}

function playTurn(id, player) {
  origBoard[id] = player;
  document.getElementById(id).innerText = player;
  let gameWin = checkWin(origBoard, player);
  if (gameWin) gameOver(gameWin);
}

function checkWin(board, player) {
  const plays = board.reduce((a, b, i) => (b == player ? a.concat(i) : a), []);
  let gameWin = null;
  winCombos.forEach((win, index) => {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWin = { player, index };
      return;
    }
  });
  return gameWin;
}

function gameOver(gameWin) {
  winCombos[gameWin.index].forEach((id) => {
    document.getElementById(id).style.backgroundColor =
      gameWin.player == huPlayer ? "green" : "red";
  });
  squers.forEach((squer) => squer.removeEventListener("click", handleClick));
  msg = gameWin.player == "O" ? "Congrats You Win" : "Unfortunately You Lost";
  end.style.display = "flex";

  end.innerHTML = ` <h2>${msg}<h2>
    <button class="play-again" onClick="startGame()">Play Again</button>`;
}

function emptySquares() {
  return origBoard.filter((board) => typeof board == "number");
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function minimax(newBoard, player) {
  let availSpots = emptySquares(newBoard);
  if (checkWin(newBoard, player)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    if (player == aiPlayer) {
      let result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }
  let bestMove;
  if (player == aiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
