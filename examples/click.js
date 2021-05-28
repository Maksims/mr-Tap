import { pickCircle } from './lib/circle.js';
import circles from './lib/circles.js';

// click on circles
function handleClicks(taps) {
    for(const tap of taps.click) {
        const circle = pickCircle(circles, tap.x, tap.y);
        if (! circle) continue;
        // make circle bounce
        circle.radius = 48;
        // randomize circle color
        circle.color = '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    }
}

export default handleClicks;
