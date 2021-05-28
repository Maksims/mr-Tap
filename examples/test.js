import Taps from '../dist/mr-tap.module.min.js';
import { onUpdate, canvas, ctx } from './lib/app.js';
import circles from './lib/circles.js';

import handleClicks from './click.js';
import handleDragging from './drag.js';
import handleSelectRect from './select-rect.js';

const taps = new Taps();

onUpdate(function(dt) {
    // update taps
    taps.update();

    // clear canvas
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update all circles
    for(let i = 0; i < circles.length; i++) {
        circles[i].update(dt);
    }

    // handle taps interactions
    handleClicks(taps);
    handleDragging(taps, dt);
    handleSelectRect(taps);

    // render all circles
    for(let i = 0; i < circles.length; i++) {
        circles[i].render();
    }
});
