const PI2 = Math.PI * 2
const BOUNCE = 0.82;

export class Dot {
    constructor(x, y, radius, pixelSize, red, green, blue, scale) {
        this.x = x;
        this.y = y;

        const ratio = radius / 256 / 2;
        this.targetRadius = ratio * scale;

        /*this.targetRadius = radius;*/
        this.radius = 0;
        this.radiusV = pixelSize;
        this.pixelSize = pixelSize;

        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    animate(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(
            this.x - this.pixelSize / 2,
            this.y - this.pixelSize / 2,
            this.pixelSize, this.pixelSize
        );

        const accel = (this.targetRadius - this.radius) / 2;
        this.radiusV += accel;
        this.radiusV *= BOUNCE;
        // if (Math.abs(this.radiusV) < 1e-10) {
        //     this.radiusV = 0;
        // };
        this.radius += this.radiusV;
        // this.radius = Math.min(0, this.radius);

        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }

    reset() {
        this.radius = 0;
        this.radiusV = 0;
    }
}