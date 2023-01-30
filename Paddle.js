const PADDLE_SPEED=.014
export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem
    this.reset()
  }
  get position() { 
    return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"))
  }
  set position(value){
    this.paddleElem.style.setProperty("--position", value)
  }
  reset(){
    this.position = 50
  }
  update(delta,ballHeight) {
    this.position += (ballHeight-this.position) * delta*PADDLE_SPEED 
  }
  rects(){
    return this.paddleElem.getBoundingClientRect()
  }
}
