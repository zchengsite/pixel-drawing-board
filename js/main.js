// 画布大小
let gridLayoutWH = document.body.clientHeight - 100
// 行列网格数
let gridNum = 32
// 单个网格宽高
let wh = 1

// 鼠标选中hover
let hoverColor = 'rgb(56 56 56 / 40%)'

// 绘画状态
let drawing = false

// 默认未绘画网格颜色
let defaultGridColor = '#fff'

// 默认已绘画网格颜色
let drawingColor = '#000'

// 擦掉网格后的颜色
let eraseColor = '#fff'

// 初始画板中的所有网格列表
let initGridList = []

// 记录当前鼠标所在网格的x, y坐标点
let currGridPosition = document.getElementsByClassName('curr-grid-position')[0]

let canvasWrapper = document.getElementsByClassName('drawing-board-wrapper')[0]
canvasWrapper.style.width = document.body.clientHeight - 100 +'px'
canvasWrapper.style.height = document.body.clientHeight - 100 +'px'

let canvas = document.getElementById('drawing-board')
let ctx = canvas.getContext('2d')

// 设置canvas宽高
canvas.setAttribute('width', gridNum)
canvas.setAttribute('height', gridNum)

// 生成初始黑白网格列表
function generateInitialGrids () {
  // 当前网格序号 - 用来计数 - 判断奇和偶。奇：#d9d9d9；偶：#fff
  let num = 0

  for (let i = 0; i < gridNum; i++) {
    for (let j = 0; j < gridNum; j++) {
      num ++
      if (gridNum % 2 === 0) {
        if (i % 2 === 0) {
          if (num % 2 === 0) {
            defaultGridColor = '#fff'
          } else {
            defaultGridColor = '#d9d9d9'
          }
        } else {
          if (num % 2 === 0) {
            defaultGridColor = '#d9d9d9'
          } else {
            defaultGridColor = '#fff'
          }
        }
      } else {
        if (num % 2 === 0) {
          defaultGridColor = '#fff'
        } else {
          defaultGridColor = '#d9d9d9'
        }
      }

      initGridList.push(
        {
          x: gridLayoutWH / gridNum * j,
          y: gridLayoutWH / gridNum * i,
          wh: gridLayoutWH / gridNum,
          color: defaultGridColor
        }
      )
    }
  }
}

// 初始化画板
function initDrawingBoard() {
  for (let grid of initGridList) {
    ctx.beginPath()
    ctx.fillStyle = grid.color
    ctx.fillRect(grid.x / (gridLayoutWH / gridNum) , grid.y / (gridLayoutWH / gridNum), wh, wh)
  }
}

// handleEvent方法监听鼠标事件并进行处理。
function handleEvent(e) {
  let x = e.offsetX,
    y = e.offsetY

  if (drawing) {
    // 鼠标左键
    if (e.buttons === 1) {
      drawingGrids(x, y)
    // 鼠标右键
    } else {
      eraseGrids(x, y)
    }
  } else {
    hoverGrids(x, y)
  }
}

// 鼠标悬停效果
function hoverGrids(x, y) {
  clearHoverGrids()
  draw(x, y, hoverColor, 'hover')
}

// 清除上一帧鼠标悬停效果
function clearHoverGrids() {
  if (!drawing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    initDrawingBoard()
  }
}

// 在画板中按住鼠标左键拖动或点击画板网格
function drawingGrids(x, y) {
  draw(x, y, drawingColor, 'leftClick')
}

// 擦除网格颜色 - 橡皮擦功能
function eraseGrids(x, y) {
  draw(x, y, eraseColor, 'rightClick')
}

// 网格上色
function draw(x, y, c, e) {
  for (let i = 0; i < initGridList.length; i++) {
    if ((x >= initGridList[i].x) &&
      (y >= initGridList[i].y) &&
      (x < initGridList[i].x + initGridList[i].wh) &&
      (y < initGridList[i].y + initGridList[i].wh)) {
      let axisX = initGridList[i].x / (gridLayoutWH / gridNum)
      let axisY = initGridList[i].y / (gridLayoutWH / gridNum)

      // 获取当前鼠标所在网格X，Y轴
      currGridPosition.innerHTML = `<span>X: ${Math.ceil(axisX + 1)},
        Y: ${Math.ceil(axisY + 1)}</span>`

      if (e === 'leftClick') {
        initGridList[i].color = c
      } else if (e === 'rightClick') {
        // 当前点击网格行数 - 奇或偶
        if (Math.ceil(axisY + 1) % 2 === 0) {
          if(Math.ceil(axisX + 1) % 2 === 0) {
            c = '#d9d9d9'
          }
        } else {
          if(Math.ceil(axisX + 1) % 2 !== 0) {
            c = '#d9d9d9'
          }
        }
        initGridList[i].color = c
      }

      ctx.beginPath()
      ctx.fillStyle = c
      ctx.fillRect(axisX , axisY, wh, wh)
      ctx.closePath()
    }
  }
}

canvas.addEventListener('mousemove', function(e) {
  handleEvent(e)
})

canvas.addEventListener('mouseout', function(e) {
  clearHoverGrids(e)
})

canvas.addEventListener('mousedown', function(e) {
  drawing = true
  handleEvent(e)
})

canvas.addEventListener('mouseup', function(e) {
  drawing = false
})

canvas.oncontextmenu = function(e) {
  //取消默认的浏览器自带右键菜单
  e.preventDefault();
}

window.onbeforeunload = function(e) {
	return '确定离开此页吗？';
}

generateInitialGrids()
initDrawingBoard()
