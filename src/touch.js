import Tap from './tap.js';

class TapTouch {
    constructor(taps) {
        this._taps = taps;

        const element = this._taps._element;

        element.addEventListener('touchstart', (evt) => {
            this._onTouchStart(evt);
        }, false);
        element.addEventListener('touchmove', (evt) => {
            this._onTouchMove(evt);
        }, false);
        element.addEventListener('touchend', (evt) => {
            this._onTouchEnd(evt);
        }, false);
        element.addEventListener('touchcancel', (evt) => {
            this._onTouchEnd(evt);
        }, false);
    }

    _onTouchStart(evt) {
        for(let i = 0; i < evt.changedTouches.length; i++) {
            const touch = evt.changedTouches[i];
            const tap = new Tap(this._taps, touch.identifier);
            this._taps._index.set(tap.id, tap);
            tap.change(touch);
            tap._sx = tap._lx = tap._x;
            tap._sy = tap._ly = tap._y;
        }
    }

    _onTouchMove(evt) {
        for(let i = 0; i < evt.changedTouches.length; i++) {
            const touch = evt.changedTouches[i];
            const tap = this._taps._index.get(touch.identifier);
            tap.change(touch);
        }
    }

    _onTouchEnd(evt) {
        for(let i = 0; i < evt.changedTouches.length; i++) {
            const touch = evt.changedTouches[i];
            const tap = this._taps._index.get(touch.identifier);
            tap.change(touch);
            tap._release = true;
        }
    }
}

export default TapTouch;
