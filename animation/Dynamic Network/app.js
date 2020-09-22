import {
    Network
} from './network.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.network = new Network();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.canvas.addEventListener('mouseenter', this.network.mouseEnter.bind(this.network), false);
        this.canvas.addEventListener('mousemove', this.network.mouseMove.bind(this.network), false);
        this.canvas.addEventListener('mouseleave', this.network.mouseLeave.bind(this.network), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.network.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.network.animate(this.ctx)

        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}