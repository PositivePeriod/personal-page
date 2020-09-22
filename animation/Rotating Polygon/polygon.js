const PI2 = Math.PI * 2

const COLORS = [
    '#c8e6c9',
    '#a5d6a7',
    '#81c784',
    '#66bb6a',
    '#4caf50',
    '#43a047',
    '#388e3c',
    '#2e7d32',
    '#1b5e20',
    '#c8e6c9',
    '#a5d6a7',
    '#81c784',
    '#66bb6a',
    '#4caf50',
    '#43a047',
    '#388e3c',
    '#2e7d32',
    '#1b5e20'
]

export class Polygon {
    constructor(x, y, radius, sides) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;

    }

    animatePolygon(ctx, moveX) {
        ctx.save();
        ctx.fillstyle = '#000000';
        ctx.beginPath();

        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

        this.rotate -= moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);
            (i == 0) ? ctx.moveTo(x, y): ctx.lineTo(x, y);
            ctx.fill();
        }
        ctx.closePath();
        ctx.restore();
    }

    animateDot(ctx, moveX) {
        ctx.save();
        ctx.fillstyle = '#000000';
        ctx.beginPath();

        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

        this.rotate += moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);

            ctx.beginPath();
            ctx.arc(x, y, 30, 0, PI2, false);
            ctx.fill();
        }
        ctx.restore();
    }

    animate(ctx, moveX) {
        ctx.save();

        const angle = PI2 / this.sides;
        const angle2 = PI2 / 4;

        ctx.translate(this.x, this.y);

        this.rotate += moveX * 0.008;
        ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++) {
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);

            ctx.save();
            ctx.fillStyle = COLORS[i];
            ctx.translate(x, y);
            ctx.rotate((PI2 / this.sides) * i + Math.PI / 4);
            ctx.beginPath();
            for (let j = 0; j < 4; j++) {
                const x2 = 80 * Math.cos(angle2 * j);
                const y2 = 80 * Math.sin(angle2 * j);
                (j == 0) ? ctx.moveTo(x2, y2): ctx.lineTo(x2, y2);
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }
}