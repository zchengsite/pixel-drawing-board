class Notify {
  constructor() {
    this.notifyMap = {}
  }
  emit(name, payload) {
    const fns = (this.notifyMap[name] = this.notifyMap[name] || [])
    if (fns && fns.length) {
      fns.forEach(fn => fn(payload))
    }
  }
  on(name, callback) {
    // if (this.notifyMap[name]) {
    //   console.warn(name, '已存在')
    //   return
    // }
    const callbacks = (this.notifyMap[name] = this.notifyMap[name] || [])
    if (callbacks.indexOf(callback) === -1) {
      callbacks.push(callback)
    }
  }
  remove(name, callback) {
    const callbacks = (this.notifyMap[name] = this.notifyMap[name] || [])
    if (callbacks.indexOf(callback) !== -1) {
      this.notifyMap[name] = callbacks.filter(d => d !== callback)
    }
  }
}

const notify = new Notify()

module.exports = {
  notify
}
