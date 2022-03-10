import { gridContentWH, gridNum, wh, hoverColor, drawingColor } from '../config'
import { initGrids, fillGrids } from '../core/grids'
import { notify } from '../core/notify'

let drawing = false
let currentDrawColor = drawingColor

notify.on('changeColor', (payload) => {
  console.warn('changeColor', payload)
  currentDrawColor = payload
})

// 初始化画板
function initDrawingBoard(isReset) {
  const { ctx, customData } = this
  for (const grid of initGrids(customData, isReset)) {
    fillGrids(
      ctx,
      grid.x / (gridContentWH / (customData || gridNum)),
      grid.y / (gridContentWH / (customData || gridNum)),
      grid.color,
      wh
    )
  }
}

// 绘制
function draw(e) {
  const { ctx, customData } = this
  const x = e.offsetX
  const y = e.offsetY
  let color = hoverColor
  for (const grid of initGrids()) {
    if ((x >= grid.x) &&
      (y >= grid.y) &&
      (x < grid.x + grid.wh) &&
      (y < grid.y + grid.wh)) {
      const axisX = grid.x / (gridContentWH / (customData || gridNum))
      const axisY = grid.y / (gridContentWH / (customData || gridNum))
      if (!drawing) {
        clearHoverGrids.call(this)
      } else if (e.buttons === 1) {
        color = grid.color = currentDrawColor
        grid.status = 1
      } else if (e.buttons === 2) {
        color = '#ffffff'
        // 当前点击网格行数 - 奇或偶
        if (Math.ceil(axisY + 1) % 2 === 0) {
          if (Math.ceil(axisX + 1) % 2 === 0) {
            color = '#d9d9d9'
          }
        } else {
          if (Math.ceil(axisX + 1) % 2 !== 0) {
            color = '#d9d9d9'
          }
        }
        grid.color = color
        grid.status = 0
      }

      fillGrids(ctx, axisX, axisY, color, wh)
    }
  }
}

// 清除上一帧鼠标悬停效果
function clearHoverGrids() {
  const { ctx, customData } = this
  if (!drawing) {
    ctx.clearRect(0, 0, customData || gridNum, customData || gridNum)
    initDrawingBoard.call(this)
  }
}

// 绘画预览（缩略图）
function previewDraw() {
  const { el } = this
  const MIME_TYPE = 'image/png'
  const imgURL = el.toDataURL(MIME_TYPE, 1.0)
  notify.emit('changePreview', imgURL)
}

function initEvents() {
  const { target } = this
  target.on('mousemove', (evt) => {
    draw.call(this, evt)
  }).on('mouseout', (evt) => {
    clearHoverGrids.call(this)
    drawing = false
  }).on('mousedown', (evt) => {
    drawing = true
    draw.call(this, evt)
  }).on('mouseup', (evt) => {
    drawing = false
    previewDraw.call(this)
  })
}

class Pixel {
  constructor(target) {
    this.target = target
    this.el = target.el
    this.ctx = this.el.getContext('2d')
    initEvents.call(this)
  }
  initData(data) {
    const { value, type } = data
    this.customData = value
    this.resize()
    initDrawingBoard.call(this, !!(type && type === 'changeInputSize'))
  }
  resize() {
    this.el.width = this.customData || gridNum
    this.el.height = this.customData || gridNum
  }
  // 展示坐标
  showCoordinates() {
    // 获取当前鼠标所在网格X，Y轴
    // currGridPosition.innerHTML = `<span>X: ${Math.ceil(axisX + 1)},
    //   Y: ${Math.ceil(axisY + 1)}</span>`
  }
}

export {
  Pixel
}
