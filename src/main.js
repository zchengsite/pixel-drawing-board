import Clipboard from 'clipboard'

// main.js

// 画布大小
const gridLayoutWH = document.body.clientHeight - 100
// 行列网格数
let gridNum = 32
// 单个网格宽高
const wh = 1

// 鼠标选中hover
const hoverColor = 'rgb(56 56 56 / 40%)'

// let lastAxisX = undefined
// let lastAxisY = undefined

// 绘画状态
let drawing = false

// 默认未绘画网格颜色
let defaultGridColor = '#fff'

// 默认已绘画网格颜色
let drawingColor = '#000'

// 擦掉网格后的颜色
const eraseColor = '#fff'

// 初始画板中的所有网格列表
let initGridList = []

// 记录当前鼠标所在网格的x, y坐标点
const currGridPosition = document.getElementsByClassName('curr-grid-position')[0]

const canvasWrapper = document.getElementsByClassName('drawing-board-wrapper')[0]
canvasWrapper.style.width = document.body.clientHeight - 100 + 'px'
canvasWrapper.style.height = document.body.clientHeight - 100 + 'px'

const canvas = document.getElementById('drawing-board')
const ctx = canvas.getContext('2d')

// 生成初始黑白网格列表
function generateInitialGrids() {
  // 当前网格序号 - 用来计数 - 判断奇和偶。奇：#d9d9d9；偶：#fff
  let num = 0
  initGridList = []

  for (let i = 0; i < gridNum; i++) {
    for (let j = 0; j < gridNum; j++) {
      num++
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
          color: defaultGridColor,
          status: 0
        }
      )
    }
  }
}

// 初始化画板
function initDrawingBoard() {
  // 设置canvas宽高
  canvas.setAttribute('width', gridNum)
  canvas.setAttribute('height', gridNum)
  for (const grid of initGridList) {
    ctx.beginPath()
    ctx.fillStyle = grid.color
    ctx.fillRect(grid.x / (gridLayoutWH / gridNum), grid.y / (gridLayoutWH / gridNum), wh, wh)
  }
}

// handleEvent方法监听鼠标事件并进行处理。
function handleEvent(e) {
  const x = e.offsetX
  const y = e.offsetY

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
  for (const grid of initGridList) {
    if ((x >= grid.x) &&
      (y >= grid.y) &&
      (x < grid.x + grid.wh) &&
      (y < grid.y + grid.wh)) {
      const axisX = grid.x / (gridLayoutWH / gridNum)
      const axisY = grid.y / (gridLayoutWH / gridNum)

      // 获取当前鼠标所在网格X，Y轴
      currGridPosition.innerHTML = `<span>X: ${Math.ceil(axisX + 1)},
        Y: ${Math.ceil(axisY + 1)}</span>`

      if (e === 'leftClick') {
        grid.color = c
        grid.status = 1
      } else if (e === 'rightClick') {
        // 当前点击网格行数 - 奇或偶
        if (Math.ceil(axisY + 1) % 2 === 0) {
          if (Math.ceil(axisX + 1) % 2 === 0) {
            c = '#d9d9d9'
          }
        } else {
          if (Math.ceil(axisX + 1) % 2 !== 0) {
            c = '#d9d9d9'
          }
        }
        grid.color = c
        grid.status = 0
      }

      ctx.beginPath()
      ctx.fillStyle = c
      // ctx.moveTo(lastAxisX , lastAxisY)
      // ctx.lineTo(axisX, axisY)
      ctx.fillRect(axisX, axisY, wh, wh)
      // lastAxisX = axisX
      // lastAxisY = axisY
    }
  }
}

// 监听鼠标在网格上移动
canvas.addEventListener('mousemove', function(e) {
  handleEvent(e)
})

// 监听鼠标移出网格
canvas.addEventListener('mouseout', function(e) {
  clearHoverGrids(e)
})

// 监听鼠标按键按下
canvas.addEventListener('mousedown', function(e) {
  drawing = true
  handleEvent(e)
})

// 监听鼠标按键松开
canvas.addEventListener('mouseup', function(e) {
  drawing = false
})

// 取消默认的浏览器自带右键菜单
canvas.oncontextmenu = function(e) {
  e.preventDefault()
}

window.onbeforeunload = function(e) {
  return '确定离开此页吗？'
}

// 在此初始化
generateInitialGrids()
// 在此初始化
initDrawingBoard()

// 画布尺寸控制
const currentSize = document.getElementById('current-size')

function changeDrawSize(e) {
  console.log(e.target.value)
  var confirmTip = confirm('改变画板大小将会重置现有画板，确定吗?')
  if (confirmTip) {
    gridNum = e.target.value
    clearHoverGrids()
    generateInitialGrids()
    initDrawingBoard()
    canvasPreview()
    initSizeOptions()
  }
}

currentSize.addEventListener('change', changeDrawSize, false)

// 颜色选择器
const colorsList = ['#faddd1', '#fad3d1', '#fad1e6', '#e5d1fa', '#d4d1fa', '#d1e3fa', '#d1f3fa', '#d1faf0', '#d1fad7', '#ebfad1', '#faf9d1', '#faefd1', '#fae6d1', '#f2e2d9', '#ffffff', '#f4b69c', '#f4a09c', '#f49cc8', '#c69cf4', '#a39cf4', '#9cc2f4', '#9ce5f4', '#9cf4df', '#9cf4a7', '#d4f49c', '#f4f19c', '#f4dc9c', '#f4c89c', '#e3c0ac', '#e4e4e4', '#ee8f66', '#ee6d66', '#ee66aa', '#a866ee', '#7166ee', '#66a1ee', '#66d7ee', '#66eece', '#66ee78', '#bcee66', '#eee966', '#eeca66', '#eeaa66', '#d59f80', '#b4b4b4', '#e86830', '#e83a30', '#e8308c', '#8930e8', '#4030e8', '#3080e8', '#30c9e8', '#30e8bd', '#30e849', '#a5e830', '#e8e230', '#e8b730', '#e88c30', '#c67d53', '#848484', '#c74b16', '#c71f16', '#c7166f', '#6c16c7', '#2516c7', '#1663c7', '#16a9c7', '#16c79e', '#16c72e', '#86c716', '#c7c116', '#c79816', '#c76f16', '#a66037', '#545454', '#913710', '#911710', '#911051', '#4f1091', '#1b1091', '#104891', '#107c91', '#109173', '#109121', '#629110', '#918d10', '#916f10', '#915110', '#794628', '#242424', '#5c230a', '#5c0e0a', '#5c0a33', '#320a5c', '#110a5c', '#0a2e5c', '#0a4e5c', '#0a5c49', '#0a5c15', '#3e5c0a', '#5c590a', '#5c460a', '#5c330a', '#4d2c19', '#000000']

const colorsWrapper = document.getElementById('color-groups')

const currentInputColor = document.getElementById('current-color')

for (const i of colorsList) {
  const colorItemStr = `<a id="color-${i}" name="${i}" href="javascript:void(0)" style="background: ${i};"></a>`
  const tempWrapper = document.createElement('li')
  tempWrapper.innerHTML = colorItemStr
  colorsWrapper.append(tempWrapper)

  const colorItem = document.getElementById(`color-${i}`)
  colorItem.addEventListener('click', changeDrawColor, false)
}

function changeDrawColor(e) {
  if (e.type === 'click') {
    currentInputColor.value = e.target.name
    drawingColor = e.target.name
  } else {
    currentInputColor.value = e.target.value
    drawingColor = e.target.value
  }
}

currentInputColor.addEventListener('change', changeDrawColor, false)

// 预览
function canvasPreview() {
  const canvasPreviewEl = document.createElement('canvas')
  const ctxPreview = canvasPreviewEl.getContext('2d')

  canvasPreviewEl.setAttribute('width', gridNum)
  canvasPreviewEl.setAttribute('height', gridNum)

  for (const grid of initGridList) {
    ctxPreview.beginPath()
    if (grid.status === 0) {
      ctxPreview.fillStyle = '#fff'
    } else {
      ctxPreview.fillStyle = grid.color
    }
    ctxPreview.fillRect(grid.x / (gridLayoutWH / gridNum), grid.y / (gridLayoutWH / gridNum), wh, wh)
  }

  const previewImgEl = document.getElementById('preview-img')

  const MIME_TYPE = 'image/png'
  const imgURL = canvasPreviewEl.toDataURL(MIME_TYPE, 1.0)

  previewImgEl.src = imgURL
  localStorage.setItem('imgURL', imgURL)
}

canvas.addEventListener('mousemove', () => {
  if (drawing) {
    canvasPreview()
  }
})

canvas.addEventListener('mousedown', () => {
  if (drawing) {
    canvasPreview()
  }
})

canvasPreview()

// 初始化导出图片尺寸选项
function initSizeOptions() {
  const imageSizeSelect = document.getElementById('imageSize')
  imageSizeSelect.innerHTML = ''
  const WH = gridNum
  const num = 20
  for (let i = 1; i < num + 1; i++) {
    const optionStr = `${i * WH} x ${i * WH}`
    const imgOption = document.createElement('option')
    imgOption.setAttribute('value', i * WH)
    imgOption.innerHTML = optionStr
    imageSizeSelect.append(imgOption)
  }
}

initSizeOptions()

// 保存
function saveToImages() {
  const imageSizeSelect = document.getElementById('imageSize')
  const imgWH = imageSizeSelect.value

  const tempCanvasPreviewEl = document.createElement('canvas')
  const tempCtxPreview = tempCanvasPreviewEl.getContext('2d')

  tempCanvasPreviewEl.style.imageRendering = 'pixelated'

  tempCanvasPreviewEl.setAttribute('width', imgWH)
  tempCanvasPreviewEl.setAttribute('height', imgWH)

  const tempInitGridList = initGridList.map(item => ({
    x: item.x * (imgWH / gridNum),
    y: item.y * (imgWH / gridNum),
    wh: item.wh * (imgWH / gridNum),
    color: item.color,
    status: item.status
  }))

  for (const grid of tempInitGridList) {
    tempCtxPreview.beginPath()
    if (grid.status === 0) {
      tempCtxPreview.fillStyle = '#fff'
    } else {
      tempCtxPreview.fillStyle = grid.color
    }
    tempCtxPreview.fillRect(grid.x / (gridLayoutWH / gridNum), grid.y / (gridLayoutWH / gridNum), wh * (imgWH / gridNum), wh * (imgWH / gridNum))
  }

  const MIME_TYPE = 'image/png'
  const imgURL = tempCanvasPreviewEl.toDataURL(MIME_TYPE, 1.0)

  const dlLink = document.createElement('a')
  dlLink.download = 'pixel-picture.png'
  dlLink.href = imgURL
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}

const saveToImageBtn = document.getElementById('saveToImage')
saveToImageBtn.addEventListener('click', saveToImages, false)

function saveToBoxShadows() {
  // box-shadow 每个像素块宽高
  const preGridSize = document.getElementById('pre-grid-size')
  const tempInitGridList = JSON.parse(JSON.stringify(initGridList))
  let result = ''
  const wh = preGridSize.value
  const transparentColor = '#00000000'
  for (let i = 0; i < tempInitGridList.length; i++) {
    if (tempInitGridList[i].status === 0) {
      tempInitGridList[i].color = transparentColor
    }
    const rowNum = Math.ceil((i + 1) / gridNum)
    const columnNum = (i + 1) % gridNum === 0 ? gridNum : (i + 1) % gridNum
    result += `${wh * columnNum}px ${wh * rowNum}px ${tempInitGridList[i].color}, `
  }
  // console.warn('result', result)
  const boxShadowBtnEl = document.querySelector('.box-shadow-btns')
  boxShadowBtnEl.setAttribute('data-clipboard-text', result)
  new Clipboard('.box-shadow-btns')
  alert('已复制到剪切板，请在需要使用的地方粘贴！')
  // console.warn('btnCopy', btnCopy)
}

const saveToBoxShadowBtn = document.getElementById('saveToBoxShadow')
saveToBoxShadowBtn.addEventListener('click', saveToBoxShadows, false)
