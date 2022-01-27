const cssPrefix = 'pixel-drawing'
const gridLayoutWH = document.documentElement.clientHeight
const gridContentWH = gridLayoutWH - 100
const gridNum = 32
const wh = 1
const hoverColor = 'rgb(56 56 56 / 40%)'
const drawingColor = '#000000'

window.onbeforeunload = function(e) {
  return '确定离开此页吗？'
}

export {
  cssPrefix,
  gridLayoutWH,
  gridContentWH,
  gridNum,
  wh,
  hoverColor,
  drawingColor
}
