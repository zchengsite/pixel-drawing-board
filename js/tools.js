
// 画布尺寸控制
let currentSize = document.getElementById('current-size')

function changeDrawSize(e) {
  console.log(e.target.value)
  var confirmTip = confirm("改变画板大小将会重置现有画板，确定吗?")
  if (confirmTip) {
    gridNum = e.target.value
    clearHoverGrids()
    generateInitialGrids()
    initDrawingBoard()
    canvasPreview()
  }
}

currentSize.addEventListener('change', changeDrawSize, false)


// 颜色选择器
let colorsList = ['#faddd1', '#fad3d1', '#fad1e6', '#e5d1fa', '#d4d1fa', '#d1e3fa', '#d1f3fa', '#d1faf0', '#d1fad7', '#ebfad1', '#faf9d1', '#faefd1', '#fae6d1', '#f2e2d9', '#ffffff', '#f4b69c', '#f4a09c', '#f49cc8', '#c69cf4', '#a39cf4', '#9cc2f4', '#9ce5f4', '#9cf4df', '#9cf4a7', '#d4f49c', '#f4f19c', '#f4dc9c', '#f4c89c', '#e3c0ac', '#e4e4e4', '#ee8f66', '#ee6d66', '#ee66aa', '#a866ee', '#7166ee', '#66a1ee', '#66d7ee', '#66eece', '#66ee78', '#bcee66', '#eee966', '#eeca66', '#eeaa66', '#d59f80', '#b4b4b4', '#e86830', '#e83a30', '#e8308c', '#8930e8', '#4030e8', '#3080e8', '#30c9e8', '#30e8bd', '#30e849', '#a5e830', '#e8e230', '#e8b730', '#e88c30', '#c67d53', '#848484', '#c74b16', '#c71f16', '#c7166f', '#6c16c7', '#2516c7', '#1663c7', '#16a9c7', '#16c79e', '#16c72e', '#86c716', '#c7c116', '#c79816', '#c76f16', '#a66037', '#545454', '#913710', '#911710', '#911051', '#4f1091', '#1b1091', '#104891', '#107c91', '#109173', '#109121', '#629110', '#918d10', '#916f10', '#915110', '#794628', '#242424', '#5c230a', '#5c0e0a', '#5c0a33', '#320a5c', '#110a5c', '#0a2e5c', '#0a4e5c', '#0a5c49', '#0a5c15', '#3e5c0a', '#5c590a', '#5c460a', '#5c330a', '#4d2c19', '#000000']

let colorsWrapper = document.getElementById('color-groups')

let currentInputColor = document.getElementById('current-color')

for(let i of colorsList) {
  let colorItemStr = `<a id="color-${i}" name="${i}" href="javascript:void(0)" style="background: ${i};"></a>`
  const tempWrapper = document.createElement('li')
  tempWrapper.innerHTML = colorItemStr
  colorsWrapper.append(tempWrapper)

  let colorItem = document.getElementById(`color-${i}`)
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
  let canvasPreviewEl = document.createElement('canvas')
  let ctxPreview = canvasPreviewEl.getContext('2d')

  canvasPreviewEl.setAttribute('width', gridNum)
  canvasPreviewEl.setAttribute('height', gridNum)
  
  for (let grid of initGridList) {
    ctxPreview.beginPath()
    if (grid.status === 0) {
      ctxPreview.fillStyle = '#fff'
    } else {
      ctxPreview.fillStyle = grid.color
    }
    ctxPreview.fillRect(grid.x / (gridLayoutWH / gridNum) , grid.y / (gridLayoutWH / gridNum), wh, wh)
  }

  let previewImgEl = document.getElementById('preview-img')

  let MIME_TYPE = "image/png"
  let imgURL = canvasPreviewEl.toDataURL(MIME_TYPE, 1.0)
  
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


// 保存
function saveToImages() {
  let imgWH = 256

  let tempCanvasPreviewEl = document.createElement('canvas')
  let tempCtxPreview = tempCanvasPreviewEl.getContext('2d')

  tempCanvasPreviewEl.style.imageRendering = 'pixelated'

  tempCanvasPreviewEl.setAttribute('width', imgWH)
  tempCanvasPreviewEl.setAttribute('height', imgWH)

  let tempInitGridList = initGridList.map(item => ({
    x: item.x * (imgWH / gridNum),
    y: item.y * (imgWH / gridNum),
    wh: item.wh * (imgWH / gridNum),
    color: item.color,
    status: item.status
  }))

  for (let grid of tempInitGridList) {
    tempCtxPreview.beginPath()
    if (grid.status === 0) {
      tempCtxPreview.fillStyle = '#fff'
    } else {
      tempCtxPreview.fillStyle = grid.color
    }
    tempCtxPreview.fillRect(grid.x / (gridLayoutWH / gridNum) , grid.y / (gridLayoutWH / gridNum), wh * (imgWH / gridNum), wh * (imgWH / gridNum))
  }

  let MIME_TYPE = "image/png"
  let imgURL = tempCanvasPreviewEl.toDataURL(MIME_TYPE, 1.0)

  let dlLink = document.createElement('a')
  dlLink.download = 'pixel-picture.png'
  dlLink.href = imgURL
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}

let saveToImageBtn = document.getElementById('saveToImage')
saveToImageBtn.addEventListener('click', saveToImages, false)
