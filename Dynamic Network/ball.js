export class Ball {
    constructor(pos, velocity, radius, phase) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = radius;
        this.phase = phase;

        this.dt = 0.01
        this.t = 0
        this.color = {
            r: 207,
            g: 255,
            b: 4,
            a: 1
        }

    }

    animate() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        this.t += this.phase * this.dt;
        this.color.a = Math.pow(Math.cos(this.t), 2)*0.5+0.5;

    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius*(1.5-0.5*this.color.a), 0, Math.PI * 2, false);
        ctx.fill();
    }
}

export class MouseBall extends Ball {
    animate(){}
  }