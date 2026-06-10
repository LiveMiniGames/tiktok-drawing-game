const drawingPrompts = [
  "tiger","dog","cat","lion","bear","shark","fish","bird","snake","horse","cow","pig","monkey","elephant","giraffe","zebra","rabbit","mouse","spider","bee",
  "pizza","burger","fries","hot dog","ice cream","cake","donut","apple","banana","watermelon","taco","sandwich","cookie","egg","cheese",
  "chair","table","bed","couch","lamp","door","window","toilet","sink","bathtub","mirror","clock","tv","computer","phone","headphones","camera","backpack",
  "car","truck","bus","train","airplane","boat","bicycle","motorcycle","rocket","helicopter","skateboard",
  "house","school","hospital","castle","beach","mountain","tree","flower","sun","moon","star","cloud","rainbow","snowman","fire","volcano",
  "basketball","football","baseball","soccer ball","tennis racket","guitar","piano","microphone","crown","sword","shield","robot","alien","ghost","zombie","dragon","pirate","ninja","clown"
];

const charadesPrompts = [
  "sitting","running","jumping","crying","laughing","sleeping","waking up","dancing","singing","sneezing","coughing","brushing teeth","washing hands","eating","drinking",
  "driving","flying a plane","swimming","fishing","boxing","playing basketball","playing football","playing guitar","typing","texting","taking a selfie","cooking","cleaning",
  "lifting weights","falling down","being scared","being cold","being hot","opening a door","walking a dog","riding a horse","skateboarding","bowling","throwing a ball",
  "reading a book","watching tv","putting on shoes","combing hair","taking a shower","zipping a jacket","painting","drawing","digging","climbing","hiding","searching"
];

let usedDrawingPrompts = JSON.parse(localStorage.getItem("usedDrawingPrompts") || "[]");
let usedCharadesPrompts = JSON.parse(localStorage.getItem("usedCharadesPrompts") || "[]");

let game = {
  active: false,
  mode: "drawing",
  round: 0,
  totalRounds: 5,
  roundSeconds: 60,
  secondsLeft: 60,
  answer: "",
  solved: false,
  waitingForNext: false,
  sessionScores: {},
  timer: null
};

let ws = null;
let drawing = false;
let lastX = 0;
let lastY = 0;
let eraser = false;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const connectBtn = document.getElementById("connectBtn");
const connectionStatus = document.getElementById("connectionStatus");

const modeInput = document.getElementById("mode");
const roundCountInput = document.getElementById("roundCount");
const timerSecondsInput = document.getElementById("timerSeconds");
const customWordInput = document.getElementById("customWord");

const randomWordBtn = document.getElementById("randomWordBtn");
const startGameBtn = document.getElementById("startGameBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const endGameBtn = document.getElementById("endGameBtn");

const secretWord = document.getElementById("secretWord");
const brushColor = document.getElementById("brushColor");
const brushSize = document.getElementById("brushSize");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

const roundText = document.getElementById("roundText");
const timerText = document.getElementById("timerText");

const winnerPopup = document.getElementById("winnerPopup");
const winnerAnswer = document.getElementById("winnerAnswer");
const winnerName = document.getElementById("winnerName");

const timesUpPopup = document.getElementById("timesUpPopup");
const timesUpAnswer = document.getElementById("timesUpAnswer");

const finalLeaderboard = document.getElementById("finalLeaderboard");
const hostLeaderboard = document.getElementById("hostLeaderboard");
const charadesBox = document.getElementById("charadesBox");

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function censorUsername(username) {
  let clean = String(username || "unknown");

  const banned = ["nigger","nigga","faggot","retard","kike","chink","spic"];

  banned.forEach(word => {
    const reg = new RegExp(word, "gi");
    clean = clean.replace(reg, "****");
  });

  return clean;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function getPromptForMode(mode) {
  const list = mode === "charades" ? charadesPrompts : drawingPrompts;
  let used = mode === "charades" ? usedCharadesPrompts : usedDrawingPrompts;

  const available = list.filter(word => !used.includes(word));

  if (available.length === 0) {
    used = [];
    if (mode === "charades") {
      usedCharadesPrompts = [];
      localStorage.setItem("usedCharadesPrompts", JSON.stringify([]));
    } else {
      usedDrawingPrompts = [];
      localStorage.setItem("usedDrawingPrompts", JSON.stringify([]));
    }
  }

  const freshList = list.filter(word => !(mode === "charades" ? usedCharadesPrompts : usedDrawingPrompts).includes(word));
  const word = freshList[Math.floor(Math.random() * freshList.length)];

  if (mode === "charades") {
    usedCharadesPrompts.push(word);
    localStorage.setItem("usedCharadesPrompts", JSON.stringify(usedCharadesPrompts));
  } else {
    usedDrawingPrompts.push(word);
    localStorage.setItem("usedDrawingPrompts", JSON.stringify(usedDrawingPrompts));
  }

  return word;
}

function updateUI() {
  roundText.textContent = `ROUND ${game.round}/${game.totalRounds}`;
  timerText.textContent = formatTime(game.secondsLeft);
  secretWord.textContent = game.answer || "---";

  if (game.mode === "charades") {
    charadesBox.classList.remove("hidden");
    canvas.classList.add("hidden");
  } else {
    charadesBox.classList.add("hidden");
    canvas.classList.remove("hidden");
  }

  renderHostLeaderboard();
}

function clearDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startGame() {
  game.mode = modeInput.value;
  game.totalRounds = Number(roundCountInput.value);
  game.roundSeconds = Number(timerSecondsInput.value);
  game.round = 0;
  game.active = true;
  game.solved = false;
  game.waitingForNext = false;
  game.sessionScores = {};

  finalLeaderboard.classList.add("hidden");
  winnerPopup.classList.add("hidden");
  timesUpPopup.classList.add("hidden");

  nextRound();
}

function nextRound() {
  if (!game.active) return;

  if (game.round >= game.totalRounds) {
    endGame(true);
    return;
  }

  game.round++;
  game.solved = false;
  game.waitingForNext = false;
  game.secondsLeft = game.roundSeconds;

  const custom = customWordInput.value.trim();
  game.answer = custom || getPromptForMode(game.mode);

  customWordInput.value = "";

  clearDrawing();
  winnerPopup.classList.add("hidden");
  timesUpPopup.classList.add("hidden");
  finalLeaderboard.classList.add("hidden");

  startTimer();
  updateUI();
}

function startTimer() {
  clearInterval(game.timer);

  game.timer = setInterval(() => {
    if (!game.active || game.solved || game.waitingForNext) return;

    game.secondsLeft--;

    if (game.secondsLeft <= 0) {
      game.secondsLeft = 0;
      game.solved = true;
      game.waitingForNext = true;
      clearInterval(game.timer);
      showNoWinner();
    }

    updateUI();
  }, 1000);
}

function calculatePoints() {
  const basePoints = 100;
  const timeBonus = Math.ceil((game.secondsLeft / game.roundSeconds) * 100);
  return basePoints + timeBonus;
}

function handleGuess(username, message) {
  if (!game.active || game.solved || game.waitingForNext || !game.answer) return;

  const cleanUsername = censorUsername(username);
  const guess = normalize(message);
  const answer = normalize(game.answer);

  if (guess === answer) {
    game.solved = true;
    game.waitingForNext = true;
    clearInterval(game.timer);

    const points = calculatePoints();
    game.sessionScores[cleanUsername] = (game.sessionScores[cleanUsername] || 0) + points;

    showWinner(cleanUsername, points);
    updateUI();
  }
}

function showWinner(username, points) {
  winnerAnswer.textContent = game.answer;
  winnerName.textContent = `@${username}`;
  document.querySelector(".got-first").textContent = `GOT IT FIRST! +${points} POINTS`;
  winnerPopup.classList.remove("hidden");
}

function showNoWinner() {
  timesUpAnswer.textContent = game.answer;
  timesUpPopup.classList.remove("hidden");
}

function endGame(showFinal) {
  game.active = false;
  game.waitingForNext = false;
  clearInterval(game.timer);

  if (showFinal) {
    showFinalLeaderboard();
  }

  updateUI();
}

function getSessionLeaderboard() {
  return Object.entries(game.sessionScores)
    .sort((a, b) => b[1] - a[1])
    .map(([username, points]) => ({ username, points }));
}

function showFinalLeaderboard() {
  const rows = getSessionLeaderboard();

  finalLeaderboard.innerHTML = `<h1>FINAL LEADERBOARD</h1>`;

  if (rows.length === 0) {
    finalLeaderboard.innerHTML += `<div class="leader-row">No winners this game</div>`;
  } else {
    rows.forEach((row, index) => {
      finalLeaderboard.innerHTML += `
        <div class="leader-row">
          <span>${index + 1}. @${row.username}</span>
          <span>${row.points}</span>
        </div>
      `;
    });
  }

  finalLeaderboard.classList.remove("hidden");
}

function renderHostLeaderboard() {
  const rows = getSessionLeaderboard();
  hostLeaderboard.innerHTML = "";

  rows.forEach((row, index) => {
    const div = document.createElement("div");
    div.className = "host-leader-row";
    div.innerHTML = `<span>${index + 1}. @${row.username}</span><b>${row.points}</b>`;
    hostLeaderboard.appendChild(div);
  });
}

function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  return {
    x: ((clientX - rect.left) / rect.width) * canvas.width,
    y: ((clientY - rect.top) / rect.height) * canvas.height
  };
}

function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = eraser ? "#050505" : brushColor.value;
  ctx.lineWidth = Number(brushSize.value);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function startDrawing(e) {
  drawing = true;
  const pos = getCanvasPos(e);
  lastX = pos.x;
  lastY = pos.y;
}

function moveDrawing(e) {
  if (!drawing) return;
  e.preventDefault();

  const pos = getCanvasPos(e);
  drawLine(lastX, lastY, pos.x, pos.y);

  lastX = pos.x;
  lastY = pos.y;
}

function stopDrawing() {
  drawing = false;
}

function connectTikFinity() {
  connectionStatus.textContent = "Connecting...";

  try {
    ws = new WebSocket("ws://127.0.0.1:21213/");

    ws.onopen = () => {
      connectionStatus.textContent = "Connected to TikFinity";
    };

    ws.onclose = () => {
      connectionStatus.textContent = "Disconnected";
    };

    ws.onerror = () => {
      connectionStatus.textContent = "Connection error. Is TikFinity open?";
    };

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        const chat = extractChat(data);

        if (chat) {
          handleGuess(chat.username, chat.message);
        }
      } catch (err) {
        console.log("TikFinity parse error:", err);
      }
    };
  } catch (err) {
    connectionStatus.textContent = "Failed to connect";
  }
}

function extractChat(data) {
  const possibleMessage =
    data.comment ||
    data.message ||
    data.text ||
    data.msg ||
    data.data?.comment ||
    data.data?.message ||
    data.data?.text ||
    data.event?.comment ||
    data.event?.message;

  const possibleUsername =
    data.uniqueId ||
    data.username ||
    data.user ||
    data.nickname ||
    data.data?.uniqueId ||
    data.data?.username ||
    data.data?.nickname ||
    data.event?.uniqueId ||
    data.event?.username;

  const type = String(
    data.type ||
    data.eventType ||
    data.event ||
    data.name ||
    data.data?.type ||
    data.data?.eventType ||
    ""
  ).toLowerCase();

  const looksLikeChat =
    type.includes("chat") ||
    type.includes("comment") ||
    possibleMessage;

  if (looksLikeChat && possibleMessage && possibleUsername) {
    return {
      username: possibleUsername,
      message: possibleMessage
    };
  }

  return null;
}

connectBtn.onclick = connectTikFinity;

randomWordBtn.onclick = () => {
  customWordInput.value = getPromptForMode(modeInput.value);
};

startGameBtn.onclick = startGame;
nextRoundBtn.onclick = nextRound;
endGameBtn.onclick = () => endGame(true);

clearBtn.onclick = clearDrawing;

eraserBtn.onclick = () => {
  eraser = !eraser;
  eraserBtn.textContent = eraser ? "Eraser On" : "Eraser Off";
};

document.querySelectorAll(".color-dot").forEach(button => {
  button.onclick = () => {
    brushColor.value = button.dataset.color;
    eraser = false;
    eraserBtn.textContent = "Eraser Off";
  };
});

document.getElementById("testGuessBtn").onclick = () => {
  const username = document.getElementById("testUsername").value || "testuser";
  const guess = document.getElementById("testGuess").value;
  handleGuess(username, guess);
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", moveDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", moveDrawing);
canvas.addEventListener("touchend", stopDrawing);

updateUI();
