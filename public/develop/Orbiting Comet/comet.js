export class Comet {
    constructor(pos, radius, speed, color) {
        this.pos = pos;
        this.radius = radius;
        this.speed = speed;
        this.color = color;

        this.disLimit = this.radius;
    }

    move(point) {
        this.pos.x += (point.x - this.pos.x) * this.speed;
        this.pos.y += (point.y - this.pos.y) * this.speed;
        //if ((point.x - this.pos.x) ** 2 + (point.y - this.pos.y) ** 2 > this.disLimit ** 2) {}
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}