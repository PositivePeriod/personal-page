import {
    CometGroup
} from './cometGroup.js';

const COLOR = {
    red: {
        r: 255,
        g: 0,
        b: 0,
        a: 0.6
    },
    green: {
        r: 0,
        g: 255,
        b: 0,
        a: 0.6
    },
    blue: {
        r: 0,
        g: 0,
        b: 255,
        a: 0.6

    },
    black: {
        r: 0,
        g: 0,
        b: 0,
        a: 0.4
    }
}

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.mouse = {
            x: this.stageWidth / 2,
            y: this.stageHeight / 2
        };

        this.cometgroups = []

        this.cometgroups.push(new CometGroup(4, COLOR.red, 60, 2 * Math.PI * 1 / 3, 0.08, this.stageWidth, this.stageHeight));
        this.cometgroups.push(new CometGroup(4, COLOR.green, 60, 2 * Math.PI * 2 / 3, 0.08, this.stageWidth, this.stageHeight));
        this.cometgroups.push(new CometGroup(4, COLOR.blue, 60, 2 * Math.PI * 3 / 3, 0.08, this.stageWidth, this.stageHeight));

        this.cometgroups.push(new CometGroup(4, COLOR.black, 0, 0, 0.07, this.stageWidth, this.stageHeight));

        this.canvas.addEventListener('mousemove', this.move.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.cometgroups.forEach(cometgroup => {
            cometgroup.move(this.mouse);
            cometgroup.draw(this.ctx);
        });

        window.requestAnimationFrame(this.animate.bind(this));
    }

    move(event) {
        this.mouse = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

window.onload = () => {
    new App();
}