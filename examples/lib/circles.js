import { Circle, pickCircle } from './circle.js';

// create circles
const circles = [ ];
for(let i = 0; i < 8; i++) {
    let circle = new Circle(window.innerWidth / 2, window.innerHeight / 2, 32);
    circle.ix = (Math.random() - 0.5) * 64;
    circle.iy = (Math.random() - 0.5) * 64;
    circles.push(circle);
}

export default circles;
