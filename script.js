const pitch = document.getElementById("tic-toc");
const sq1 = document.getElementById("squer-1");
const sq2 = document.getElementById("squer-2");
const sq3 = document.getElementById("squer-3");
const sq4 = document.getElementById("squer-4");
const sq5 = document.getElementById("squer-5");
const sq6 = document.getElementById("squer-6");
const sq7 = document.getElementById("squer-7");
const sq8 = document.getElementById("squer-8");
const sq9 = document.getElementById("squer-9");
const end = document.getElementById("end");

let player = 2;

function playGame(clickedEl) {
  if (clickedEl.className === "squer") {
    if (!(player % 2)) {
      clickedEl.innerText = "X";
    } else {
      clickedEl.innerText = "O";
    }
  }
  checkIfWin();
}

function checkIfWin() {
  const term1 = sq1.innerText;
  const term2 = sq2.innerText;
  const term3 = sq3.innerText;
  const term4 = sq4.innerText;
  const term5 = sq5.innerText;
  const term6 = sq6.innerText;
  const term7 = sq7.innerText;
  const term8 = sq8.innerText;
  const term9 = sq9.innerText;
  if (
    (term1 === term2 && term1 === term3 && (term1 === "X" || term1 === "O")) ||
    (term1 === term4 && term1 === term7 && (term1 === "X" || term1 === "O")) ||
    (term4 === term5 && term4 === term6 && (term4 === "X" || term4 === "O")) ||
    (term7 === term8 && term7 === term9 && (term7 === "X" || term7 === "O")) ||
    (term2 === term5 && term2 === term8 && (term2 === "X" || term2 === "O")) ||
    (term3 === term6 && term3 === term9 && (term3 === "X" || term3 === "O")) ||
    (term1 === term5 && term1 === term9 && (term1 === "X" || term1 === "O")) ||
    (term7 === term5 && term7 === term3 && (term7 === "X" || term7 === "O"))
  ) {
    document.body.innerHTML = `<span>Congrats You Win ..</span>
    
     <button class='play-again' id="play-again"/>Play Again</button>`;
  } else if (
    term1 !== "" &&
    term2 !== "" &&
    term3 !== "" &&
    term4 !== "" &&
    term5 !== "" &&
    term6 !== "" &&
    term7 !== "" &&
    term8 !== "" &&
    term9 !== ""
  ) {
    document.body.innerHTML = `<span>Try Again</span>
    
     <button class='play-again' id="play-again"/>Play Again</button>`;
  }
}

pitch.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.innerText === "") {
    playGame(clickedEl);
    player = player + 1;
  }
});
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});
