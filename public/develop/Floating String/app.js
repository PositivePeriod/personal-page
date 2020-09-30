import {
    MarqueeGroup
} from './script/marqueegroup.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.stageWidth = document.body.clientWidth;

        this.marqueeGroup = new MarqueeGroup(8, this.ctx);

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

        this.marqueeGroup.resize(this.stageWidth, this.stageHeight, this.ctx);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        this.ctx.fillStyle = 'rgba(30, 30, 30, 1)'
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

        this.marqueeGroup.draw(this.ctx);
    }
}

window.onload = () => {
    new App();
}