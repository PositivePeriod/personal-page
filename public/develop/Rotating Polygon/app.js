import {
    Polygon
} from "./polygon.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;

        document.addEventListener('pointerdown', this.onDown.bind(this), false)
        document.addEventListener('pointermove', this.onMove.bind(this), false)
        document.addEventListener('pointerup', this.onUp.bind(this), false)



        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.polygon = new Polygon(
            this.stageWidth / 2,
            this.stageHeight + (this.stageHeight / 4),
            this.stageHeight / 1.5,
            18
        );
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.9;
        this.polygon.animate(this.ctx, this.moveX);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    onDown(event) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = event.clientX;

    }

    onMove(event) {
        if (this.isDown) {
            this.moveX = event.clientX - this.offsetX;
            this.offsetX = event.clientX;
        }
    }

    onUp(event) {
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
}