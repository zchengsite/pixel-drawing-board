// size.js
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
  }
}

currentSize.addEventListener('change', changeDrawSize, false)
