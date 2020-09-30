import {
    Comet
} from './comet.js'

export class CometGroup {
    constructor(number, stageWidth, stageHeight) {
        this.number = number;

        const radiusRate = 0.8;
        const speedRate = 0.98;
        const opacityRate = 0.8;

        this.comets = [];

        for (var i = 0; i < this.number; i++) {
            const pos = {
                x: stageWidth / 2,
                y: stageHeight / 2
            };
            const radius = 50 * Math.pow(radiusRate, i);
            const speed = 0.25 * Math.pow(speedRate, i);
            const color = {
                r: 0,
                g: 0,
                b: 255,
                a: 0.8 * Math.pow(opacityRate, i)
            };
            this.comets.push(new Comet(pos, radius, speed, color))
        }
    }

    move(point) {
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