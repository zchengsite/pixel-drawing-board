/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/main.js */ \"./src/js/main.js\");\n// index.js\n\n\n\n//# sourceURL=webpack://pixel-drawing-board/./src/index.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clipboard */ \"./node_modules/clipboard/dist/clipboard.js\");\n/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_0__);\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n // main.js\n// 画布大小\n\nvar gridLayoutWH = document.body.clientHeight - 100; // 行列网格数\n\nvar gridNum = 32; // 单个网格宽高\n\nvar wh = 1; // 鼠标选中hover\n\nvar hoverColor = 'rgb(56 56 56 / 40%)'; // let lastAxisX = undefined\n// let lastAxisY = undefined\n// 绘画状态\n\nvar drawing = false; // 默认未绘画网格颜色\n\nvar defaultGridColor = '#fff'; // 默认已绘画网格颜色\n\nvar drawingColor = '#000'; // 擦掉网格后的颜色\n\nvar eraseColor = '#fff'; // 初始画板中的所有网格列表\n\nvar initGridList = []; // 记录当前鼠标所在网格的x, y坐标点\n\nvar currGridPosition = document.getElementsByClassName('curr-grid-position')[0];\nvar canvasWrapper = document.getElementsByClassName('drawing-board-wrapper')[0];\ncanvasWrapper.style.width = document.body.clientHeight - 100 + 'px';\ncanvasWrapper.style.height = document.body.clientHeight - 100 + 'px';\nvar canvas = document.getElementById('drawing-board');\nvar ctx = canvas.getContext('2d'); // 生成初始黑白网格列表\n\nfunction generateInitialGrids() {\n  // 当前网格序号 - 用来计数 - 判断奇和偶。奇：#d9d9d9；偶：#fff\n  var num = 0;\n  initGridList = [];\n\n  for (var i = 0; i < gridNum; i++) {\n    for (var j = 0; j < gridNum; j++) {\n      num++;\n\n      if (gridNum % 2 === 0) {\n        if (i % 2 === 0) {\n          if (num % 2 === 0) {\n            defaultGridColor = '#fff';\n          } else {\n            defaultGridColor = '#d9d9d9';\n          }\n        } else {\n          if (num % 2 === 0) {\n            defaultGridColor = '#d9d9d9';\n          } else {\n            defaultGridColor = '#fff';\n          }\n        }\n      } else {\n        if (num % 2 === 0) {\n          defaultGridColor = '#fff';\n        } else {\n          defaultGridColor = '#d9d9d9';\n        }\n      }\n\n      initGridList.push({\n        x: gridLayoutWH / gridNum * j,\n        y: gridLayoutWH / gridNum * i,\n        wh: gridLayoutWH / gridNum,\n        color: defaultGridColor,\n        status: 0\n      });\n    }\n  }\n} // 初始化画板\n\n\nfunction initDrawingBoard() {\n  // 设置canvas宽高\n  canvas.setAttribute('width', gridNum);\n  canvas.setAttribute('height', gridNum);\n\n  var _iterator = _createForOfIteratorHelper(initGridList),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var grid = _step.value;\n      ctx.beginPath();\n      ctx.fillStyle = grid.color;\n      ctx.fillRect(grid.x / (gridLayoutWH / gridNum), grid.y / (gridLayoutWH / gridNum), wh, wh);\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n} // handleEvent方法监听鼠标事件并进行处理。\n\n\nfunction handleEvent(e) {\n  var x = e.offsetX,\n      y = e.offsetY;\n\n  if (drawing) {\n    // 鼠标左键\n    if (e.buttons === 1) {\n      drawingGrids(x, y); // 鼠标右键\n    } else {\n      eraseGrids(x, y);\n    }\n  } else {\n    hoverGrids(x, y);\n  }\n} // 鼠标悬停效果\n\n\nfunction hoverGrids(x, y) {\n  clearHoverGrids();\n  draw(x, y, hoverColor, 'hover');\n} // 清除上一帧鼠标悬停效果\n\n\nfunction clearHoverGrids() {\n  if (!drawing) {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    initDrawingBoard();\n  }\n} // 在画板中按住鼠标左键拖动或点击画板网格\n\n\nfunction drawingGrids(x, y) {\n  draw(x, y, drawingColor, 'leftClick');\n} // 擦除网格颜色 - 橡皮擦功能\n\n\nfunction eraseGrids(x, y) {\n  draw(x, y, eraseColor, 'rightClick');\n} // 网格上色\n\n\nfunction draw(x, y, c, e) {\n  for (var i = 0; i < initGridList.length; i++) {\n    if (x >= initGridList[i].x && y >= initGridList[i].y && x < initGridList[i].x + initGridList[i].wh && y < initGridList[i].y + initGridList[i].wh) {\n      var axisX = initGridList[i].x / (gridLayoutWH / gridNum);\n      var axisY = initGridList[i].y / (gridLayoutWH / gridNum); // 获取当前鼠标所在网格X，Y轴\n\n      currGridPosition.innerHTML = \"<span>X: \".concat(Math.ceil(axisX + 1), \",\\n        Y: \").concat(Math.ceil(axisY + 1), \"</span>\");\n\n      if (e === 'leftClick') {\n        initGridList[i].color = c;\n        initGridList[i].status = 1;\n        console.warn('initGridList', initGridList);\n      } else if (e === 'rightClick') {\n        // 当前点击网格行数 - 奇或偶\n        if (Math.ceil(axisY + 1) % 2 === 0) {\n          if (Math.ceil(axisX + 1) % 2 === 0) {\n            c = '#d9d9d9';\n          }\n        } else {\n          if (Math.ceil(axisX + 1) % 2 !== 0) {\n            c = '#d9d9d9';\n          }\n        }\n\n        initGridList[i].color = c;\n        initGridList[i].status = 0;\n      }\n\n      ctx.beginPath();\n      ctx.fillStyle = c; // ctx.moveTo(lastAxisX , lastAxisY)\n      // ctx.lineTo(axisX, axisY)\n\n      ctx.fillRect(axisX, axisY, wh, wh); // lastAxisX = axisX\n      // lastAxisY = axisY\n    }\n  }\n} // 监听鼠标在网格上移动\n\n\ncanvas.addEventListener('mousemove', function (e) {\n  handleEvent(e);\n}); // 监听鼠标移出网格\n\ncanvas.addEventListener('mouseout', function (e) {\n  clearHoverGrids(e);\n}); // 监听鼠标按键按下\n\ncanvas.addEventListener('mousedown', function (e) {\n  drawing = true;\n  handleEvent(e);\n}); // 监听鼠标按键松开\n\ncanvas.addEventListener('mouseup', function (e) {\n  drawing = false;\n}); //取消默认的浏览器自带右键菜单\n\ncanvas.oncontextmenu = function (e) {\n  e.preventDefault();\n};\n\nwindow.onbeforeunload = function (e) {\n  return '确定离开此页吗？';\n};\n\ngenerateInitialGrids();\ninitDrawingBoard(); // 画布尺寸控制\n\nvar currentSize = document.getElementById('current-size');\n\nfunction changeDrawSize(e) {\n  console.log(e.target.value);\n  var confirmTip = confirm(\"改变画板大小将会重置现有画板，确定吗?\");\n\n  if (confirmTip) {\n    gridNum = e.target.value;\n    clearHoverGrids();\n    generateInitialGrids();\n    initDrawingBoard();\n    canvasPreview();\n    initSizeOptions();\n  }\n}\n\ncurrentSize.addEventListener('change', changeDrawSize, false); // 颜色选择器\n\nvar colorsList = ['#faddd1', '#fad3d1', '#fad1e6', '#e5d1fa', '#d4d1fa', '#d1e3fa', '#d1f3fa', '#d1faf0', '#d1fad7', '#ebfad1', '#faf9d1', '#faefd1', '#fae6d1', '#f2e2d9', '#ffffff', '#f4b69c', '#f4a09c', '#f49cc8', '#c69cf4', '#a39cf4', '#9cc2f4', '#9ce5f4', '#9cf4df', '#9cf4a7', '#d4f49c', '#f4f19c', '#f4dc9c', '#f4c89c', '#e3c0ac', '#e4e4e4', '#ee8f66', '#ee6d66', '#ee66aa', '#a866ee', '#7166ee', '#66a1ee', '#66d7ee', '#66eece', '#66ee78', '#bcee66', '#eee966', '#eeca66', '#eeaa66', '#d59f80', '#b4b4b4', '#e86830', '#e83a30', '#e8308c', '#8930e8', '#4030e8', '#3080e8', '#30c9e8', '#30e8bd', '#30e849', '#a5e830', '#e8e230', '#e8b730', '#e88c30', '#c67d53', '#848484', '#c74b16', '#c71f16', '#c7166f', '#6c16c7', '#2516c7', '#1663c7', '#16a9c7', '#16c79e', '#16c72e', '#86c716', '#c7c116', '#c79816', '#c76f16', '#a66037', '#545454', '#913710', '#911710', '#911051', '#4f1091', '#1b1091', '#104891', '#107c91', '#109173', '#109121', '#629110', '#918d10', '#916f10', '#915110', '#794628', '#242424', '#5c230a', '#5c0e0a', '#5c0a33', '#320a5c', '#110a5c', '#0a2e5c', '#0a4e5c', '#0a5c49', '#0a5c15', '#3e5c0a', '#5c590a', '#5c460a', '#5c330a', '#4d2c19', '#000000'];\nvar colorsWrapper = document.getElementById('color-groups');\nvar currentInputColor = document.getElementById('current-color');\n\nfor (var _i = 0, _colorsList = colorsList; _i < _colorsList.length; _i++) {\n  var i = _colorsList[_i];\n  var colorItemStr = \"<a id=\\\"color-\".concat(i, \"\\\" name=\\\"\").concat(i, \"\\\" href=\\\"javascript:void(0)\\\" style=\\\"background: \").concat(i, \";\\\"></a>\");\n  var tempWrapper = document.createElement('li');\n  tempWrapper.innerHTML = colorItemStr;\n  colorsWrapper.append(tempWrapper);\n  var colorItem = document.getElementById(\"color-\".concat(i));\n  colorItem.addEventListener('click', changeDrawColor, false);\n}\n\nfunction changeDrawColor(e) {\n  if (e.type === 'click') {\n    currentInputColor.value = e.target.name;\n    drawingColor = e.target.name;\n  } else {\n    currentInputColor.value = e.target.value;\n    drawingColor = e.target.value;\n  }\n}\n\ncurrentInputColor.addEventListener('change', changeDrawColor, false); // 预览\n\nfunction canvasPreview() {\n  var canvasPreviewEl = document.createElement('canvas');\n  var ctxPreview = canvasPreviewEl.getContext('2d');\n  canvasPreviewEl.setAttribute('width', gridNum);\n  canvasPreviewEl.setAttribute('height', gridNum);\n\n  var _iterator2 = _createForOfIteratorHelper(initGridList),\n      _step2;\n\n  try {\n    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n      var grid = _step2.value;\n      ctxPreview.beginPath();\n\n      if (grid.status === 0) {\n        ctxPreview.fillStyle = '#fff';\n      } else {\n        ctxPreview.fillStyle = grid.color;\n      }\n\n      ctxPreview.fillRect(grid.x / (gridLayoutWH / gridNum), grid.y / (gridLayoutWH / gridNum), wh, wh);\n    }\n  } catch (err) {\n    _iterator2.e(err);\n  } finally {\n    _iterator2.f();\n  }\n\n  var previewImgEl = document.getElementById('preview-img');\n  var MIME_TYPE = \"image/png\";\n  var imgURL = canvasPreviewEl.toDataURL(MIME_TYPE, 1.0);\n  previewImgEl.src = imgURL;\n  localStorage.setItem('imgURL', imgURL);\n}\n\ncanvas.addEventListener('mousemove', function () {\n  if (drawing) {\n    canvasPreview();\n  }\n});\ncanvas.addEventListener('mousedown', function () {\n  if (drawing) {\n    canvasPreview();\n  }\n});\ncanvasPreview(); // 初始化导出图片尺寸选项\n\nfunction initSizeOptions() {\n  var imageSizeSelect = document.getElementById('imageSize');\n  imageSizeSelect.innerHTML = \"\";\n  var WH = gridNum;\n  var num = 20;\n\n  for (var _i2 = 1; _i2 < num + 1; _i2++) {\n    var optionStr = \"\".concat(_i2 * WH, \" x \").concat(_i2 * WH);\n    var imgOption = document.createElement('option');\n    imgOption.setAttribute('value', _i2 * WH);\n    imgOption.innerHTML = optionStr;\n    imageSizeSelect.append(imgOption);\n  }\n}\n\ninitSizeOptions(); // 保存\n\nfunction saveToImages() {\n  var imageSizeSelect = document.getElementById('imageSize');\n  var imgWH = imageSizeSelect.value;\n  var tempCanvasPreviewEl = document.createElement('canvas');\n  var tempCtxPreview = tempCanvasPreviewEl.getContext('2d');\n  tempCanvasPreviewEl.style.imageRendering = 'pixelated';\n  tempCanvasPreviewEl.setAttribute('width', imgWH);\n  tempCanvasPreviewEl.setAttribute('height', imgWH);\n  var tempInitGridList = initGridList.map(function (item) {\n    return {\n      x: item.x * (imgWH / gridNum),\n      y: item.y * (imgWH / gridNum),\n      wh: item.wh * (imgWH / gridNum),\n      color: item.color,\n      status: item.status\n    };\n  });\n\n  var _iterator3 = _createForOfIteratorHelper(tempInitGridList),\n      _step3;\n\n  try {\n    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n      var grid = _step3.value;\n      tempCtxPreview.beginPath();\n\n      if (grid.status === 0) {\n        tempCtxPreview.fillStyle = '#fff';\n      } else {\n        tempCtxPreview.fillStyle = grid.color;\n      }\n\n      tempCtxPreview.fillRect(grid.x / (gridLayoutWH / gridNum), grid.y / (gridLayoutWH / gridNum), wh * (imgWH / gridNum), wh * (imgWH / gridNum));\n    }\n  } catch (err) {\n    _iterator3.e(err);\n  } finally {\n    _iterator3.f();\n  }\n\n  var MIME_TYPE = \"image/png\";\n  var imgURL = tempCanvasPreviewEl.toDataURL(MIME_TYPE, 1.0);\n  var dlLink = document.createElement('a');\n  dlLink.download = 'pixel-picture.png';\n  dlLink.href = imgURL;\n  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');\n  document.body.appendChild(dlLink);\n  dlLink.click();\n  document.body.removeChild(dlLink);\n}\n\nvar saveToImageBtn = document.getElementById('saveToImage');\nsaveToImageBtn.addEventListener('click', saveToImages, false);\n\nfunction saveToBoxShadows() {\n  // box-shadow 每个像素块宽高\n  var preGridSize = document.getElementById('pre-grid-size');\n  var tempInitGridList = JSON.parse(JSON.stringify(initGridList));\n  var result = '';\n  var wh = preGridSize.value;\n  var transparentColor = '#00000000';\n\n  for (var _i3 = 0; _i3 < tempInitGridList.length; _i3++) {\n    if (tempInitGridList[_i3].status === 0) {\n      tempInitGridList[_i3].color = '#00000000';\n    }\n\n    var rowNum = Math.ceil((_i3 + 1) / gridNum);\n    var columnNum = (_i3 + 1) % gridNum === 0 ? gridNum : (_i3 + 1) % gridNum;\n    result += \"\".concat(wh * columnNum, \"px \").concat(wh * rowNum, \"px \").concat(tempInitGridList[_i3].color, \", \");\n  } // console.warn('result', result)\n\n\n  var boxShadowBtnEl = document.querySelector('.box-shadow-btns');\n  boxShadowBtnEl.setAttribute('data-clipboard-text', result);\n  new (clipboard__WEBPACK_IMPORTED_MODULE_0___default())('.box-shadow-btns');\n  alert('已复制到剪切板，请在需要使用的地方粘贴！'); // console.warn('btnCopy', btnCopy)\n}\n\nvar saveToBoxShadowBtn = document.getElementById('saveToBoxShadow');\nsaveToBoxShadowBtn.addEventListener('click', saveToBoxShadows, false);\n\n//# sourceURL=webpack://pixel-drawing-board/./src/js/main.js?");

/***/ }),

/***/ "./node_modules/clipboard/dist/clipboard.js":
/*!**************************************************!*\
  !*** ./node_modules/clipboard/dist/clipboard.js ***!
  \**************************************************/
/***/ (function(module) {

eval("/*!\n * clipboard.js v2.0.8\n * https://clipboardjs.com/\n *\n * Licensed MIT © Zeno Rocha\n */\n(function webpackUniversalModuleDefinition(root, factory) {\n\tif(true)\n\t\tmodule.exports = factory();\n\telse {}\n})(this, function() {\nreturn /******/ (function() { // webpackBootstrap\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ 134:\n/***/ (function(__unused_webpack_module, __webpack_exports__, __nested_webpack_require_622__) {\n\n\"use strict\";\n\n// EXPORTS\n__nested_webpack_require_622__.d(__webpack_exports__, {\n  \"default\": function() { return /* binding */ clipboard; }\n});\n\n// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js\nvar tiny_emitter = __nested_webpack_require_622__(279);\nvar tiny_emitter_default = /*#__PURE__*/__nested_webpack_require_622__.n(tiny_emitter);\n// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js\nvar listen = __nested_webpack_require_622__(370);\nvar listen_default = /*#__PURE__*/__nested_webpack_require_622__.n(listen);\n// EXTERNAL MODULE: ./node_modules/select/src/select.js\nvar src_select = __nested_webpack_require_622__(817);\nvar select_default = /*#__PURE__*/__nested_webpack_require_622__.n(src_select);\n;// CONCATENATED MODULE: ./src/clipboard-action.js\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n/**\n * Inner class which performs selection from either `text` or `target`\n * properties and then executes copy or cut operations.\n */\n\nvar ClipboardAction = /*#__PURE__*/function () {\n  /**\n   * @param {Object} options\n   */\n  function ClipboardAction(options) {\n    _classCallCheck(this, ClipboardAction);\n\n    this.resolveOptions(options);\n    this.initSelection();\n  }\n  /**\n   * Defines base properties passed from constructor.\n   * @param {Object} options\n   */\n\n\n  _createClass(ClipboardAction, [{\n    key: \"resolveOptions\",\n    value: function resolveOptions() {\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      this.action = options.action;\n      this.container = options.container;\n      this.emitter = options.emitter;\n      this.target = options.target;\n      this.text = options.text;\n      this.trigger = options.trigger;\n      this.selectedText = '';\n    }\n    /**\n     * Decides which selection strategy is going to be applied based\n     * on the existence of `text` and `target` properties.\n     */\n\n  }, {\n    key: \"initSelection\",\n    value: function initSelection() {\n      if (this.text) {\n        this.selectFake();\n      } else if (this.target) {\n        this.selectTarget();\n      }\n    }\n    /**\n     * Creates a fake textarea element, sets its value from `text` property,\n     */\n\n  }, {\n    key: \"createFakeElement\",\n    value: function createFakeElement() {\n      var isRTL = document.documentElement.getAttribute('dir') === 'rtl';\n      this.fakeElem = document.createElement('textarea'); // Prevent zooming on iOS\n\n      this.fakeElem.style.fontSize = '12pt'; // Reset box model\n\n      this.fakeElem.style.border = '0';\n      this.fakeElem.style.padding = '0';\n      this.fakeElem.style.margin = '0'; // Move element out of screen horizontally\n\n      this.fakeElem.style.position = 'absolute';\n      this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically\n\n      var yPosition = window.pageYOffset || document.documentElement.scrollTop;\n      this.fakeElem.style.top = \"\".concat(yPosition, \"px\");\n      this.fakeElem.setAttribute('readonly', '');\n      this.fakeElem.value = this.text;\n      return this.fakeElem;\n    }\n    /**\n     * Get's the value of fakeElem,\n     * and makes a selection on it.\n     */\n\n  }, {\n    key: \"selectFake\",\n    value: function selectFake() {\n      var _this = this;\n\n      var fakeElem = this.createFakeElement();\n\n      this.fakeHandlerCallback = function () {\n        return _this.removeFake();\n      };\n\n      this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;\n      this.container.appendChild(fakeElem);\n      this.selectedText = select_default()(fakeElem);\n      this.copyText();\n      this.removeFake();\n    }\n    /**\n     * Only removes the fake element after another click event, that way\n     * a user can hit `Ctrl+C` to copy because selection still exists.\n     */\n\n  }, {\n    key: \"removeFake\",\n    value: function removeFake() {\n      if (this.fakeHandler) {\n        this.container.removeEventListener('click', this.fakeHandlerCallback);\n        this.fakeHandler = null;\n        this.fakeHandlerCallback = null;\n      }\n\n      if (this.fakeElem) {\n        this.container.removeChild(this.fakeElem);\n        this.fakeElem = null;\n      }\n    }\n    /**\n     * Selects the content from element passed on `target` property.\n     */\n\n  }, {\n    key: \"selectTarget\",\n    value: function selectTarget() {\n      this.selectedText = select_default()(this.target);\n      this.copyText();\n    }\n    /**\n     * Executes the copy operation based on the current selection.\n     */\n\n  }, {\n    key: \"copyText\",\n    value: function copyText() {\n      var succeeded;\n\n      try {\n        succeeded = document.execCommand(this.action);\n      } catch (err) {\n        succeeded = false;\n      }\n\n      this.handleResult(succeeded);\n    }\n    /**\n     * Fires an event based on the copy operation result.\n     * @param {Boolean} succeeded\n     */\n\n  }, {\n    key: \"handleResult\",\n    value: function handleResult(succeeded) {\n      this.emitter.emit(succeeded ? 'success' : 'error', {\n        action: this.action,\n        text: this.selectedText,\n        trigger: this.trigger,\n        clearSelection: this.clearSelection.bind(this)\n      });\n    }\n    /**\n     * Moves focus away from `target` and back to the trigger, removes current selection.\n     */\n\n  }, {\n    key: \"clearSelection\",\n    value: function clearSelection() {\n      if (this.trigger) {\n        this.trigger.focus();\n      }\n\n      document.activeElement.blur();\n      window.getSelection().removeAllRanges();\n    }\n    /**\n     * Sets the `action` to be performed which can be either 'copy' or 'cut'.\n     * @param {String} action\n     */\n\n  }, {\n    key: \"destroy\",\n\n    /**\n     * Destroy lifecycle.\n     */\n    value: function destroy() {\n      this.removeFake();\n    }\n  }, {\n    key: \"action\",\n    set: function set() {\n      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';\n      this._action = action;\n\n      if (this._action !== 'copy' && this._action !== 'cut') {\n        throw new Error('Invalid \"action\" value, use either \"copy\" or \"cut\"');\n      }\n    }\n    /**\n     * Gets the `action` property.\n     * @return {String}\n     */\n    ,\n    get: function get() {\n      return this._action;\n    }\n    /**\n     * Sets the `target` property using an element\n     * that will be have its content copied.\n     * @param {Element} target\n     */\n\n  }, {\n    key: \"target\",\n    set: function set(target) {\n      if (target !== undefined) {\n        if (target && _typeof(target) === 'object' && target.nodeType === 1) {\n          if (this.action === 'copy' && target.hasAttribute('disabled')) {\n            throw new Error('Invalid \"target\" attribute. Please use \"readonly\" instead of \"disabled\" attribute');\n          }\n\n          if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {\n            throw new Error('Invalid \"target\" attribute. You can\\'t cut text from elements with \"readonly\" or \"disabled\" attributes');\n          }\n\n          this._target = target;\n        } else {\n          throw new Error('Invalid \"target\" value, use a valid Element');\n        }\n      }\n    }\n    /**\n     * Gets the `target` property.\n     * @return {String|HTMLElement}\n     */\n    ,\n    get: function get() {\n      return this._target;\n    }\n  }]);\n\n  return ClipboardAction;\n}();\n\n/* harmony default export */ var clipboard_action = (ClipboardAction);\n;// CONCATENATED MODULE: ./src/clipboard.js\nfunction clipboard_typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return clipboard_typeof(obj); }\n\nfunction clipboard_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction clipboard_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction clipboard_createClass(Constructor, protoProps, staticProps) { if (protoProps) clipboard_defineProperties(Constructor.prototype, protoProps); if (staticProps) clipboard_defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n/**\n * Helper function to retrieve attribute value.\n * @param {String} suffix\n * @param {Element} element\n */\n\nfunction getAttributeValue(suffix, element) {\n  var attribute = \"data-clipboard-\".concat(suffix);\n\n  if (!element.hasAttribute(attribute)) {\n    return;\n  }\n\n  return element.getAttribute(attribute);\n}\n/**\n * Base class which takes one or more elements, adds event listeners to them,\n * and instantiates a new `ClipboardAction` on each click.\n */\n\n\nvar Clipboard = /*#__PURE__*/function (_Emitter) {\n  _inherits(Clipboard, _Emitter);\n\n  var _super = _createSuper(Clipboard);\n\n  /**\n   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger\n   * @param {Object} options\n   */\n  function Clipboard(trigger, options) {\n    var _this;\n\n    clipboard_classCallCheck(this, Clipboard);\n\n    _this = _super.call(this);\n\n    _this.resolveOptions(options);\n\n    _this.listenClick(trigger);\n\n    return _this;\n  }\n  /**\n   * Defines if attributes would be resolved using internal setter functions\n   * or custom functions that were passed in the constructor.\n   * @param {Object} options\n   */\n\n\n  clipboard_createClass(Clipboard, [{\n    key: \"resolveOptions\",\n    value: function resolveOptions() {\n      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;\n      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;\n      this.text = typeof options.text === 'function' ? options.text : this.defaultText;\n      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;\n    }\n    /**\n     * Adds a click event listener to the passed trigger.\n     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger\n     */\n\n  }, {\n    key: \"listenClick\",\n    value: function listenClick(trigger) {\n      var _this2 = this;\n\n      this.listener = listen_default()(trigger, 'click', function (e) {\n        return _this2.onClick(e);\n      });\n    }\n    /**\n     * Defines a new `ClipboardAction` on each click event.\n     * @param {Event} e\n     */\n\n  }, {\n    key: \"onClick\",\n    value: function onClick(e) {\n      var trigger = e.delegateTarget || e.currentTarget;\n\n      if (this.clipboardAction) {\n        this.clipboardAction = null;\n      }\n\n      this.clipboardAction = new clipboard_action({\n        action: this.action(trigger),\n        target: this.target(trigger),\n        text: this.text(trigger),\n        container: this.container,\n        trigger: trigger,\n        emitter: this\n      });\n    }\n    /**\n     * Default `action` lookup function.\n     * @param {Element} trigger\n     */\n\n  }, {\n    key: \"defaultAction\",\n    value: function defaultAction(trigger) {\n      return getAttributeValue('action', trigger);\n    }\n    /**\n     * Default `target` lookup function.\n     * @param {Element} trigger\n     */\n\n  }, {\n    key: \"defaultTarget\",\n    value: function defaultTarget(trigger) {\n      var selector = getAttributeValue('target', trigger);\n\n      if (selector) {\n        return document.querySelector(selector);\n      }\n    }\n    /**\n     * Returns the support of the given action, or all actions if no action is\n     * given.\n     * @param {String} [action]\n     */\n\n  }, {\n    key: \"defaultText\",\n\n    /**\n     * Default `text` lookup function.\n     * @param {Element} trigger\n     */\n    value: function defaultText(trigger) {\n      return getAttributeValue('text', trigger);\n    }\n    /**\n     * Destroy lifecycle.\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.listener.destroy();\n\n      if (this.clipboardAction) {\n        this.clipboardAction.destroy();\n        this.clipboardAction = null;\n      }\n    }\n  }], [{\n    key: \"isSupported\",\n    value: function isSupported() {\n      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];\n      var actions = typeof action === 'string' ? [action] : action;\n      var support = !!document.queryCommandSupported;\n      actions.forEach(function (action) {\n        support = support && !!document.queryCommandSupported(action);\n      });\n      return support;\n    }\n  }]);\n\n  return Clipboard;\n}((tiny_emitter_default()));\n\n/* harmony default export */ var clipboard = (Clipboard);\n\n/***/ }),\n\n/***/ 828:\n/***/ (function(module) {\n\nvar DOCUMENT_NODE_TYPE = 9;\n\n/**\n * A polyfill for Element.matches()\n */\nif (typeof Element !== 'undefined' && !Element.prototype.matches) {\n    var proto = Element.prototype;\n\n    proto.matches = proto.matchesSelector ||\n                    proto.mozMatchesSelector ||\n                    proto.msMatchesSelector ||\n                    proto.oMatchesSelector ||\n                    proto.webkitMatchesSelector;\n}\n\n/**\n * Finds the closest parent that matches a selector.\n *\n * @param {Element} element\n * @param {String} selector\n * @return {Function}\n */\nfunction closest (element, selector) {\n    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {\n        if (typeof element.matches === 'function' &&\n            element.matches(selector)) {\n          return element;\n        }\n        element = element.parentNode;\n    }\n}\n\nmodule.exports = closest;\n\n\n/***/ }),\n\n/***/ 438:\n/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_17417__) {\n\nvar closest = __nested_webpack_require_17417__(828);\n\n/**\n * Delegates event to a selector.\n *\n * @param {Element} element\n * @param {String} selector\n * @param {String} type\n * @param {Function} callback\n * @param {Boolean} useCapture\n * @return {Object}\n */\nfunction _delegate(element, selector, type, callback, useCapture) {\n    var listenerFn = listener.apply(this, arguments);\n\n    element.addEventListener(type, listenerFn, useCapture);\n\n    return {\n        destroy: function() {\n            element.removeEventListener(type, listenerFn, useCapture);\n        }\n    }\n}\n\n/**\n * Delegates event to a selector.\n *\n * @param {Element|String|Array} [elements]\n * @param {String} selector\n * @param {String} type\n * @param {Function} callback\n * @param {Boolean} useCapture\n * @return {Object}\n */\nfunction delegate(elements, selector, type, callback, useCapture) {\n    // Handle the regular Element usage\n    if (typeof elements.addEventListener === 'function') {\n        return _delegate.apply(null, arguments);\n    }\n\n    // Handle Element-less usage, it defaults to global delegation\n    if (typeof type === 'function') {\n        // Use `document` as the first parameter, then apply arguments\n        // This is a short way to .unshift `arguments` without running into deoptimizations\n        return _delegate.bind(null, document).apply(null, arguments);\n    }\n\n    // Handle Selector-based usage\n    if (typeof elements === 'string') {\n        elements = document.querySelectorAll(elements);\n    }\n\n    // Handle Array-like based usage\n    return Array.prototype.map.call(elements, function (element) {\n        return _delegate(element, selector, type, callback, useCapture);\n    });\n}\n\n/**\n * Finds closest match and invokes callback.\n *\n * @param {Element} element\n * @param {String} selector\n * @param {String} type\n * @param {Function} callback\n * @return {Function}\n */\nfunction listener(element, selector, type, callback) {\n    return function(e) {\n        e.delegateTarget = closest(e.target, selector);\n\n        if (e.delegateTarget) {\n            callback.call(element, e);\n        }\n    }\n}\n\nmodule.exports = delegate;\n\n\n/***/ }),\n\n/***/ 879:\n/***/ (function(__unused_webpack_module, exports) {\n\n/**\n * Check if argument is a HTML element.\n *\n * @param {Object} value\n * @return {Boolean}\n */\nexports.node = function(value) {\n    return value !== undefined\n        && value instanceof HTMLElement\n        && value.nodeType === 1;\n};\n\n/**\n * Check if argument is a list of HTML elements.\n *\n * @param {Object} value\n * @return {Boolean}\n */\nexports.nodeList = function(value) {\n    var type = Object.prototype.toString.call(value);\n\n    return value !== undefined\n        && (type === '[object NodeList]' || type === '[object HTMLCollection]')\n        && ('length' in value)\n        && (value.length === 0 || exports.node(value[0]));\n};\n\n/**\n * Check if argument is a string.\n *\n * @param {Object} value\n * @return {Boolean}\n */\nexports.string = function(value) {\n    return typeof value === 'string'\n        || value instanceof String;\n};\n\n/**\n * Check if argument is a function.\n *\n * @param {Object} value\n * @return {Boolean}\n */\nexports.fn = function(value) {\n    var type = Object.prototype.toString.call(value);\n\n    return type === '[object Function]';\n};\n\n\n/***/ }),\n\n/***/ 370:\n/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_20781__) {\n\nvar is = __nested_webpack_require_20781__(879);\nvar delegate = __nested_webpack_require_20781__(438);\n\n/**\n * Validates all params and calls the right\n * listener function based on its target type.\n *\n * @param {String|HTMLElement|HTMLCollection|NodeList} target\n * @param {String} type\n * @param {Function} callback\n * @return {Object}\n */\nfunction listen(target, type, callback) {\n    if (!target && !type && !callback) {\n        throw new Error('Missing required arguments');\n    }\n\n    if (!is.string(type)) {\n        throw new TypeError('Second argument must be a String');\n    }\n\n    if (!is.fn(callback)) {\n        throw new TypeError('Third argument must be a Function');\n    }\n\n    if (is.node(target)) {\n        return listenNode(target, type, callback);\n    }\n    else if (is.nodeList(target)) {\n        return listenNodeList(target, type, callback);\n    }\n    else if (is.string(target)) {\n        return listenSelector(target, type, callback);\n    }\n    else {\n        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');\n    }\n}\n\n/**\n * Adds an event listener to a HTML element\n * and returns a remove listener function.\n *\n * @param {HTMLElement} node\n * @param {String} type\n * @param {Function} callback\n * @return {Object}\n */\nfunction listenNode(node, type, callback) {\n    node.addEventListener(type, callback);\n\n    return {\n        destroy: function() {\n            node.removeEventListener(type, callback);\n        }\n    }\n}\n\n/**\n * Add an event listener to a list of HTML elements\n * and returns a remove listener function.\n *\n * @param {NodeList|HTMLCollection} nodeList\n * @param {String} type\n * @param {Function} callback\n * @return {Object}\n */\nfunction listenNodeList(nodeList, type, callback) {\n    Array.prototype.forEach.call(nodeList, function(node) {\n        node.addEventListener(type, callback);\n    });\n\n    return {\n        destroy: function() {\n            Array.prototype.forEach.call(nodeList, function(node) {\n                node.removeEventListener(type, callback);\n            });\n        }\n    }\n}\n\n/**\n * Add an event listener to a selector\n * and returns a remove listener function.\n *\n * @param {String} selector\n * @param {String} type\n * @param {Function} callback\n * @return {Object}\n */\nfunction listenSelector(selector, type, callback) {\n    return delegate(document.body, selector, type, callback);\n}\n\nmodule.exports = listen;\n\n\n/***/ }),\n\n/***/ 817:\n/***/ (function(module) {\n\nfunction select(element) {\n    var selectedText;\n\n    if (element.nodeName === 'SELECT') {\n        element.focus();\n\n        selectedText = element.value;\n    }\n    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {\n        var isReadOnly = element.hasAttribute('readonly');\n\n        if (!isReadOnly) {\n            element.setAttribute('readonly', '');\n        }\n\n        element.select();\n        element.setSelectionRange(0, element.value.length);\n\n        if (!isReadOnly) {\n            element.removeAttribute('readonly');\n        }\n\n        selectedText = element.value;\n    }\n    else {\n        if (element.hasAttribute('contenteditable')) {\n            element.focus();\n        }\n\n        var selection = window.getSelection();\n        var range = document.createRange();\n\n        range.selectNodeContents(element);\n        selection.removeAllRanges();\n        selection.addRange(range);\n\n        selectedText = selection.toString();\n    }\n\n    return selectedText;\n}\n\nmodule.exports = select;\n\n\n/***/ }),\n\n/***/ 279:\n/***/ (function(module) {\n\nfunction E () {\n  // Keep this empty so it's easier to inherit from\n  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)\n}\n\nE.prototype = {\n  on: function (name, callback, ctx) {\n    var e = this.e || (this.e = {});\n\n    (e[name] || (e[name] = [])).push({\n      fn: callback,\n      ctx: ctx\n    });\n\n    return this;\n  },\n\n  once: function (name, callback, ctx) {\n    var self = this;\n    function listener () {\n      self.off(name, listener);\n      callback.apply(ctx, arguments);\n    };\n\n    listener._ = callback\n    return this.on(name, listener, ctx);\n  },\n\n  emit: function (name) {\n    var data = [].slice.call(arguments, 1);\n    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();\n    var i = 0;\n    var len = evtArr.length;\n\n    for (i; i < len; i++) {\n      evtArr[i].fn.apply(evtArr[i].ctx, data);\n    }\n\n    return this;\n  },\n\n  off: function (name, callback) {\n    var e = this.e || (this.e = {});\n    var evts = e[name];\n    var liveEvents = [];\n\n    if (evts && callback) {\n      for (var i = 0, len = evts.length; i < len; i++) {\n        if (evts[i].fn !== callback && evts[i].fn._ !== callback)\n          liveEvents.push(evts[i]);\n      }\n    }\n\n    // Remove event from queue to prevent memory leak\n    // Suggested by https://github.com/lazd\n    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910\n\n    (liveEvents.length)\n      ? e[name] = liveEvents\n      : delete e[name];\n\n    return this;\n  }\n};\n\nmodule.exports = E;\nmodule.exports.TinyEmitter = E;\n\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_26163__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(__webpack_module_cache__[moduleId]) {\n/******/ \t\t\treturn __webpack_module_cache__[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_26163__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/compat get default export */\n/******/ \t!function() {\n/******/ \t\t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t\t__nested_webpack_require_26163__.n = function(module) {\n/******/ \t\t\tvar getter = module && module.__esModule ?\n/******/ \t\t\t\tfunction() { return module['default']; } :\n/******/ \t\t\t\tfunction() { return module; };\n/******/ \t\t\t__nested_webpack_require_26163__.d(getter, { a: getter });\n/******/ \t\t\treturn getter;\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t!function() {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__nested_webpack_require_26163__.d = function(exports, definition) {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__nested_webpack_require_26163__.o(definition, key) && !__nested_webpack_require_26163__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t!function() {\n/******/ \t\t__nested_webpack_require_26163__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n/******/ \t}();\n/******/ \t\n/************************************************************************/\n/******/ \t// module exports must be returned from runtime so entry inlining is disabled\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \treturn __nested_webpack_require_26163__(134);\n/******/ })()\n.default;\n});\n\n//# sourceURL=webpack://pixel-drawing-board/./node_modules/clipboard/dist/clipboard.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.css":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.css ***!
  \**************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* pixel drawing board css */\\n* {\\n  padding: 0;\\n  margin: 0; }\\n\\nhtml, body {\\n  height: 100%;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  background-color: black;\\n  font-size: 16px;\\n  font-family: Consolas, \\\"Liberation Mono\\\", Menlo, Monaco, \\\"Source Han Sans CN\\\", \\\"PingFang SC\\\", \\\"Hiragino Sans GB\\\", \\\"Microsoft YaHei\\\", sans-serif; }\\n\\n.app-content {\\n  position: relative;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  height: 100%;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center;\\n  overflow: hidden; }\\n\\n.misc-wrapper-center {\\n  height: 100%;\\n  overflow: auto;\\n  margin: 20px;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: center;\\n      -ms-flex-pack: center;\\n          justify-content: center;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center; }\\n\\n.drawing-board-wrapper {\\n  max-width: 937px;\\n  max-height: 937px;\\n  -ms-flex-negative: 0;\\n      flex-shrink: 0; }\\n\\n.curr-grid-position {\\n  height: 20px;\\n  line-height: 20px; }\\n\\n#drawing-board {\\n  width: 100%;\\n  height: 100%;\\n  -ms-interpolation-mode: nearest-neighbor;\\n      image-rendering: -webkit-optimize-contrast;\\n      image-rendering: -moz-crisp-edges;\\n      image-rendering: -o-pixelated;\\n      image-rendering: pixelated;\\n  border: 0; }\\n\\n.misc-wrapper-left {\\n  height: 100%;\\n  width: 200px;\\n  background-color: #fff;\\n  -ms-flex-negative: 0;\\n      flex-shrink: 0;\\n  -ms-flex-preferred-size: 200px;\\n      flex-basis: 200px; }\\n\\n.misc-wrapper-right {\\n  height: 100%;\\n  width: 260px;\\n  background-color: #fff;\\n  -ms-flex-negative: 0;\\n      flex-shrink: 0;\\n  -ms-flex-preferred-size: 260px;\\n      flex-basis: 260px;\\n  overflow: auto; }\\n\\n.drawing-board-setup,\\n.thickness-setup,\\n.color-picker,\\n.downloads,\\n.preview {\\n  padding: 10px; }\\n\\n/* .drawing-board-setup .input-wrapper,\\n.thickness-setup .input-wrapper,\\n.color-picker .input-wrapper {\\n  margin-bottom: 10px;\\n} */\\n.drawing-board-setup .input-wrapper:nth-last-child(1),\\n.thickness-setup .input-wrapper:nth-last-child(1) {\\n  margin-bottom: 0; }\\n\\n.input-wrapper label {\\n  font-weight: 600;\\n  font-size: 1.125rem;\\n  display: inline-block;\\n  padding-bottom: 10px; }\\n\\n.input-wrapper input {\\n  display: inline-block;\\n  border: 3px solid #fff;\\n  border-radius: 5px;\\n  outline: 0;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box; }\\n\\n.input-wrapper input[type=\\\"number\\\"],\\n.input-wrapper input[type=\\\"range\\\"] {\\n  width: 100%;\\n  height: 35px;\\n  padding: 5px;\\n  font-size: 1rem;\\n  background-color: #eee;\\n  -webkit-transition: background-color 0.3s ease;\\n  transition: background-color 0.3s ease; }\\n\\n.input-wrapper input[type=\\\"range\\\"] {\\n  padding: 0; }\\n\\n.input-wrapper input[type=\\\"number\\\"]:hover,\\n.input-wrapper input[type=\\\"range\\\"]:focus {\\n  background-color: #fff;\\n  border: 3px solid #dfdfdf; }\\n\\n.color-picker ul {\\n  font-size: 0; }\\n\\n.color-picker ul li {\\n  display: inline;\\n  list-style-type: none; }\\n\\n.color-picker ul li a {\\n  display: inline-block;\\n  width: 6.66666667%;\\n  height: 15px;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box; }\\n\\n.color-picker ul li a:hover {\\n  -webkit-transform: scale(1.5);\\n          transform: scale(1.5); }\\n\\n.downloads .title,\\n.preview .title {\\n  font-weight: 600;\\n  font-size: 1.125rem;\\n  padding-bottom: 10px; }\\n\\n.download-btns, .box-shadow-btns {\\n  padding: 5px;\\n  border-radius: 5px;\\n  font-size: 1rem;\\n  height: 35px;\\n  border: 3px solid #fff;\\n  outline: 0;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  cursor: pointer;\\n  -webkit-transition: background-color 0.3s ease;\\n  transition: background-color 0.3s ease; }\\n\\n.download-btns:hover, .box-shadow-btns:hover {\\n  background-color: #fff;\\n  border: 3px solid #dfdfdf; }\\n\\n.preview-content {\\n  width: 100%;\\n  height: 150px;\\n  background-color: #000;\\n  position: relative; }\\n\\n.preview-content img {\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  -webkit-transform: translate(-50%, -50%);\\n          transform: translate(-50%, -50%);\\n  height: 140px;\\n  width: 140px;\\n  -ms-interpolation-mode: nearest-neighbor;\\n      image-rendering: -webkit-optimize-contrast;\\n      image-rendering: -moz-crisp-edges;\\n      image-rendering: -o-pixelated;\\n      image-rendering: pixelated; }\\n\\n.save-as-image-wrapper {\\n  padding-bottom: 10px; }\\n\\n.save-as-image-wrapper label,\\n.save-as-box-shadow-wrapper label {\\n  font-weight: 600;\\n  font-size: 1rem;\\n  display: inline-block;\\n  padding-bottom: 6px; }\\n\\n.save-as-image-wrapper select,\\n.save-as-box-shadow-wrapper select {\\n  display: inline-block;\\n  border: 3px solid #fff;\\n  border-radius: 5px;\\n  outline: 0;\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n  width: 100%;\\n  height: 35px;\\n  padding: 5px;\\n  font-size: 1rem;\\n  background-color: #eee;\\n  -webkit-transition: background-color 0.3s ease;\\n  transition: background-color 0.3s ease; }\\n\\n.save-as-image-wrapper select:hover,\\n.save-as-box-shadow-wrapper select:hover {\\n  background-color: #fff;\\n  border: 3px solid #dfdfdf; }\\n\\n.save-as-image-wrapper-content,\\n.save-as-box-shadow-wrapper-content {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-pack: justify;\\n      -ms-flex-pack: justify;\\n          justify-content: space-between;\\n  -webkit-box-align: center;\\n      -ms-flex-align: center;\\n          align-items: center; }\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://pixel-drawing-board/./src/css/style.css?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === \"string\") {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, \"\"]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://pixel-drawing-board/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\nif (true) {\n  if (!_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (isNamedExport && p === 'default') {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (isNamedExport && p === 'default') {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals;\n\n    module.hot.accept(\n      /*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.css\",\n      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.css\");\n(function () {\n        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals, undefined)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals;\n\n              update(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack://pixel-drawing-board/./src/css/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://pixel-drawing-board/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("app." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("3c0121576fac1ffec2c9")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "pixel-drawing-board:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatepixel_drawing_board"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;