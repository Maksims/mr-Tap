import { ctx } from './lib/app.js';
import circles from './lib/circles.js';

// selectior rectangle
function handleSelectRect(taps) {
    // start selecting if nothing dragging
    for(const tap of taps.dragstart) {
        if (tap.circle) continue;
        tap.selecting = true;
    }

    // draw selection rectangle
    for(const tap of taps.drag) {
        if (! tap.selecting) continue;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.rect(tap.sx + 0.5, tap.sy + 0.5, tap.x - tap.sx, tap.y - tap.sy);
        ctx.fill();
        ctx.stroke();
    }

    // when selection ended
    for(const tap of taps.dragend) {
        if (! tap.selecting) continue;

        const left = Math.min(tap.sx, tap.x);
        const right = Math.max(tap.sx, tap.x);
        const top = Math.min(tap.sy, tap.y);
        const bottom = Math.max(tap.sy, tap.y);
        const color = '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);

        // find circles colliding with selection rectangle
        for(let i = 0; i < circles.length; i++) {
            const x = circles[i].x;
            const y = circles[i].y;
            const r = circles[i].radius;

            if ((x + r) > left && (x - r) < right && (y + r) > top && (y - r) < bottom) {
                // make circle bounce
                circles[i].radius = 48;
                // set to group color
                circles[i].color = color;
            }
        }
    }
}

export default handleSelectRect;
