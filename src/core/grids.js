import { gridContentWH, gridNum } from '../config'

let grids = []

function initGrids(gridNumDefault = gridNum, resetGrids = false) {
  let color = '#ffffff'
  let num = 0
  if (grids.length !== 0 && !resetGrids) {
    return grids
  }

  grids = resetGrids ? [] : grids

  for (let i = 0; i < gridNumDefault; i++) {
    for (let j = 0; j < gridNumDefault; j++) {
      num++
      if (gridNumDefault % 2 === 0) {
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
          x: gridContentWH / gridNumDefault * j,
          y: gridContentWH / gridNumDefault * i,
          wh: gridContentWH / gridNumDefault,
          color,
          status: 0
        }
      )
    }
  }
  return grids
}

function fillGrids(ctx, x, y, c, wh) {
  ctx.beginPath()
  ctx.fillStyle = c
  ctx.fillRect(x, y, wh, wh)
}
export {
  initGrids,
  fillGrids
}
