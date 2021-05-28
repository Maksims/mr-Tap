import { ctx, canvas } from './app.js';

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.targetRadius = this.radius;
        this.ix = 0;
        this.iy = 0;
        this.friction = 0.1;
        this.color = '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
        this.width = 1;
    }

    update(dt) {
        const timeCoef = dt / (1000 / 60 / 1000);
        const easing = 1.0 - (this.friction * timeCoef);

        if (Math.abs(this.ix) > 0.01) {
            this.ix *= easing;

            if (this.x <= this.radius && this.ix < 0) {
                this.ix *= -1;
            } else if (this.x >= (canvas.width - this.radius) && this.ix > 0) {
                this.ix *= -1;
            }

            this.x += this.ix;
        } else {
            this.ix = 0;
        }

        if (Math.abs(this.iy) > 0.01) {
            this.iy *= easing;

            if (this.y <= this.radius && this.iy < 0) {
                this.iy *= -1;
            } else if (this.y >= (canvas.height - this.radius) && this.iy > 0) {
                this.iy *= -1;
            }

            this.y += this.iy;
        } else {
            this.iy = 0;
        }

        if (Math.abs(this.targetRadius - this.radius) > 0.1) {
            this.radius += (this.targetRadius - this.radius) * (0.2 * timeCoef);
        } else {
            this.radius = this.targetRadius;
        }
    }

    render() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = this.width;

        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

function pickCircle(list, x, y) {
    let i = list.length;
    while(i--) {
        const a = list[i].x - x;
        const b = list[i].y - y;
        const dist = Math.sqrt(a * a + b * b);

        if (dist < list[i].radius)
            return list[i];
    }

    return null;
}

export { Circle, pickCircle };
