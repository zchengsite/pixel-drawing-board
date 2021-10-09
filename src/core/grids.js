import { gridContentWH, gridNum } from '../config'

const grids = []

// 生成初始网格
function initGrids() {
  let color = '#ffffff'
  // 当前网格序号 - 用来计数 - 判断奇和偶。奇：#d9d9d9；偶：#ffffff
  let num = 0
  if (grids.length !== 0) {
    return grids
  }

  for (let i = 0; i < gridNum; i++) {
    for (let j = 0; j < gridNum; j++) {
      num++
      if (gridNum % 2 === 0) {
        if (i % 2 === 0) {
          if (num % 2 === 0) {
            color = '#ffffff'
          } else {
            color = '#d9d9d9'
          }
        } else {
          if (num % 2 === 0) {
            color = '#d9d9d9'
          } else {
            color = '#ffffff'
          }
        }
      } else {
        if (num % 2 === 0) {
          color = '#ffffff'
        } else {
          color = '#d9d9d9'
        }
      }

      grids.push(
        {
          x: gridContentWH / gridNum * j,
          y: gridContentWH / gridNum * i,
          wh: gridContentWH / gridNum,
          color,
          status: 0
        }
      )
    }
  }
  return grids
}

// 网格着色
function fillGrids(ctx, x, y, c, wh) {
  ctx.beginPath()
  ctx.fillStyle = c
  ctx.fillRect(x, y, wh, wh)
}
export {
  initGrids,
  fillGrids
}
