/**
 * @class
 * @name Tap
 * @description Tap is instintiated by {@link Taps}, and provides information about the input, its state and coordinates. It is source agnostic, and behaves identical between mouse and touch.
 * @property {boolean} start True when tap been just created, equivalent to mousedown and touchstart.
 * @property {boolean} up True when tap is ended, equivalent to mouseup, touchend, touchcancel. It can be in that state only once, and will be removed after.
 * @property {boolean} click True when tap is considered a click. It can be in that state only once, and will be removed after.
 * @property {boolean} dragstart True when tap is started dragging, which happens when either: tap duration is long enough and/or it is moved away from initial position enough. It will be in that state once, and guarantees to have `dragend` state instead of `click` state.
 * @property {boolean} drag True when tap is dragging. It will be in that state from `dragstart` till the end of a tap.
 * @property {boolean} dragend True when tap is ended dragging. It will be in that state only if previously was in `dragstart`, and tap will be removed after.
 * @property {boolean} timestamp Milliseconds timestamp of when tap has started.
 * @property {boolean} mouse True when tap originated from mouse input.
 * @property {null|number} button If originated from mouse, a button number, otherwise null.
 * @property {number} x X current coordinate of a tap, where 0 - is left.
 * @property {number} y Y current coordinate of a tap, where 0 - is top.
 * @property {number} sx X coordinate of where tap started.
 * @property {number} sy Y coordinate of where tap started.
 * @property {number} dx X distance of a tap traveled since previous update.
 * @property {number} dy Y distance of a tap traveled since previous update.
 * @example
 * // clicking
 *
 * for(const tap of taps.click) {
 *     // pick an object based on tap coordinates
 *     const object = pickObject(tap.x, tap.y);
 *     if (! object) continue;
 *
 *     object.interact();
 * }
 * @example
 * // dragging
 *
 * // grab an object for dragstart taps
 * for(const tap of taps.dragstart) {
 *     // pick an object based on tap start coordinates
 *     const object = pickObject(tap.sx, tap.sy);
 *     // remember that object against a tap
 *     tap.object = object;
 * }
 *
 * // move an objects for drag taps
 * for(const tap of taps.drag) {
 *     // ensure we have an object
 *     if (! tap.object) continue;
 *
 *     // set position of a dragged object to tap coordinates
 *     tap.object.setPosition(tap.x, tap.y);
 * }
 *
 * // throw an object for dragend taps
 * for(const tap of taps.dragend) {
 *     // ensure we have an object
 *     if (! tap.object) continue;
 *
 *     // dt - delta time, to correct for a variable FPS
 *     tap.object.setLinearVelocity(tap.dx * dt, tap.dy * dt);
 * }
 */
class Tap {
    constructor(taps, id) {
        this._taps = taps;
        this._id = id;
        this._timestamp = Date.now();

        this._sx = 0;
        this._sy = 0;

        this._x = 0;
        this._y = 0;

        this._lx = 0;
        this._ly = 0;

        this._dx = 0;
        this._dy = 0;

        this._mouse = false;
        this._button = null;

        this._start = true;
        this._started = false;
        this._up = false;
        this._click = false;

        this._drag = false;
        this._dragstart = false;
        this._dragend = false;
    }

    change(evt) {
        this._x = evt.clientX;
        this._y = evt.clientY;
    }

    update() {
        if (this._start && ! this._started) {
            this._started = true;
        } else if (this._started && this._start) {
            this._start = false;
        }

        // check if needs removing
        if (this._up) {
            this._taps._index.delete(this._id);
            return;
        }

        if (this._dragstart) {
            this._dragstart = false;
        }

        // check if dragging
        if (! this._drag) {
            const dx = this._sx - this._x;
            const dy = this._sy - this._y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > this._taps._dragDistance || (Date.now() - this._timestamp) > this._taps._dragDelay) {
                this._dragstart = true;
                this._drag = true;
            }
        }

        // check if tap is released
        if (this._release) {
            this._down = false;
            this._up = true;

            if (this._drag) {
                this._dragend = true;
            } else {
                this._click = true;
            }
        }

        this._dx = this._x - this._lx;
        this._dy = this._y - this._ly;

        this._lx = this._x;
        this._ly = this._y;
    }

    get id() {
        return this._id;
    }

    get start() {
        return this._start;
    }

    get up() {
        return this._up;
    }

    get click() {
        return this._click;
    }

    get dragstart() {
        return this._dragstart;
    }

    get drag() {
        return this._drag;
    }

    get dragend() {
        return this._dragend;
    }

    get timestamp() {
        return this._timestamp;
    }

    get mouse() {
        return this._mouse;
    }

    get button() {
        return this._button;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get sx() {
        return this._sx;
    }

    get sy() {
        return this._sy;
    }

    get dx() {
        return this._dx;
    }

    get dy() {
        return this._dy;
    }
}

export default Tap;
