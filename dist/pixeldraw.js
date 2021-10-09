(()=>{"use strict";var e,r,n={738:(e,r,n)=>{var t="pixel-drawing",o=document.documentElement.clientHeight,i=o-100;function a(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function c(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function l(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var s=function(){function e(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";c(this,e),"string"==typeof r?(this.el=document.createElement(r),this.el.className=n):this.el=r}var r,n;return r=e,n=[{key:"children",value:function(){for(var e=this,r=arguments.length,n=new Array(r),t=0;t<r;t++)n[t]=arguments[t];return 0===arguments.length?this.el.childNodes:(n.forEach((function(r){return e.child(r)})),this)}},{key:"child",value:function(r){var n=r;return"string"==typeof r?n=document.createTextNode(r):r instanceof e&&(n=r.el),this.el.appendChild(n),this}},{key:"on",value:function(e,r){var n,t=function(e){if(Array.isArray(e))return e}(n=e.split("."))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,r){if(e){if("string"==typeof e)return a(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,r):void 0}}(n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=t[0],i=t.slice(1),c=o;return"mousewheel"===c&&/Firefox/i.test(window.navigator.userAgent)&&(c="DOMMouseScroll"),this.el.addEventListener(c,(function(e){r(e);for(var n=0;n<i.length;n+=1){var t=i[n];if("left"===t&&0!==e.button)return;if("right"===t&&2!==e.button)return;"stop"===t&&e.stopPropagation()}})),this}}],n&&l(r.prototype,n),e}(),d=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return new s(e,r)},u=[];function f(){var e="#ffffff",r=0;if(0!==u.length)return u;for(var n=0;n<8;n++)for(var t=0;t<8;t++)r++,e=n%2==0?r%2==0?"#ffffff":"#d9d9d9":r%2==0?"#d9d9d9":"#ffffff",u.push({x:i/8*t,y:i/8*n,wh:i/8,color:e,status:0});return u}function p(e,r,n,t,o){e.beginPath(),e.fillStyle=t,e.fillRect(r,n,o,o)}function h(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function b(e,r){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,r){if(e){if("string"==typeof e)return g(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){n&&(e=n);var t=0,o=function(){};return{s:o,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw i}}}}function g(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}var m=!1;function v(){var e,r=this.ctx,n=b(f());try{for(n.s();!(e=n.n()).done;){var t=e.value;p(r,t.x/(i/8),t.y/(i/8),t.color,1)}}catch(e){n.e(e)}finally{n.f()}}function y(e){var r,n=this.ctx,t=e.offsetX,o=e.offsetY,a="rgb(56 56 56 / 40%)",c=b(f());try{for(c.s();!(r=c.n()).done;){var l=r.value;if(t>=l.x&&o>=l.y&&t<l.x+l.wh&&o<l.y+l.wh){var s=l.x/(i/8),d=l.y/(i/8);m?1===e.buttons?(a=l.color="#000000",l.status=1):2===e.buttons&&(a="#ffffff",Math.ceil(d+1)%2==0?Math.ceil(s+1)%2==0&&(a="#d9d9d9"):Math.ceil(s+1)%2!=0&&(a="#d9d9d9"),l.color=a,l.status=0):w.call(this),n.beginPath(),n.fillStyle=a,n.fillRect(s,d,1,1)}}}catch(e){c.e(e)}finally{c.f()}}function w(){var e=this.ctx;m||(e.clearRect(0,0,8,8),v.call(this))}function x(){var e=this;this.target.on("mousemove",(function(r){y.call(e,r)})).on("mouseout",(function(r){w.call(e),m=!1})).on("mousedown",(function(r){m=!0,y.call(e,r)})).on("mouseup",(function(e){m=!1}))}var k=function(){function e(r){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.target=r,this.el=r.el,this.ctx=this.el.getContext("2d"),this.resize(),v.call(this),x.call(this)}var r,n;return r=e,(n=[{key:"resize",value:function(){this.el.width=8,this.el.height=8}},{key:"showCoordinates",value:function(){}}])&&h(r.prototype,n),e}();function E(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var j=function(){function e(r){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=d("div","".concat(t,"-board")),this.resize(this.el),r.children(this.el),this.canvasEl=d("canvas","".concat(t,"-board-canvas")),this.el.children(this.canvasEl),this.pixel=new k(this.canvasEl)}var r,n;return r=e,(n=[{key:"resize",value:function(e){e.el.style.width="".concat(i,"px"),e.el.style.height="".concat(i,"px")}}])&&E(r.prototype,n),e}();function _(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function I(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}n(51);var S=function(){function e(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_(this,e);var o=r;this.options=n,"string"==typeof r&&(o=document.querySelector(r));var i=d("div",t).on("contextmenu",(function(e){return e.preventDefault()}));this.resize(i.el),o.appendChild(i.el),this.board=new j(i)}var r,n;return r=e,(n=[{key:"resize",value:function(e){e.style.height="".concat(o,"px")}}])&&I(r.prototype,n),e}();window&&(window.x_pixeldrawing=function(e){return new S(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})})},137:(e,r,n)=>{n.r(r),n.d(r,{default:()=>i});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,'*{padding:0;margin:0}html,body{height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:black;font-size:16px;font-family:Consolas, "Liberation Mono", Menlo, Monaco, "Source Han Sans CN", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif}.app-content{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;overflow:hidden}.app-content .misc-wrapper-left{height:100%;width:200px;background-color:#fff;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:200px;flex-basis:200px}.app-content .misc-wrapper-left .curr-grid-position{height:20px;line-height:20px}.app-content .misc-wrapper-center{height:100%;overflow:auto;margin:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.app-content .misc-wrapper-center .drawing-board-wrapper{max-width:937px;max-height:937px;-ms-flex-negative:0;flex-shrink:0}.app-content .misc-wrapper-center .drawing-board-wrapper #drawing-board{width:100%;height:100%;-ms-interpolation-mode:nearest-neighbor;image-rendering:-webkit-optimize-contrast;image-rendering:-moz-crisp-edges;image-rendering:-o-pixelated;image-rendering:pixelated;border:0}.misc-wrapper-right{height:100%;width:260px;background-color:#fff;-ms-flex-negative:0;flex-shrink:0;-ms-flex-preferred-size:260px;flex-basis:260px;overflow:auto}.misc-wrapper-right .wrapper-right-item{padding:10px}.drawing-board-setup .input-wrapper:nth-last-child(1),.thickness-setup .input-wrapper:nth-last-child(1){margin-bottom:0}.input-wrapper label{font-weight:600;font-size:1.125rem;display:inline-block;padding-bottom:10px}.input-wrapper input{display:inline-block;border:3px solid #fff;border-radius:5px;outline:0;-webkit-box-sizing:border-box;box-sizing:border-box}.input-wrapper input[type="number"],.input-wrapper input[type="range"]{width:100%;height:35px;padding:5px;font-size:1rem;background-color:#eee;-webkit-transition:background-color 0.3s ease;transition:background-color 0.3s ease}.input-wrapper input[type="range"]{padding:0}.input-wrapper input[type="number"]:hover,.input-wrapper input[type="range"]:focus{background-color:#fff;border:3px solid #dfdfdf}.color-picker ul{font-size:0}.color-picker ul li{display:inline;list-style-type:none}.color-picker ul li a{display:inline-block;width:6.66666667%;height:15px;-webkit-box-sizing:border-box;box-sizing:border-box}.color-picker ul li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}.downloads .title,.preview .title{font-weight:600;font-size:1.125rem;padding-bottom:10px}.download-btns,.box-shadow-btns{padding:5px;border-radius:5px;font-size:1rem;height:35px;border:3px solid #fff;outline:0;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;-webkit-transition:background-color 0.3s ease;transition:background-color 0.3s ease}.download-btns:hover,.box-shadow-btns:hover{background-color:#fff;border:3px solid #dfdfdf}.preview-content{width:100%;height:150px;background-color:#000;position:relative}.preview-content img{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);height:140px;width:140px;-ms-interpolation-mode:nearest-neighbor;image-rendering:-webkit-optimize-contrast;image-rendering:-moz-crisp-edges;image-rendering:-o-pixelated;image-rendering:pixelated}.save-as-image-wrapper{padding-bottom:10px}.save-as-image-wrapper label,.save-as-box-shadow-wrapper label{font-weight:600;font-size:1rem;display:inline-block;padding-bottom:6px}.save-as-image-wrapper select,.save-as-box-shadow-wrapper select{display:inline-block;border:3px solid #fff;border-radius:5px;outline:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:35px;padding:5px;font-size:1rem;background-color:#eee;-webkit-transition:background-color 0.3s ease;transition:background-color 0.3s ease}.save-as-image-wrapper select:hover,.save-as-box-shadow-wrapper select:hover{background-color:#fff;border:3px solid #dfdfdf}.save-as-image-wrapper-content,.save-as-box-shadow-wrapper-content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.pixel-drawing{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.pixel-drawing .pixel-drawing-board-canvas{width:100%;height:100%;-ms-interpolation-mode:nearest-neighbor;image-rendering:-webkit-optimize-contrast;image-rendering:-moz-crisp-edges;image-rendering:-o-pixelated;image-rendering:pixelated;border:0}\n',""]);const i=o},645:e=>{e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n=e(r);return r[2]?"@media ".concat(r[2]," {").concat(n,"}"):n})).join("")},r.i=function(e,n,t){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(t)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);t&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),r.push(l))}},r}},51:(e,r,n)=>{var t=n(379),o=n.n(t),i=n(137),a=o()(i.default,{insert:"head",singleton:!1});if(!i.default.locals||e.hot.invalidate){var c=i.default.locals;e.hot.accept(137,(r=>{i=n(137),function(e,r,n){if(!e&&r||e&&!r)return!1;var t;for(t in e)if(e[t]!==r[t])return!1;for(t in r)if(!e[t])return!1;return!0}(c,i.default.locals)?(c=i.default.locals,a(i.default)):e.hot.invalidate()}))}e.hot.dispose((function(){a()})),i.default.locals},379:(e,r,n)=>{var t,o=function(){var e={};return function(r){if(void 0===e[r]){var n=document.querySelector(r);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[r]=n}return e[r]}}(),i=[];function a(e){for(var r=-1,n=0;n<i.length;n++)if(i[n].identifier===e){r=n;break}return r}function c(e,r){for(var n={},t=[],o=0;o<e.length;o++){var c=e[o],l=r.base?c[0]+r.base:c[0],s=n[l]||0,d="".concat(l," ").concat(s);n[l]=s+1;var u=a(d),f={css:c[1],media:c[2],sourceMap:c[3]};-1!==u?(i[u].references++,i[u].updater(f)):i.push({identifier:d,updater:b(f,r),references:1}),t.push(d)}return t}function l(e){var r=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var i=n.nc;i&&(t.nonce=i)}if(Object.keys(t).forEach((function(e){r.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(r);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(r)}return r}var s,d=(s=[],function(e,r){return s[e]=r,s.filter(Boolean).join("\n")});function u(e,r,n,t){var o=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=d(r,o);else{var i=document.createTextNode(o),a=e.childNodes;a[r]&&e.removeChild(a[r]),a.length?e.insertBefore(i,a[r]):e.appendChild(i)}}function f(e,r,n){var t=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var p=null,h=0;function b(e,r){var n,t,o;if(r.singleton){var i=h++;n=p||(p=l(r)),t=u.bind(null,n,i,!1),o=u.bind(null,n,i,!0)}else n=l(r),t=f.bind(null,n,r),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else o()}}e.exports=function(e,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var n=c(e=e||[],r);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<n.length;t++){var o=a(n[t]);i[o].references--}for(var l=c(e,r),s=0;s<n.length;s++){var d=a(n[s]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}n=l}}}}},t={};function o(e){var r=t[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var i=t[e]={id:e,exports:{}};try{var a={id:e,module:i,factory:n[e],require:o};o.i.forEach((function(e){e(a)})),i=a.module,a.factory.call(i.exports,i,i.exports,a.require)}catch(e){throw i.error=e,e}return i.exports}o.m=n,o.c=t,o.i=[],o.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return o.d(r,{a:r}),r},o.d=(e,r)=>{for(var n in r)o.o(r,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o.hu=e=>e+"."+o.h()+".hot-update.js",o.hmrF=()=>"pixeldraw."+o.h()+".hot-update.json",o.h=()=>"1d2f1dd9e479ed580b2b",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="pixel-drawing-board:",o.l=(n,t,i,a)=>{if(e[n])e[n].push(t);else{var c,l;if(void 0!==i)for(var s=document.getElementsByTagName("script"),d=0;d<s.length;d++){var u=s[d];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==r+i){c=u;break}}c||(l=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.setAttribute("data-webpack",r+i),c.src=n),e[n]=[t];var f=(r,t)=>{c.onerror=c.onload=null,clearTimeout(p);var o=e[n];if(delete e[n],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=f.bind(null,c.onerror),c.onload=f.bind(null,c.onload),l&&document.head.appendChild(c)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e,r,n,t,i={},a=o.c,c=[],l=[],s="idle";function d(e){s=e;for(var r=[],n=0;n<l.length;n++)r[n]=l[n].call(null,e);return Promise.all(r)}function u(e){if(0===r.length)return e();var n=r;return r=[],Promise.all(n).then((function(){return u(e)}))}function f(e){if("idle"!==s)throw new Error("check() is only allowed in idle status");return d("check").then(o.hmrM).then((function(t){return t?d("prepare").then((function(){var i=[];return r=[],n=[],Promise.all(Object.keys(o.hmrC).reduce((function(e,r){return o.hmrC[r](t.c,t.r,t.m,e,n,i),e}),[])).then((function(){return u((function(){return e?h(e):d("ready").then((function(){return i}))}))}))})):d(b()?"ready":"idle").then((function(){return null}))}))}function p(e){return"ready"!==s?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status")})):h(e)}function h(e){e=e||{},b();var r=n.map((function(r){return r(e)}));n=void 0;var o=r.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return d("abort").then((function(){throw o[0]}));var i=d("dispose");r.forEach((function(e){e.dispose&&e.dispose()}));var a,c=d("apply"),l=function(e){a||(a=e)},s=[];return r.forEach((function(e){if(e.apply){var r=e.apply(l);if(r)for(var n=0;n<r.length;n++)s.push(r[n])}})),Promise.all([i,c]).then((function(){return a?d("fail").then((function(){throw a})):t?h(e).then((function(e){return s.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):d("idle").then((function(){return s}))}))}function b(){if(t)return n||(n=[]),Object.keys(o.hmrI).forEach((function(e){t.forEach((function(r){o.hmrI[e](r,n)}))})),t=void 0,!0}o.hmrD=i,o.i.push((function(h){var b,g,m,v,y=h.module,w=function(n,t){var o=a[t];if(!o)return n;var i=function(r){if(o.hot.active){if(a[r]){var i=a[r].parents;-1===i.indexOf(t)&&i.push(t)}else c=[t],e=r;-1===o.children.indexOf(r)&&o.children.push(r)}else console.warn("[HMR] unexpected require("+r+") from disposed module "+t),c=[];return n(r)},l=function(e){return{configurable:!0,enumerable:!0,get:function(){return n[e]},set:function(r){n[e]=r}}};for(var f in n)Object.prototype.hasOwnProperty.call(n,f)&&"e"!==f&&Object.defineProperty(i,f,l(f));return i.e=function(e){return function(e){switch(s){case"ready":return d("prepare"),r.push(e),u((function(){return d("ready")})),e;case"prepare":return r.push(e),e;default:return e}}(n.e(e))},i}(h.require,h.id);y.hot=(b=h.id,g=y,v={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:m=e!==b,_requireSelf:function(){c=g.parents.slice(),e=m?void 0:b,o(b)},active:!0,accept:function(e,r,n){if(void 0===e)v._selfAccepted=!0;else if("function"==typeof e)v._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)v._acceptedDependencies[e[t]]=r||function(){},v._acceptedErrorHandlers[e[t]]=n;else v._acceptedDependencies[e]=r||function(){},v._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)v._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)v._declinedDependencies[e[r]]=!0;else v._declinedDependencies[e]=!0},dispose:function(e){v._disposeHandlers.push(e)},addDisposeHandler:function(e){v._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=v._disposeHandlers.indexOf(e);r>=0&&v._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,s){case"idle":n=[],Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](b,n)})),d("ready");break;case"ready":Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](b,n)}));break;case"prepare":case"check":case"dispose":case"apply":(t=t||[]).push(b)}},check:f,apply:p,status:function(e){if(!e)return s;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var r=l.indexOf(e);r>=0&&l.splice(r,1)},data:i[b]},e=void 0,v),y.parents=c,y.children=[],c=[],h.require=w})),o.hmrC={},o.hmrI={}})(),(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var r=o.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var n=r.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e,r,n,t,i=o.hmrS_jsonp=o.hmrS_jsonp||{358:0},a={};function c(e){return new Promise(((r,n)=>{a[e]=r;var t=o.p+o.hu(e),i=new Error;o.l(t,(r=>{if(a[e]){a[e]=void 0;var t=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;i.message="Loading hot update chunk "+e+" failed.\n("+t+": "+o+")",i.name="ChunkLoadError",i.type=t,i.request=o,n(i)}}))}))}function l(a){function c(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var i=t.pop(),a=i.id,c=i.chain,s=o.c[a];if(s&&(!s.hot._selfAccepted||s.hot._selfInvalidated)){if(s.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:a};if(s.hot._main)return{type:"unaccepted",chain:c,moduleId:a};for(var d=0;d<s.parents.length;d++){var u=s.parents[d],f=o.c[u];if(f){if(f.hot._declinedDependencies[a])return{type:"declined",chain:c.concat([u]),moduleId:a,parentId:u};-1===r.indexOf(u)&&(f.hot._acceptedDependencies[a]?(n[u]||(n[u]=[]),l(n[u],[a])):(delete n[u],r.push(u),t.push({chain:c.concat([u]),id:u})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function l(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}o.f&&delete o.f.jsonpHmr,e=void 0;var s={},d=[],u={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in r)if(o.o(r,p)){var h,b=r[p],g=!1,m=!1,v=!1,y="";switch((h=b?c(p):{type:"disposed",moduleId:p}).chain&&(y="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":a.onDeclined&&a.onDeclined(h),a.ignoreDeclined||(g=new Error("Aborted because of self decline: "+h.moduleId+y));break;case"declined":a.onDeclined&&a.onDeclined(h),a.ignoreDeclined||(g=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+y));break;case"unaccepted":a.onUnaccepted&&a.onUnaccepted(h),a.ignoreUnaccepted||(g=new Error("Aborted because "+p+" is not accepted"+y));break;case"accepted":a.onAccepted&&a.onAccepted(h),m=!0;break;case"disposed":a.onDisposed&&a.onDisposed(h),v=!0;break;default:throw new Error("Unexception type "+h.type)}if(g)return{error:g};if(m)for(p in u[p]=b,l(d,h.outdatedModules),h.outdatedDependencies)o.o(h.outdatedDependencies,p)&&(s[p]||(s[p]=[]),l(s[p],h.outdatedDependencies[p]));v&&(l(d,[h.moduleId]),u[p]=f)}r=void 0;for(var w,x=[],k=0;k<d.length;k++){var E=d[k],j=o.c[E];j&&(j.hot._selfAccepted||j.hot._main)&&u[E]!==f&&!j.hot._selfInvalidated&&x.push({module:E,require:j.hot._requireSelf,errorHandler:j.hot._selfAccepted})}return{dispose:function(){var e;n.forEach((function(e){delete i[e]})),n=void 0;for(var r,t=d.slice();t.length>0;){var a=t.pop(),c=o.c[a];if(c){var l={},u=c.hot._disposeHandlers;for(k=0;k<u.length;k++)u[k].call(null,l);for(o.hmrD[a]=l,c.hot.active=!1,delete o.c[a],delete s[a],k=0;k<c.children.length;k++){var f=o.c[c.children[k]];f&&(e=f.parents.indexOf(a))>=0&&f.parents.splice(e,1)}}}for(var p in s)if(o.o(s,p)&&(c=o.c[p]))for(w=s[p],k=0;k<w.length;k++)r=w[k],(e=c.children.indexOf(r))>=0&&c.children.splice(e,1)},apply:function(e){for(var r in u)o.o(u,r)&&(o.m[r]=u[r]);for(var n=0;n<t.length;n++)t[n](o);for(var i in s)if(o.o(s,i)){var c=o.c[i];if(c){w=s[i];for(var l=[],f=[],p=[],h=0;h<w.length;h++){var b=w[h],g=c.hot._acceptedDependencies[b],m=c.hot._acceptedErrorHandlers[b];if(g){if(-1!==l.indexOf(g))continue;l.push(g),f.push(m),p.push(b)}}for(var v=0;v<l.length;v++)try{l[v].call(null,w)}catch(r){if("function"==typeof f[v])try{f[v](r,{moduleId:i,dependencyId:p[v]})}catch(n){a.onErrored&&a.onErrored({type:"accept-error-handler-errored",moduleId:i,dependencyId:p[v],error:n,originalError:r}),a.ignoreErrored||(e(n),e(r))}else a.onErrored&&a.onErrored({type:"accept-errored",moduleId:i,dependencyId:p[v],error:r}),a.ignoreErrored||e(r)}}}for(var y=0;y<x.length;y++){var k=x[y],E=k.module;try{k.require(E)}catch(r){if("function"==typeof k.errorHandler)try{k.errorHandler(r,{moduleId:E,module:o.c[E]})}catch(n){a.onErrored&&a.onErrored({type:"self-accept-error-handler-errored",moduleId:E,error:n,originalError:r}),a.ignoreErrored||(e(n),e(r))}else a.onErrored&&a.onErrored({type:"self-accept-errored",moduleId:E,error:r}),a.ignoreErrored||e(r)}}return d}}}self.webpackHotUpdatepixel_drawing_board=(e,n,i)=>{for(var c in n)o.o(n,c)&&(r[c]=n[c]);i&&t.push(i),a[e]&&(a[e](),a[e]=void 0)},o.hmrI.jsonp=function(e,i){r||(r={},t=[],n=[],i.push(l)),o.o(r,e)||(r[e]=o.m[e])},o.hmrC.jsonp=function(a,s,d,u,f,p){f.push(l),e={},n=s,r=d.reduce((function(e,r){return e[r]=!1,e}),{}),t=[],a.forEach((function(r){o.o(i,r)&&void 0!==i[r]&&(u.push(c(r)),e[r]=!0)})),o.f&&(o.f.jsonpHmr=function(r,n){e&&!o.o(e,r)&&o.o(i,r)&&void 0!==i[r]&&(n.push(c(r)),e[r]=!0)})},o.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(o.p+o.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})(),o(738)})();