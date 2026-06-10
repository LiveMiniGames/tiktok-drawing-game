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
  "guitar","piano","drum","violin","trumpet","microphone","boombox","music note","dice","game controller","arcade machine","vending machine","money bag","dollar bill","coin","hammer","wrench","screwdriver","saw","drill",
  "ladder","toolbox","flashlight","candle","light bulb","battery","lock","key","anchor","compass","map","globe","binoculars","telescope","magnifying glass","thermometer","first aid kit","bandage","toothbrush","soap",
  "towel","hairbrush","lipstick","alarm clock","calendar","newspaper","envelope","paper airplane","whiteboard","chalkboard","graduation cap","lunchbox","printer","pizza box","chopsticks","frying pan","chef hat","apron","candy bar","lollipop",
  "gumball machine","cookie jar","cooler","picnic basket","dog bowl","cat bed","bird cage","fish bowl","bedroom","bathroom","kitchen","garage","staircase","elevator","doormat","rug","pillow","blanket","bookshelf","fireplace",
  "carousel","ferris wheel","roller coaster","water slide","swing set","slide","sandbox","trampoline","basket","scoreboard","megaphone","flag","handcuffs","fire hydrant","traffic cone","parking meter","license plate","crosswalk","bus stop","train tracks",
  "stethoscope","wheelchair","crutches","tooth","heart","bone","skeleton","eye","ear","nose","hand","foot","skull","jack o lantern","coffin","gravestone","haunted house","witch hat","cauldron","christmas tree",
  "present","stocking","snow globe","easter egg","bunny ears","firework","party hat","birthday cake","pinata","crown jewel","diamond","gold bar","safe","bank","jail cell","judge gavel","briefcase","wifi symbol","charger","router"
];

const charadesActions = [
  "running","jumping","walking","tiptoeing","marching","crawling","climbing","falling down","tripping","slipping","spinning","stretching","yawning","sleeping","waking up","sneezing","coughing","laughing","crying","shouting",
  "whispering","talking on phone","texting","taking a selfie","posing for a photo","checking watch","looking confused","looking scared","looking angry","looking excited","being shocked","being dizzy","being cold","being hot","being tired","hiding",
  "searching","waving","clapping","pointing","saluting","begging","celebrating","cheering","booing","flexing","dancing","breakdancing","singing","rapping","playing air guitar","playing piano","playing drums","conducting music","brushing teeth","washing hands",
  "taking a shower","combing hair","putting on makeup","shaving face","getting a haircut","putting on shoes","tying shoes","zipping jacket","folding clothes","doing laundry","making bed","vacuuming","sweeping","mopping","washing dishes","cooking",
  "flipping pancakes","stirring soup","chopping vegetables","eating spaghetti","eating a burger","eating ice cream","drinking water","blowing on food","ordering food","paying cashier","carrying groceries","shopping","pushing shopping cart","scanning items","opening present","blowing out candles",
  "cutting cake","wrapping gift","throwing confetti","breaking pinata","driving car","turning steering wheel","honking horn","parking car","riding bike","riding horse","rowing boat","swimming","diving","surfing","ice skating","skateboarding",
  "jumping rope","lifting weights","doing pushups","doing situps","doing jumping jacks","doing yoga","meditating","boxing","punching bag","kicking ball","shooting basketball","dribbling basketball","throwing football","catching football","swinging baseball bat","bowling",
  "golfing","playing tennis","throwing frisbee","fishing","walking dog","feeding pet","petting dog","being a dog","being a cat","being a monkey","being a chicken","being a shark","being a robot","being a zombie","being a ghost","being an alien",
  "being a pirate","being a ninja","being a cowboy","being a baby","being an old person","being a teacher","being a doctor","being a chef","being a police officer","being a firefighter","being a magician","doing magic trick","pulling rope","pushing wall","opening door","closing door",
  "knocking on door","ringing doorbell","looking through window","locking door","unlocking door","digging","planting flowers","watering plants","raking leaves","shoveling snow","building sandcastle","setting up tent","starting campfire","roasting marshmallow","swatting bug","flying kite",
  "reading book","writing letter","typing on keyboard","using computer mouse","teaching class","raising hand","taking test","falling asleep in class","opening locker","carrying backpack","waiting in line","getting jump scared","stepping on lego","walking in rain","walking in wind","walking on ice",
  "checking mailbox","opening umbrella","looking for keys","dropping phone","charging phone","taking picture","recording video","vlogging","streaming","putting on headset","talking into microphone","playing video game","rage quitting","winning game","losing game","throwing controller",
  "facepalming","shrugging","rolling eyes","nodding yes","shaking head no","giving thumbs up","high fiving","handshake","bowing","doing karate","sword fighting","shooting bow","throwing dart","rolling dice","dealing cards","counting money",
  "swiping card","using atm","packing suitcase","checking passport","boarding plane","missing bus","running late","checking map","getting lost","asking directions","crossing street","painting wall","hammering nail","sawing wood","using drill","climbing ladder",
  "changing lightbulb","fixing sink","changing tire","pumping gas","washing car","taking out trash","opening jar","pouring drink","spilling drink","cleaning spill","peeling banana","cutting pizza","grilling food","flipping burger","serving food","waiting tables",
  "feeding baby","rocking baby","pushing stroller","using crutches","taking temperature","checking heartbeat","putting on bandage","scratching head","getting mosquito bite","fanning yourself","blowing nose","smelling something bad","tasting sour lemon","eating spicy food","brain freeze","hiccuping",
  "opening curtains","making coffee","pouring cereal","opening fridge","washing face","brushing hair","checking mirror","trying on clothes","walking runway","putting on perfume","ironing shirt","carrying heavy box","dropping box","pushing heavy object","pulling heavy object","cleaning window",
  "watching scary movie","watching sports","falling asleep on couch","eating popcorn","cheering touchdown","doing touchdown dance","missing shot","celebrating goal","riding roller coaster","playing carnival game","eating cotton candy","chewing gum","jumping on trampoline","sliding down slide","swinging on swing","jumping in pool"
];

const drawingPrompts = drawingNouns;
const charadesPrompts = charadesActions;

let drawingBag = JSON.parse(localStorage.getItem("drawingBagV5") || "[]");
let charadesBag = JSON.parse(localStorage.getItem("charadesBagV5") || "[]");

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
let currentBrushColor = "#ffffff";
let currentBgColor = "#0f172a";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const streamCard = document.getElementById("streamCard");
const drawWrap = document.getElementById("drawWrap");

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
const bgColor = document.getElementById("bgColor");
const applyBgBtn = document.getElementById("applyBgBtn");
const brushSize = document.getElementById("brushSize");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

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

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function censorUsername(username) {
  let clean = String(username || "unknown");
  const banned = ["nigger", "nigga", "faggot", "retard", "kike", "chink", "spic"];

  banned.forEach(word => {
    clean = clean.replace(new RegExp(word, "gi"), "****");
  });

  return clean;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function cryptoRandom() {
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
    const j = Math.floor(cryptoRandom() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function getPromptForMode(mode) {
  const isCharades = mode === "charades";
  const sourceList = isCharades ? charadesPrompts : drawingPrompts;
  const storageKey = isCharades ? "charadesBagV5" : "drawingBagV5";
  let bag = isCharades ? charadesBag : drawingBag;

  if (!Array.isArray(bag) || bag.length === 0) {
    bag = shuffleArray(sourceList);
  }

  const word = bag.pop();

  if (isCharades) {
    charadesBag = bag;
    localStorage.setItem(storageKey, JSON.stringify(charadesBag));
  } else {
    drawingBag = bag;
    localStorage.setItem(storageKey, JSON.stringify(drawingBag));
  }

  return word;
}

function setBackground(color) {
  currentBgColor = color;
  canvas.style.backgroundColor = color;
  drawWrap.style.backgroundColor = color;
}

function clearDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateTimerStyle() {
  timerText.classList.remove("timer-ok", "timer-mid", "timer-danger");
  drawWrap.classList.remove("mid-warning", "danger-warning");

  const dangerZone = game.active && !game.waitingForNext && !game.solved;

  if (!dangerZone) {
    timerText.classList.add("timer-ok");
    return;
  }

  const percentLeft = game.secondsLeft / game.roundSeconds;

  if (game.secondsLeft <= 10) {
    timerText.classList.add("timer-danger");
    drawWrap.classList.add("danger-warning");
  } else if (percentLeft <= 0.35) {
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
    charadesBox.classList.remove("hidden");
    canvas.classList.add("hidden");
  } else {
    charadesBox.classList.add("hidden");
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

    game.secondsLeft -= 1;

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
  winnerPoints.textContent = `GOT IT FIRST! +${points} POINTS`;

  timesUpPopup.classList.add("hidden");
  winnerPopup.classList.remove("hidden");
}

function showNoWinner() {
  timesUpAnswer.textContent = game.answer;

  winnerPopup.classList.add("hidden");
  timesUpPopup.classList.remove("hidden");
}

function endGame(showFinal) {
  game.active = false;
  game.waitingForNext = false;
  clearInterval(game.timer);

  if (showFinal) showFinalLeaderboard();

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

  if ((type.includes("chat") || type.includes("comment") || possibleMessage) && possibleMessage && possibleUsername) {
    return {
      username: possibleUsername,
      message: possibleMessage
    };
  }

  return null;
}

document.querySelectorAll("#brushPresets .preset").forEach(button => {
  button.addEventListener("click", () => {
    const color = button.dataset.color;

    document.querySelectorAll("#brushPresets .preset").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentBrushColor = color;
    brushColor.value = color;
    eraser = false;
    eraserBtn.textContent = "Eraser Off";
  });
});

document.querySelectorAll("#bgPresets .preset").forEach(button => {
  button.addEventListener("click", () => {
    const color = button.dataset.color;

    document.querySelectorAll("#bgPresets .preset").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    bgColor.value = color;
    setBackground(color);
  });
});

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

brushColor.oninput = () => {
  currentBrushColor = brushColor.value;
  eraser = false;
  eraserBtn.textContent = "Eraser Off";
};

bgColor.oninput = () => {
  setBackground(bgColor.value);
};

applyBgBtn.onclick = () => {
  setBackground(bgColor.value);
};

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

setBackground(currentBgColor);
updateUI();
