
class Dom {
  constructor(tag, className = '') {
    if (typeof tag === 'string') {
      this.el = document.createElement(tag)
      this.el.className = className
    } else {
      this.el = tag
    }
  }

  children(...eles) {
    if (arguments.length === 0) {
      return this.el.childNodes
    }
    eles.forEach(ele => this.child(ele))
    return this
  }

  child(arg) {
    let ele = arg
    if (typeof arg === 'string') {
      ele = document.createTextNode(arg)
    } else if (arg instanceof Dom) {
      ele = arg.el
    }
    this.el.appendChild(ele)
    return this
  }

  on(eventNames, handler) {
    const [fen, ...oen] = eventNames.split('.')
    let eventName = fen
    if (eventName === 'mousewheel' && /Firefox/i.test(window.navigator.userAgent)) {
      eventName = 'DOMMouseScroll'
    }
    this.el.addEventListener(eventName, (evt) => {
      handler(evt)
      for (let i = 0; i < oen.length; i += 1) {
        const k = oen[i]
        if (k === 'left' && evt.button !== 0) {
          return
        }
        if (k === 'right' && evt.button !== 2) {
          return
        }
        if (k === 'stop') {
          evt.stopPropagation()
        }
      }
    })
    return this
  }
  attr(name, value) {
    this.el.setAttribute(name, value)
    return this
  }
  attrs(...arrs) {
    arrs.forEach(arr => this.attr(arr[0], arr[1]))
    return this
  }
  html(arg) {
    if (arg !== undefined) {
      this.el.innerHTML = arg
      return this
    }
    return this.el.innerHTML
  }
  removeChild(el) {
    this.el.removeChild(el)
  }
}

const h = (tag, className = '') => new Dom(tag, className)

export {
  Dom,
  h
}
