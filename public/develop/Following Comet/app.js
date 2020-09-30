import {
    CometGroup
} from './cometGroup.js';


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
        this.cometgroup = new CometGroup(10, this.stageWidth, this.stageHeight);

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

        this.cometgroup.move(this.mouse);
        this.cometgroup.draw(this.ctx);

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