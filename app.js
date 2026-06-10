const drawingNouns = [
  "apple","banana","orange","pizza","burger","fries","taco","donut","cake","cookie","ice cream","watermelon","pineapple","coffee cup","soda can","water bottle","sandwich","hot dog","popcorn","cupcake",
  "dog","cat","tiger","lion","bear","panda","monkey","elephant","giraffe","zebra","horse","cow","pig","sheep","rabbit","mouse","kangaroo","fox","wolf","deer",
  "shark","whale","dolphin","fish","octopus","crab","lobster","jellyfish","turtle","frog","snake","lizard","bird","eagle","owl","penguin","duck","chicken","flamingo","parrot",
  "bee","butterfly","spider","ant","ladybug","dragonfly","snail","scorpion","house","castle","school","hospital","barn","store","hotel","skyscraper","tent","cabin","bridge","tower",
  "beach","island","mountain","volcano","waterfall","river","lake","ocean","forest","cave","desert","road","fence","garden","playground","swimming pool","treehouse","campfire","mailbox","traffic light",
  "sun","moon","star","cloud","rainbow","lightning bolt","snowman","fire","planet","rocket","spaceship","alien","robot","ghost","zombie","dragon","unicorn","monster","pirate ship","treasure chest",
  "chair","table","bed","couch","lamp","door","window","toilet","sink","bathtub","mirror","clock","television","computer","laptop","keyboard","phone","headphones","camera","speaker",
  "fridge","microwave","oven","toaster","fork","spoon","knife","plate","bowl","mug","backpack","book","pencil","marker","scissors","ruler","calculator","trash can","broom","bucket",
  "shirt","pants","jacket","hoodie","hat","shoe","boot","glove","watch","sunglasses","umbrella","wallet","suitcase","shopping cart","gift box","balloon","kite","teddy bear","mask","ski mask",
  "car","truck","bus","train","airplane","helicopter","boat","submarine","bicycle","motorcycle","scooter","skateboard","taxi","police car","fire truck","ambulance","tractor","bulldozer","dump truck","tow truck",
  "basketball","football","soccer ball","baseball","tennis ball","volleyball","bowling ball","hockey stick","tennis racket","baseball bat","trophy","medal","helmet","boxing glove","dumbbell","surfboard","snowboard","skis","fishing rod","dartboard",
  "guitar","piano","drum","violin","trumpet","microphone","boombox","music note","dice","game controller","arcade machine","vending machine","money bag","dollar bill","coin","hammer","wrench","screwdriver","saw","drill"
];

const drawableAdjectives = ["", "big", "tiny", "giant", "cartoon", "broken", "happy", "angry", "sleepy", "spooky", "golden", "blue", "red", "green", "fancy", "old", "new", "floating", "melting", "exploding"];

const charadesActions = [
  "running","jumping","walking","tiptoeing","marching","crawling","climbing","falling down","tripping","slipping","spinning","stretching","yawning","sleeping","waking up","sneezing","coughing","laughing","crying","shouting",
  "whispering","talking on phone","texting","taking a selfie","posing for a photo","checking watch","looking confused","looking scared","looking angry","looking excited","being shocked","being dizzy","being cold","being hot","being tired","hiding",
  "searching","waving","clapping","pointing","saluting","begging","celebrating","cheering","booing","flexing","dancing","breakdancing","singing","rapping","playing air guitar","playing piano","playing drums","brushing teeth","washing hands","taking a shower",
  "combing hair","putting on makeup","shaving face","getting a haircut","putting on shoes","tying shoes","zipping jacket","folding clothes","doing laundry","making bed","vacuuming","sweeping","mopping","washing dishes","cooking","flipping pancakes",
  "stirring soup","chopping vegetables","eating spaghetti","eating a burger","eating ice cream","drinking water","blowing on food","ordering food","paying cashier","carrying groceries","shopping","pushing shopping cart","opening present","blowing out candles","cutting cake","wrapping gift",
  "driving car","turning steering wheel","honking horn","parking car","riding bike","riding horse","rowing boat","swimming","diving","surfing","ice skating","skateboarding","jumping rope","lifting weights","doing pushups","doing situps",
  "doing jumping jacks","doing yoga","meditating","boxing","punching bag","kicking ball","shooting basketball","dribbling basketball","throwing football","catching football","swinging baseball bat","bowling","golfing","playing tennis","throwing frisbee","fishing",
  "walking dog","feeding pet","petting dog","being a dog","being a cat","being a monkey","being a chicken","being a shark","being a robot","being a zombie","being a ghost","being an alien","being a pirate","being a ninja","being a cowboy","being a baby"
];

const actionStyles = ["", "slowly", "quickly", "dramatically", "silently", "badly", "carefully", "angrily", "excitedly", "like a pro"];

function expandDrawingPrompts() {
  const result = new Set(drawingNouns);
  for (const adjective of drawableAdjectives) {
    for (const noun of drawingNouns) {
      if (adjective) result.add(`${adjective} ${noun}`);
      if (result.size >= 520) return [...result];
    }
  }
  return [...result];
}

function expandCharadesPrompts() {
  const result = new Set(charadesActions);
  for (const style of actionStyles) {
    for (const action of charadesActions) {
      if (style) result.add(`${style} ${action}`);
      if (result.size >= 520) return [...result];
    }
  }
  return [...result];
}

const drawingPrompts = expandDrawingPrompts();
const charadesPrompts = expandCharadesPrompts();

let drawingBag = JSON.parse(localStorage.getItem("drawingBagV4") || "[]");
let charadesBag = JSON.parse(localStorage.getItem("charadesBagV4") || "[]");

let game = {
  active:false,
  mode:"drawing",
  round:0,
  totalRounds:5,
  roundSeconds:60,
  secondsLeft:60,
  answer:"",
  solved:false,
  waitingForNext:false,
  sessionScores:{},
  timer:null
};

let ws = null;
let drawing = false;
let lastX = 0;
let lastY = 0;
let eraser = false;
let currentBrushColor = "#ffffff";
let currentBgColor = "#ffffff";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const drawWrap = document.getElementById("drawWrap");
const connectionStatus = document.getElementById("connectionStatus");
const modeInput = document.getElementById("mode");
const roundCountInput = document.getElementById("roundCount");
const timerSecondsInput = document.getElementById("timerSeconds");
const customWordInput = document.getElementById("customWord");
const secretWord = document.getElementById("secretWord");
const brushColor = document.getElementById("brushColor");
const bgColor = document.getElementById("bgColor");
const brushSize = document.getElementById("brushSize");
const eraserBtn = document.getElementById("eraserBtn");
const roundText = document.getElementById("roundText");
const timerText = document.getElementById("timerText");
const winnerPopup = document.getElementById("winnerPopup");
const winnerAnswer = document.getElementById("winnerAnswer");
const winnerName = document.getElementById("winnerName");
const winnerPoints = document.getElementById("winnerPoints");
const timesUpPopup = document.getElementById("timesUpPopup");
const timesUpAnswer = document.getElementById("timesUpAnswer");
const finalLeaderboard = document.getElementById("finalLeaderboard");
const hostLeaderboard = document.getElementById("hostLeaderboard");
const charadesBox = document.getElementById("charadesBox");

function show(el, display = "flex") {
  el.classList.remove("hidden");
  el.style.display = display;
}

function hide(el) {
  el.classList.add("hidden");
  el.style.display = "none";
}

function normalize(text) {
  return String(text || "").toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}

function censorUsername(username) {
  let clean = String(username || "unknown");
  ["nigger","nigga","faggot","retard","kike","chink","spic"].forEach(word => {
    clean = clean.replace(new RegExp(word, "gi"), "****");
  });
  return clean;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function randomNumber() {
  if (window.crypto && window.crypto.getRandomValues) {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    return values[0] / (0xffffffff + 1);
  }
  return Math.random();
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randomNumber() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getPromptForMode(mode) {
  const isCharades = mode === "charades";
  const sourceList = isCharades ? charadesPrompts : drawingPrompts;
  let bag = isCharades ? charadesBag : drawingBag;

  if (!Array.isArray(bag) || bag.length === 0) {
    bag = shuffleArray(sourceList);
  }

  const word = bag.pop();

  if (isCharades) {
    charadesBag = bag;
    localStorage.setItem("charadesBagV4", JSON.stringify(charadesBag));
  } else {
    drawingBag = bag;
    localStorage.setItem("drawingBagV4", JSON.stringify(drawingBag));
  }

  return word;
}

function setBrush(color, button) {
  currentBrushColor = color;
  brushColor.value = color;
  eraser = false;
  eraserBtn.textContent = "Eraser Off";

  const grid = button.parentElement;
  grid.querySelectorAll(".preset").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

function setBg(color, button) {
  currentBgColor = color;
  bgColor.value = color;
  canvas.style.backgroundColor = color;
  drawWrap.style.backgroundColor = color;

  const grid = button.parentElement;
  grid.querySelectorAll(".preset").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

function applyCustomBg() {
  currentBgColor = bgColor.value;
  canvas.style.backgroundColor = currentBgColor;
  drawWrap.style.backgroundColor = currentBgColor;
}

function clearDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateTimerStyle() {
  timerText.className = "";
  drawWrap.classList.remove("mid-warning", "danger-warning");

  if (!game.active || game.waitingForNext || game.solved) {
    timerText.classList.add("timer-ok");
    return;
  }

  if (game.secondsLeft <= game.roundSeconds * 0.25) {
    timerText.classList.add("timer-danger");
    drawWrap.classList.add("danger-warning");
  } else if (game.secondsLeft <= game.roundSeconds * 0.5) {
    timerText.classList.add("timer-mid");
    drawWrap.classList.add("mid-warning");
  } else {
    timerText.classList.add("timer-ok");
  }
}

function updateUI() {
  roundText.textContent = `ROUND ${game.round}/${game.totalRounds}`;
  timerText.textContent = formatTime(game.secondsLeft);
  secretWord.textContent = game.answer || "---";

  if (game.mode === "charades") {
    show(charadesBox);
    canvas.classList.add("hidden");
  } else {
    hide(charadesBox);
    canvas.classList.remove("hidden");
  }

  updateTimerStyle();
  renderHostLeaderboard();
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

  hide(finalLeaderboard);
  hide(winnerPopup);
  hide(timesUpPopup);

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
  hide(winnerPopup);
  hide(timesUpPopup);
  hide(finalLeaderboard);

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
  return 100 + Math.ceil((game.secondsLeft / game.roundSeconds) * 100);
}

function handleGuess(username, message) {
  if (!game.active || game.solved || game.waitingForNext || !game.answer) return;

  if (normalize(message) === normalize(game.answer)) {
    game.solved = true;
    game.waitingForNext = true;
    clearInterval(game.timer);

    const cleanUsername = censorUsername(username);
    const points = calculatePoints();
    game.sessionScores[cleanUsername] = (game.sessionScores[cleanUsername] || 0) + points;

    showWinner(cleanUsername, points);
    updateUI();
  }
}

function showWinner(username, points) {
  winnerAnswer.textContent = game.answer;
  winnerName.textContent = `@${username}`;
  winnerPoints.textContent = `GOT IT FIRST! +${points} POINTS`;

  hide(timesUpPopup);
  show(winnerPopup);
}

function showNoWinner() {
  timesUpAnswer.textContent = game.answer;

  hide(winnerPopup);
  show(timesUpPopup);
  updateUI();
}

function endGame(showFinal) {
  game.active = false;
  game.waitingForNext = false;
  clearInterval(game.timer);

  if (showFinal) showFinalLeaderboard();
  updateUI();
}

function showFinalLeaderboard() {
  const rows = Object.entries(game.sessionScores).sort((a, b) => b[1] - a[1]);
  finalLeaderboard.innerHTML = `<h1>FINAL LEADERBOARD</h1>`;

  if (rows.length === 0) {
    finalLeaderboard.innerHTML += `<div class="leader-row">No winners this game</div>`;
  } else {
    rows.forEach(([username, points], index) => {
      finalLeaderboard.innerHTML += `<div class="leader-row"><span>${index + 1}. @${username}</span><span>${points}</span></div>`;
    });
  }

  show(finalLeaderboard, "block");
}

function renderHostLeaderboard() {
  const rows = Object.entries(game.sessionScores).sort((a, b) => b[1] - a[1]);
  hostLeaderboard.innerHTML = "";

  rows.forEach(([username, points], index) => {
    const div = document.createElement("div");
    div.className = "host-leader-row";
    div.innerHTML = `<span>${index + 1}. @${username}</span><b>${points}</b>`;
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
  ctx.strokeStyle = eraser ? currentBgColor : currentBrushColor;
  ctx.lineWidth = Number(brushSize.value);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function startDrawing(e) {
  if (game.mode === "charades") return;
  drawing = true;
  const pos = getCanvasPos(e);
  lastX = pos.x;
  lastY = pos.y;
}

function moveDrawing(e) {
  if (!drawing || game.mode === "charades") return;
  e.preventDefault();
  const pos = getCanvasPos(e);
  drawLine(lastX, lastY, pos.x, pos.y);
  lastX = pos.x;
  lastY = pos.y;
}

function stopDrawing() {
  drawing = false;
}

function toggleEraser() {
  eraser = !eraser;
  eraserBtn.textContent = eraser ? "Eraser On" : "Eraser Off";
}

function pickRandomWord() {
  customWordInput.value = getPromptForMode(modeInput.value);
}

function sendTestGuess() {
  const username = document.getElementById("testUsername").value.trim() || "testuser";
  const guess = document.getElementById("testGuess").value.trim();
  handleGuess(username, guess);
}

function connectTikFinity() {
  connectionStatus.textContent = "Connecting...";

  try {
    ws = new WebSocket("ws://127.0.0.1:21213/");

    ws.onopen = () => connectionStatus.textContent = "Connected to TikFinity";
    ws.onclose = () => connectionStatus.textContent = "Disconnected";
    ws.onerror = () => connectionStatus.textContent = "Connection error. Is TikFinity open and connected?";

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        const chat = extractChat(data);
        if (chat) handleGuess(chat.username, chat.message);
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
    data.comment || data.message || data.text || data.msg ||
    data.data?.comment || data.data?.message || data.data?.text ||
    data.event?.comment || data.event?.message;

  const possibleUsername =
    data.uniqueId || data.username || data.user || data.nickname ||
    data.data?.uniqueId || data.data?.username || data.data?.nickname ||
    data.event?.uniqueId || data.event?.username;

  const type = String(
    data.type || data.eventType || data.event || data.name ||
    data.data?.type || data.data?.eventType || ""
  ).toLowerCase();

  if ((type.includes("chat") || type.includes("comment") || possibleMessage) && possibleMessage && possibleUsername) {
    return { username: possibleUsername, message: possibleMessage };
  }

  return null;
}

brushColor.oninput = () => {
  currentBrushColor = brushColor.value;
  eraser = false;
  eraserBtn.textContent = "Eraser Off";
};

bgColor.oninput = () => {
  applyCustomBg();
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", moveDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", moveDrawing);
canvas.addEventListener("touchend", stopDrawing);

hide(winnerPopup);
hide(timesUpPopup);
hide(finalLeaderboard);
hide(charadesBox);
applyCustomBg();
updateUI();
