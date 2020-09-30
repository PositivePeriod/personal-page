import {
    Marquee
} from './marquee.js'

export class MarqueeGroup {
    constructor(number, ctx) {
        var font = {
            fontWidth: 700,
            fontSize: 60,
            fontName: 'Impact',
            color: {
                r: 200,
                g: 200,
                b: 200,
                a: 1
            }
        };

        const margin = 105;
        const speed = 1.5;

        this.group = [];
        for (let i = 0; i < number; i++) {
            let pos = {
                top: margin*(i-0.5),
                bottom: margin*(i+0.5),
                start: this.getRandomReal(-200, -10)
            }
            let marquee = new Marquee(font, pos, speed, ctx);
            this.group.push(marquee);
        }
    }

    getRandomReal(min, max) {
        return Math.random() * (max - min) + min;
    }

    resize(stageWidth, stageHeight, ctx) {
        this.group.forEach((elem) => {
            elem.resize(stageWidth, stageHeight, ctx)
        });
    }

    draw(ctx) {
        this.group.forEach((elem) => {
            elem.draw(ctx)
        });
    }
}