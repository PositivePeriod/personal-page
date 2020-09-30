import {
    Comet
} from './comet.js'

export class CometGroup {
    constructor(number, color, rotate, theta = null, dtheta, stageWidth, stageHeight) {
        this.number = number;
        this.color = color;
        this.rotate = rotate;
        this.theta = theta;
        this.dtheta = dtheta;

        this.radius = 40;
        this.speed = 0.25;

        const radiusRate = 0.8;
        const speedRate = 0.98;
        const opacityRate = 0.8;

        this.comets = [];
        //this.theta = 0;
        if (this.theta === null) {
            this.theta = Math.random() * Math.PI * 2;
        }
        
        for (var i = 0; i < this.number; i++) {
            const pos = {
                x: stageWidth / 2,
                y: stageHeight / 2
            };
            const radius = this.radius * Math.pow(radiusRate, i);
            const speed = this.speed * Math.pow(speedRate, i);
            const color = {
                r: this.color.r,
                g: this.color.g,
                b: this.color.b,
                a: this.color.a * Math.pow(opacityRate, i)
            };
            this.comets.push(new Comet(pos, radius, speed, color))
        }
    }

    move(mouse) {
        var point = {
            x: mouse.x + this.rotate * 2 * Math.cos(this.theta),
            y: mouse.y + this.rotate * 2 * Math.sin(this.theta),
        };
        this.theta += this.dtheta;
        while (this.theta > Math.PI * 2) {
            this.theta -= Math.PI * 2
        }

        this.comets[0].move(point);
        for (var i = 1; i < this.number; i++) {
            this.comets[i].move(this.comets[i - 1].pos);
        }
    }

    draw(ctx) {
        for (var i = 0; i < this.number; i++) {
            this.comets[i].draw(ctx);
        }
    }
}