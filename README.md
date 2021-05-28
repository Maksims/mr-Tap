# mr-Taps

Taps provide source agnostic sync access to input. Either it comes from mouse and/or touch, it is the same API. It assumes multiple instances of taps making your code multi-touch by design.

Providing sync access instead of event based, for best usage in real-time applications.

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](LICENSE)


## :rocket: Install

```bash
npm install mr-observer
```

```html
<script type='module' src='mr-tap.module.min.js'></script>
<script nomodule src='mr-tap.min.js'></script>
```
Use built files from `dist` directory for browser. It will load ES8+ version if it is supported ([~94%](https://caniuse.com/?search=ES8)). There are two versions: `nomodule` (global scope) and `module` (for `import`).

```js
// create taps interface
const taps = new Taps();

function update() {
    requestAnimationFrame(update);

    // update taps on each frame
    taps.update();

    // access all taps
    for(const tap of taps) {
        // iterate through all taps
    }
}
requestAnimationFrame(update);
```

## :scroll: [API Documentation](API.md)

## Usage


#### Creating:

```js
const taps = new Taps();
```

#### Updating:
```js
function update() {
    requestAnimationFrame(update);

    // update taps on each frame
    taps.update();

    // application logic
}
requestAnimationFrame(update);
```


#### Accessing:

All taps:
```js
// Taps - is an iterator
for(const tap in taps) {
    // all taps
}
```

Specific state taps, e.g. clicks:

```js
for(const tap in taps.click) {
    // taps that are only clicks
}
```


## Examples

Examples are multi-touch by design.

Clicking on objects:
```js
for(const tap of taps.click) {
    const object = pickObject(tap.x, tap.y);
    if (! object) continue;
    object.interact();
}
```

Rendering taps:
```js
// drawCircle(x, y, radius)

for(const tap of taps) {
    drawCircle(tap.x, tap.y, 32);
}
```

Selecting multiple objects using rect (RTS style):
```js
// drawRect(left, top, right, bottom)

// draw selection rect
for(const tap of taps.drag) {
    drawRect(tap.sx, tap.sy, tap.x, tap.y);
}

// select objects on dragend
for(const tap of taps.dragend) {
    const objects = objectsInRect(tap.sx, tap.sy, tap.x, tap.y);
    // selected some objects
}
```

Dragging objects:
```js
// pick an object from tap start position
// and remember against tap object
for(const tap of taps.dragstart) {
    const object = pickObject(tap.sx, tap.sy);
    if (! object) continue;

    tap.object = object;
    // remember difference of position between tap and object center
    tap.offsetX = object.x - tap.sx;
    tap.offsetY = object.y - tap.sy;
}

// position objects
for(const tap of taps.drag) {
    // tap might have no object associated
    if (! tap.object) continue;
    // position with offset to prevent object snapping
    tap.object.setPosition(tap.x + tap.offsetX, tap.y + tap.offsetY);
}
```

Throwing objects:
```js
// pick objects
// position objects

// throw an object
for(const tap of taps.dragend) {
    // tap might have no object associated
    if (! tap.object) continue;
    // set linear velocity
    // multiply speed by deltaTime
    tap.object.setLinearVelocity(tap.dx * dt, tap.dy * dt);
}
```

## Tap

Each tap is instantiated by the Taps interface, and provided through iterators. Tap is agnostic to the input source: mouse or touch. And behaves identical. Also, due to iterator pattern, it provides sync access instead of event driven, and is multi-touch by design.

Tap has states with two branching scenarios:

Click: `start` > `click + up`
Drag: `start` > `dragstart + drag` > `drag` > `dragend + drag + up`


#### States:

`start` - every tap starts with a start state.

`click` - some taps if not moved from initial position and have not been held for too long, on `up` state, will be considered `click`.

`dragstart` - some taps if moved from initial position or have been held for some time, will enter `drag` state, and once be in `dragstart` state.
`drag` - once tap is in `dragstart` state, it will be in `drag` state till the end of a tap.
`dragend` - if tap is in `drag` state, on `up` state instead of `click` it will be in `dragend` state.

`up` - every tap ends with `up` state.


#### Drag State

Tap enters `drag` state if moved far from start position, or held for long enough. It is possible to change default settings of 20 pixels and 200 millisecsonds:

```js
taps.dragDistance = 20; // pixels
taps.dragDelay = 200; // milliseconds
```


## Building

Builds library into two versions (normal and module) using Rollup, Babel and Terser.  
Source file: `src/index.js`  
Built versions normal (`dist/mr-tap.min.js`) and module (`dist/mr-tap.module.min.js`):

```bash
npm install
npm run build
```
