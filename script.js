import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

export var PADDLE_SPEED=0.0012

const ball = new Ball(document.getElementById("ball"))
const ballDisplayed = document.querySelector(".ball")
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const  HUE = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
const gameMenu=document.getElementById("game-menu")
const startBtn=document.getElementById("start-btn")
const difficultyArr=document.querySelectorAll("[data]","difficulty-option")
let lastTime

ballDisplayed.style.display ="none"
startBtn.addEventListener("click",startGame)
difficultyArr.forEach(btn=>{
  btn.addEventListener("click",(event)=>{
    event.currentTarget.setAttribute("class","selected-btn")
    difficultyArr.forEach(otherBtns=>{
      if(otherBtns!==btn){
        otherBtns.classList.remove("selected-btn")
        otherBtns.classList.add("non-selected-btn")
      }
    })
  })
})

function startGame() {
  let start=false
  difficultyArr.forEach(btn=>{
    if(btn.classList.contains("selected-btn")){
      let difficulty=btn.textContent
      switch(difficulty){
        case "Hard": PADDLE_SPEED=0.014
        break;
        case "Medium": PADDLE_SPEED=0.012
        break;
        case "Easy": PADDLE_SPEED=0.009
        break;
      }
      gameMenu.style.display="none"
      ballDisplayed.style.display="block"
      window.requestAnimationFrame(update)
      start=true
    }
  })
  if(start===false){
    return alert("Please select a difficulty")
  }
}

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

