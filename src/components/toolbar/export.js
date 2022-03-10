import { h } from '../dom'
import { cssPrefix, gridNum } from '../../config'
import { notify } from '../../core/notify'

function selectEventHandler(e) {
  console.warn('selectEventHandler', e.target.value)
}

class Export {
  constructor() {
    this.el = h('div', `${cssPrefix}-export`)
    this.labelEl = h('label', 'main-title').html('Export')
    this.asImageEl = h('div', 'as-image')
    this.asCssBoxShadowEl = h('div', 'as-css-box-shadow')
    this.selectImageSizeEl = h('select', '')
      .on('change', evt => selectEventHandler.call(this, evt))
    // watch panel size input
    notify.on('changeInputSize', (payload) => {
      console.warn('changeInputSize on', payload)
      this.initData(payload.value)
    })

    this.initData()
  }
  // 生成导出选项
  initData(currentNum) {
    const optionsNum = 20
    const optionsListEl = []
    // 初始化
    this.selectImageSizeEl.el.innerHTML = ''
    this.asImageEl.el.innerHTML = ''
    this.asCssBoxShadowEl.el.innerHTML = ''
    for (let i = 1; i < optionsNum + 1; i++) {
      const size = i * (currentNum || gridNum)
      const optionStr = `${size} x ${size}`
      optionsListEl.push(h('option', '').attr('value', size).html(optionStr).el)
    }
    this.selectImageSizeEl.children(...optionsListEl)
    this.asImageEl.children(
      h('label', 'sub-title').html('as image'),
      this.selectImageSizeEl,
      h('button', 'download-btns').attr('type', 'button').html('save')
    )
    this.asCssBoxShadowEl.children(
      h('label', 'sub-title').html('as css box-shadow'),
      h('input', 'size-input').attrs(
        ['type', 'number'],
        ['placeholder', 'input size']
      ),
      h('button', 'download-btns').attr('type', 'button').html('save')
    )
    this.el.children(this.labelEl, this.asImageEl, this.asCssBoxShadowEl)
  }
}

export {
  Export
}
