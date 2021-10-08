
import { h } from './dom'
import { cssPrefix, gridContentWH } from '../js/config'
import { Pixel } from './pixel'

class Board {
  constructor(targetEl) {
    this.el = h('div', `${cssPrefix}-board`)
    this.resize(this.el)
    targetEl.children(this.el)
    this.canvasEl = h('canvas', `${cssPrefix}-board-canvas`)
    this.el.children(this.canvasEl)
    this.pixel = new Pixel(this.canvasEl)
  }
  resize(arg) {
    arg.el.style.width = `${gridContentWH}px`
    arg.el.style.height = `${gridContentWH}px`
  }
}

export {
  Board
}
