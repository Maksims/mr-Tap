import Tap from './tap.js';

class TapMouse {
    constructor(taps) {
        this._taps = taps;

        const element = this._taps._element;

        element.addEventListener('mousedown', (evt) => {
            this._onMouseDown(evt);
        }, false);
        element.addEventListener('mousemove', (evt) => {
            this._onMouseMove(evt);
        }, false);
        element.addEventListener('mouseup', (evt) => {
            this._onMouseUp(evt);
        }, false);
    }

    _onMouseDown(evt) {
        const tap = new Tap(this._taps, -1);
        this._taps._index.set(tap.id, tap);
        tap.change(evt);
        tap._sx = tap._lx = tap._x;
        tap._sy = tap._ly = tap._y;
    }

    _onMouseMove(evt) {
        const tap = this._taps._index.get(-1);
        if (! tap) return;
        tap.change(evt);
    }

    _onMouseUp(evt) {
        const tap = this._taps._index.get(-1);
        if (! tap) return;
        tap.change(evt);
        tap._release = true;
    }
}

export default TapMouse;
