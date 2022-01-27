
import { h } from './dom'
import { cssPrefix, gridContentWH } from '../config'
import { Pixel } from './pixel'
import { ToolBar } from './toolbar/index'
import { notify } from '../core/notify'

class Board {
  constructor(targetEl) {
    this.el = h('div', `${cssPrefix}-board`)
    this.resize(this.el)
    this.targetEl = targetEl
    this.targetEl.children(this.el)
    this.canvasEl = h('canvas', `${cssPrefix}-board-canvas`)
    this.el.children(this.canvasEl)
    this.pixel = new Pixel(this.canvasEl)
    this.toolbar = new ToolBar()
    this.targetEl.children(this.toolbar.el)
    notify.on('changeInputSize', (payload) => {
      console.warn('changeInputSize on', payload)
      this.initData(payload)
    })
  }
  resize(arg) {
    arg.el.style.width = `${gridContentWH}px`
    arg.el.style.height = `${gridContentWH}px`
  }
  initData(data = {}) {
    this.pixel.initData(data)
  }
}

export {
  Board
}
