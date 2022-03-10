import { h } from '../dom'
import { cssPrefix } from '../../config'
import { notify } from '../../core/notify'

class Preview {
  constructor() {
    this.el = h('div', `${cssPrefix}-preview-thumbnail`)
    this.labelEl = h('label', '').html('Preview')
    this.imgEl = h('img', '')
    notify.on('changePreview', payload => {
      this.imgEl.attr('src', payload)
    })
    this.previewContent = h('div', 'preview-content').child(this.imgEl)
    this.el.children(this.labelEl, this.previewContent)
  }
}

export {
  Preview
}
