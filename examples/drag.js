import { pickCircle } from './lib/circle.js';
import circles from './lib/circles.js';

// dragging circles
function handleDragging(taps, dt) {
    const timeCoef = dt / (1000 / 60 / 1000);

    // start dragging
    for(const tap of taps.dragstart) {
        tap.circle = pickCircle(circles, tap.sx, tap.sy);
        if (! tap.circle) continue;
        tap.offsetX = tap.circle.x - tap.sx;
        tap.offsetY = tap.circle.y - tap.sy;
        tap.dxSmooth = 0;
        tap.dySmooth = 0;
        tap.circle.targetRadius = 48;
    }

    // drag
    for(const tap of taps.drag) {
        if (! tap.circle) continue;
        tap.circle.x = tap.x + tap.offsetX;
        tap.circle.y = tap.y + tap.offsetY;
        // smoothen tap movement speed
        tap.dxSmooth += (tap.dx - tap.dxSmooth) * (0.5 * timeCoef);
        tap.dySmooth += (tap.dy - tap.dySmooth) * (0.5 * timeCoef);
    }

    // end dragging
    for(const tap of taps.dragend) {
        if (! tap.circle) continue;
        tap.circle.targetRadius = 32;
        // set circle inertia
        tap.circle.ix = tap.dxSmooth * 200 * dt;
        tap.circle.iy = tap.dySmooth * 200 * dt;
    }
}

export default handleDragging;
