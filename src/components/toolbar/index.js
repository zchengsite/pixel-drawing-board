
import { h } from '../dom'
import { cssPrefix } from '../../config'
import { SetSize } from './size'
import { SetColor } from './colors'
import { Preview } from './preview'
import { Export } from './export'

class ToolBar {
  constructor() {
    this.el = h('div', `${cssPrefix}-tool-bar-r`)
    this.tools = h('div', `${cssPrefix}-tool-bar-items`)
    this.toolItems = [
      this.sizeEl = new SetSize(),
      this.colorEl = new SetColor(),
      this.previewEl = new Preview(),
      this.exportEl = new Export()
    ]
    this.toolItems.forEach(tool => {
      this.tools.child(tool.el)
    })
    this.el.child(this.tools)
  }
}

export {
  ToolBar
}
