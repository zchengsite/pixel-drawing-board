# pixel-drawing-board
A canvas based pixel drawing board

## Installation

### CDN

```html
<script src="https://unpkg.com/pixel-drawing-board@0.0.4/dist/pixeldraw.js"></script>

<div id="pixel-drawing-demo"></div>

<script>
  x_pixeldrawing('#pixel-drawing-demo', {})
</script>
```
### NPM

```bash
# install dependencies
$ npm install pixel-drawing-board
```

```html
<div id="pixel-drawing-demo"></div>
```

```js
import PixelDrawing from 'pixel-drawing-board'

const draw = new PixelDrawing('#pixel-drawing-demo', {})
```
