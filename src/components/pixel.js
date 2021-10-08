import { gridContentWH, gridNum, wh, hoverColor, drawingColor } from '../js/config'
import { initGrids, fillGrids } from '../core/grids'

let drawing = false

// 初始化画板
function initDrawingBoard() {
  const { ctx } = this
  for (const grid of initGrids()) {
    fillGrids(
      ctx,
      grid.x / (gridContentWH / gridNum),
      grid.y / (gridContentWH / gridNum),
      grid.color,
      wh
    )
  }
}

// 绘画中
function draw(e) {
  const { ctx } = this
  const x = e.offsetX
  const y = e.offsetY
  let color = hoverColor
  for (const grid of initGrids()) {
    if ((x >= grid.x) &&
      (y >= grid.y) &&
      (x < grid.x + grid.wh) &&
      (y < grid.y + grid.wh)) {
      const axisX = grid.x / (gridContentWH / gridNum)
      const axisY = grid.y / (gridContentWH / gridNum)
      if (!drawing) {
        clearHoverGrids.call(this)
      } else if (e.buttons === 1) {
        color = grid.color = drawingColor
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

      ctx.beginPath()
      ctx.fillStyle = color
      ctx.fillRect(axisX, axisY, wh, wh)
    }
  }
}

// 清除上一帧鼠标悬停效果
function clearHoverGrids() {
  const { ctx } = this
  if (!drawing) {
    ctx.clearRect(0, 0, gridNum, gridNum)
    initDrawingBoard.call(this)
  }
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
  })
}

class Pixel {
  constructor(target) {
    this.target = target
    this.el = target.el
    this.ctx = this.el.getContext('2d')
    this.resize()
    initDrawingBoard.call(this)
    initEvents.call(this)
  }
  resize() {
    this.el.width = gridNum
    this.el.height = gridNum
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
