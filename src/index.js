import Tap from './tap.js';
import TapMouse from './mouse.js';
import TapTouch from './touch.js';

/**
 * @class
 * @name Taps
 * @description Taps provide source agnostic sync access to input. Either it comes from mouse and/or touch, it is the same API. It assumes multiple instances of taps making your code multi-touch by design. Providing sync access instead of event based, for best usage in real-time applications. Class itself is an iterator for easy access to taps.
 * @param {object} [element] - Element to which mouse and touch events to be attached, by default `window`.
 * @property {number} dragDistance Distance in pixels for tap to move from start position to enter drag state, default: 20 pixels.
 * @property {number} dragDelay Time in milliseconds for tap to enter drag state if held for that long, default: 200 milliseconds.
 * @example
 * // create taps interface
 * const taps = new Taps();
 *
 * function update() {
 *     requestAnimationFrame(update);
 *
 *     // update taps on each frame
 *     taps.update();
 *
 *     // access all taps
 *     for(const tap of taps) {
 *         // iterate through all taps
 *     }
 * }
 * requestAnimationFrame(update);
 */
class Taps {
    constructor(element = window) {
        this._element = element;

        this._dragDistance = 20; // pixels
        this._dragDelay = 200; // ms

        this._index = new Map();
        this._mouse = new TapMouse(this);
        this._touch = new TapTouch(this);

        window.addEventListener('blur', () => {
            this._onBlur();
        }, false);
        document.addEventListener('visibilitychange', () => {
            this._onBlur();
        }, false);
    }

    *_iterator(property) {
        for(const [id, tap] of this._index) {
            if (tap[property])
                yield tap;
        }
    }

    _onBlur() {
        for(const [ id, tap ] of this._index) {
            tap._release = true;
        }
    }

    /**
     * @function
     * @name Taps#update
     * @description Update taps states, should be executed in the beginning of an application every update loop.
     * @example
     * function update() {
     *     requestAnimationFrame(update);
     *
     *     // update taps on each frame
     *     taps.update();
     *
     *     // access all taps
     * }
     * requestAnimationFrame(update);
     */
    update() {
        for(const [ id, tap ] of this._index) {
            tap.update();
        }
    }

    [Symbol.iterator]() {
        return this._index.values();
    }

    set dragDistance(value) {
        this._dragDistance = value;
    }

    get dragDistance() {
        return this._dragDistance;
    }

    set dragDelay(value) {
        this._dragDelay = value;
    }

    get dragDelay() {
        return this._dragDelay;
    }

    /**
     * @name Taps#start
     * @type {Iterable.<Tap>}
     * @description Iterator of taps that just've been created. Tap can be only once in `start` state during its life.
     * @example
     * for(const tap of taps.start) {
     *     // same as touchstart or mousedown
     * }
     */
    get start() {
        return this._iterator('start');
    }

    /**
     * @name Taps#up
     * @type {Iterable.<Tap>}
     * @description Iterator of taps that been released. Tap can be only once in `up` state during its life and will be removed after.
     * @example
     * for(const tap of taps.up) {
     *     // same as touchend, touchcancel or mouseup
     * }
     */
    get up() {
        return this._iterator('up');
    }

    /**
     * @name Taps#click
     * @type {Iterable.<Tap>}
     * @description Iterator of taps that are consider clicks. Tap can be only once in `click` state, and will be removed after.
     * @example
     * for(const tap of taps.click) {
     *     // same as click, happens on mouseup or touchend
     *     // if tap been short lived and/or didn't move too far from initial position
     * }
     */
    get click() {
        return this._iterator('click');
    }

    /**
     * @name Taps#dragstart
     * @type {Iterable.<Tap>}
     * @description Iterator of taps that started a drag. Tap can be only once in `dragstart` state. It is guaranteed to trigger `dragend` instead of `click` as a last state.
     * @example
     * for(const tap of taps.dragstart) {
     *     // held touch/mousedown for long enough or moved far enough from initial tap position
     * }
     */
    get dragstart() {
        return this._iterator('dragstart');
    }

    /**
     * @name Taps#drag
     * @type {Iterable.<Tap>}
     * @description Iterator of taps that are in drag state. This state will persist from and during `dragstart` and until/during `dragend` states.
     * @example
     * for(const tap of taps.drag) {
     *     // tap is dragging
     * }
     */
    get drag() {
        return this._iterator('drag');
    }

    /**
     * @name Taps#dragend
     * @type {Iterable.<Tap>}
     * @description Iterator of taps that ended a drag. Tap can be only once in `dragend` state, and will be removed after.
     * @example
     * for(const tap of taps.dragend) {
     *     // drag is finished
     * }
     */
    get dragend() {
        return this._iterator('dragend');
    }
}

export { Taps as default, Tap };
