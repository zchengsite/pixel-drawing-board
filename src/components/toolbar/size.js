import { h } from '../dom'
import { cssPrefix, gridNum } from '../../config'
import { notify } from '../../core/notify'

function inputEventHandler(evt) {
  const confirmTip = confirm('改变画板大小将会重置现有画板，确定吗?')
  if (!confirmTip) return
  const data = {
    value: evt.target.value * 1,
    type: 'changeInputSize'
  }
  notify.emit('changeInputSize', data)
}

class SetSize {
  constructor() {
    this.el = h('div', `${cssPrefix}-set-size`)
    this.labelEl = h('label', '')
    this.inputEl = h('input', 'size-input')
      .on('change', evt => inputEventHandler.call(this, evt))
    this.labelEl.html('Panel size')
    this.el.children(this.labelEl, this.inputEl)
    this.inputEl.attrs(
      ['value', gridNum],
      ['type', 'number'],
      ['placeholder', 'The number of rows and columns'],
      ['max', 100],
      ['min', 1]
    )
  }
}

export {
  SetSize
}
