import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const  HUE = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta,[playerPaddle.rects(), computerPaddle.rects()])
    computerPaddle.update(delta,ball.y)
    document.documentElement.style.setProperty("--hue",HUE+delta*0.01)
    if(isLose()){
      handleLoss()
    }
  }

  lastTime = time
  window.requestAnimationFrame(update,ball.y)
}

function isLose() {
  const rect=ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLoss() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  ball.reset()
  computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})
window.requestAnimationFrame(update)