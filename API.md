## Classes
<dl>
<dt><a href="#Taps">Taps</a></dt>
<dt><a href="#Tap">Tap</a></dt>
</dl>
<a name="Taps"></a>

## Taps
#### Properties:

| Name | Type | Description |
| --- | --- | --- |
| dragDistance | <code>number</code> | Distance in pixels for tap to move from start position to enter drag state, default: 20 pixels. |
| dragDelay | <code>number</code> | Time in milliseconds for tap to enter drag state if held for that long, default: 200 milliseconds. |


[new Taps([element])](#new_Taps_new) (constructor)<br />
[.start](#Taps+start) : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)<br />
[.up](#Taps+up) : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)<br />
[.click](#Taps+click) : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)<br />
[.dragstart](#Taps+dragstart) : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)<br />
[.drag](#Taps+drag) : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)<br />
[.dragend](#Taps+dragend) : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)<br />
[.update()](#Taps+update)<br />

<a name="new_Taps_new"></a>

### new Taps([element])
Taps provide source agnostic sync access to input. Either it comes from mouse and/or touch, it is the same API. It assumes multiple instances of taps making your code multi-touch by design. Providing sync access instead of event based, for best usage in real-time applications. Class itself is an iterator for easy access to taps.


| Param | Type | Description |
| --- | --- | --- |
| [element] | <code>object</code> | Element to which mouse and touch events to be attached, by default `window`. |

**Example**  
```js
// create taps interface
```
<a name="Taps+start"></a>

### .start : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)
Iterator of taps that just've been created. Tap can be only once in `start` state during its life.

**Example**  
```js
for(const tap of taps.start) {
```
<a name="Taps+up"></a>

### .up : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)
Iterator of taps that been released. Tap can be only once in `up` state during its life and will be removed after.

**Example**  
```js
for(const tap of taps.up) {
```
<a name="Taps+click"></a>

### .click : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)
Iterator of taps that are consider clicks. Tap can be only once in `click` state, and will be removed after.

**Example**  
```js
for(const tap of taps.click) {
```
<a name="Taps+dragstart"></a>

### .dragstart : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)
Iterator of taps that started a drag. Tap can be only once in `dragstart` state. It is guaranteed to trigger `dragend` instead of `click` as a last state.

**Example**  
```js
for(const tap of taps.dragstart) {
```
<a name="Taps+drag"></a>

### .drag : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)
Iterator of taps that are in drag state. This state will persist from and during `dragstart` and until/during `dragend` states.

**Example**  
```js
for(const tap of taps.drag) {
```
<a name="Taps+dragend"></a>

### .dragend : [<code>Iterable.&lt;Tap&gt;</code>](#Tap)
Iterator of taps that ended a drag. Tap can be only once in `dragend` state, and will be removed after.

**Example**  
```js
for(const tap of taps.dragend) {
```
<a name="Taps+update"></a>

### .update()
Update taps states, should be executed in the beginning of an application every update loop.

**Example**  
```js
function update() {
```
<a name="Tap"></a>

## Tap
#### Properties:

| Name | Type | Description |
| --- | --- | --- |
| start | <code>boolean</code> | True when tap been just created, equivalent to mousedown and touchstart. |
| up | <code>boolean</code> | True when tap is ended, equivalent to mouseup, touchend, touchcancel. It can be in that state only once, and will be removed after. |
| click | <code>boolean</code> | True when tap is considered a click. It can be in that state only once, and will be removed after. |
| dragstart | <code>boolean</code> | True when tap is started dragging, which happens when either: tap duration is long enough and/or it is moved away from initial position enough. It will be in that state once, and guarantees to have `dragend` state instead of `click` state. |
| drag | <code>boolean</code> | True when tap is dragging. It will be in that state from `dragstart` till the end of a tap. |
| dragend | <code>boolean</code> | True when tap is ended dragging. It will be in that state only if previously was in `dragstart`, and tap will be removed after. |
| timestamp | <code>boolean</code> | Milliseconds timestamp of when tap has started. |
| x | <code>number</code> | X current coordinate of a tap, where 0 - is left. |
| y | <code>number</code> | Y current coordinate of a tap, where 0 - is top. |
| sx | <code>number</code> | X coordinate of where tap started. |
| sy | <code>number</code> | Y coordinate of where tap started. |
| dx | <code>number</code> | X distance of a tap traveled since previous update. |
| dy | <code>number</code> | Y distance of a tap traveled since previous update. |

<a name="new_Tap_new"></a>

### new Tap()
Tap is instintiated by [Taps](#Taps), and provides information about the input, its state and coordinates. It is source agnostic, and behaves identical between mouse and touch.

**Example**  
```js
// clicking
```
**Example**  
```js
// dragging
```