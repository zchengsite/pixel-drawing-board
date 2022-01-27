
import { cssPrefix, gridLayoutWH } from './config'
import { h } from './components/dom'
import { Board } from './components/board'
import './scss/index.scss'

class PixelDrawing {
  constructor(selectors, options = {}) {
    let targetEl = selectors
    this.options = options
    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors)
    }
    // create root element => pixel-drawing
    const root = h('div', cssPrefix)
      .on('contextmenu', evt => evt.preventDefault())
    // init root element height
    this.resize(root.el)
    targetEl.appendChild(root.el)
    this.board = new Board(root)
    this.board.initData()
  }
  resize(el) {
    el.style.height = `${gridLayoutWH}px`
  }
}

const pixeldrawing = (el, options = {}) => new PixelDrawing(el, options)

if (window) {
  window.x_pixeldrawing = pixeldrawing
}

export default PixelDrawing

export {
  pixeldrawing
}
