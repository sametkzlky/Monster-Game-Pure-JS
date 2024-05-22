let playerHeal = 100;
let monsterHeal = 100;
let logs = [];
let gameIsOn = false;
const attackMultiple = 10;
const specialAttackMultiple = 25;
const healUpMultiple = 20;
const monsterAttackMultiple = 25;
const logText = {
  attack: "OYUNCU ATAĞI :",
  specialAttack: "ÖZEL OYUNCU ATAĞI : ",
  monsterAttack: "CANAVAR ATAĞI : ",
  healUp: "İLK YARDIM : ",
  giveUp: "OYUNCU PES ETTİ!!!",
};
const startGame = document.getElementById("start-game");
const controls = document.getElementById("controls");
const attackBtnPlayer = document.getElementById("attack");
const specialAttackBtn = document.getElementById("special-attack");
const healBtn = document.getElementById("heal");
const giveUpBtn = document.getElementById("give-up");
const playerHealthBarInner = document.getElementById("player-health-inner");
const monsterHealthBarInner = document.getElementById("monster-health-inner");
const logList = document.getElementById("log-list");

startGame.addEventListener("click", function () {
  controls.style.display = "block";
  startNewGame();
});
function startNewGame() {
  gameIsOn = true;
  playerHeal = 100;
  monsterHeal = 100;
  logs = [];
  updateHealthBars();
  clearLogs(); 
}
attackBtnPlayer.addEventListener("click", function () {
  if (gameIsOn) {
    playerAttack();
    if (gameIsOn) monsterAttack();
  }
});
specialAttackBtn.addEventListener("click", function () {
  if (gameIsOn) {
    playerSpecialAttack();
    if (gameIsOn) monsterAttack();
  }
});
healBtn.addEventListener("click", function () {
  if (gameIsOn) {
    playerHealUp();
    if (gameIsOn) monsterAttack();
  }
});
giveUpBtn.addEventListener("click", function () {
  if (gameIsOn) {
    playerGiveUp();
  }
});
function playerAttack() {
  const damage = Math.floor(Math.random() * attackMultiple) + 1;
  monsterHeal = Math.max(0, monsterHeal - damage);
  addLog(logText.attack + damage, "player-turn");
  updateHealthBars();
  checkGameOver();
}
function playerSpecialAttack() {
  const damage = Math.floor(Math.random() * specialAttackMultiple) + 10;
  monsterHeal = Math.max(0, monsterHeal - damage);
  addLog(logText.specialAttack + damage, "player-turn");
  updateHealthBars();
  checkGameOver();
}
function playerHealUp() {
  const heal = Math.floor(Math.random() * healUpMultiple) + 10;
  playerHeal = Math.min(100, playerHeal + heal);
  addLog(logText.healUp + heal, "player-turn");
  updateHealthBars();
}
function playerGiveUp() {
  alert(logText.giveUp);
  gameIsOn = false;
}
function monsterAttack() {
  const damage = Math.floor(Math.random() * monsterAttackMultiple) + 1;
  playerHeal = Math.max(0, playerHeal - damage);
  addLog(logText.monsterAttack + damage, "monster-turn");
  updateHealthBars();
  checkGameOver();
}
function addLog(text, className) {
  logs.push(text);
  const logItem = document.createElement("li");
  logItem.textContent = text;
  logItem.classList.add(className);
  logList.appendChild(logItem);
}
function clearLogs() {
  logList.innerHTML = "";
}
function updateHealthBars() {
  playerHealthBarInner.style.width = playerHeal + "%";
  document.getElementById("player-health-text").textContent = playerHeal + "%";

  monsterHealthBarInner.style.width = monsterHeal + "%";
  document.getElementById("monster-health-text").textContent = monsterHeal + "%";
}
function checkGameOver() {
  if (monsterHeal <= 0) {
    alert("OYUNCU KAZANDI!");
    gameIsOn = false;
  } else if (playerHeal <= 0) {
    alert("CANAVAR KAZANDI!");
    gameIsOn = false;
  }
}