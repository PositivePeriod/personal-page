class App {
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.radius = 0

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

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
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.radius += 1
        if (this.radius >= Math.min(this.stageWidth, this.stageHeight)*0.5) {
            this.radius = 0
        }

        this.ctx.fillStyle = '#cddb49';
        this.ctx.beginPath();
        this.ctx.arc(
            this.stageWidth / 2,
            this.stageHeight / 2,
            this.radius,
            0, 2 * Math.PI
    );
    this.ctx.fill();
    }
}

window.onload = () => {
    new App();
}