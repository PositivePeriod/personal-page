const PI2 = Math.PI * 2;

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.gradient = this.ctx.createLinearGradient(this.stageWidth/2, this.stageHeight/2-this.radius, this.stageWidth/2, this.stageHeight/2+this.radius);
        this.gradient.addColorStop(0, '#EE5E90');
        this.gradient.addColorStop(1, '#4CD5CD');

        this.theta = 0;
        this.theta2 = 0;
        this.theta3 = 0;

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.radius = Math.min(this.stageWidth, this.stageHeight)/3
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.ctx.fillStyle = this.gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth/2, this.stageHeight/2, this.radius, 0, PI2);
        this.ctx.fill();

        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        var x = this.radius/2*Math.cos(this.theta);
        var y = this.radius/2*Math.sin(this.theta);
        this.ctx.arc(this.stageWidth/2+x, this.stageHeight/2+y, this.radius/6, 0, PI2);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth/2-x, this.stageHeight/2-y, this.radius/6, 0, PI2);
        this.ctx.fill();

        this.ctx.beginPath();
        var x = this.radius/2*Math.cos(this.theta2);
        var y = this.radius/2*Math.sin(this.theta2);
        this.ctx.arc(this.stageWidth/2+x, this.stageHeight/2+y, this.radius/12, 0, PI2);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth/2-x, this.stageHeight/2-y, this.radius/12, 0, PI2);
        this.ctx.fill();

        this.ctx.beginPath();
        var x = this.radius/2*Math.cos(this.theta3);
        var y = this.radius/2*Math.sin(this.theta3);
        this.ctx.arc(this.stageWidth/2+x, this.stageHeight/2+y, this.radius/24, 0, PI2);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.stageWidth/2-x, this.stageHeight/2-y, this.radius/24, 0, PI2);
        this.ctx.fill();

        var tempTheta = this.theta;
        while (tempTheta > PI2) {
            tempTheta -= PI2;
        }
        this.theta += (PI2-tempTheta) * 0.003 + 0.01


        this.theta2 += (this.theta-this.theta2) * 0.04

        this.theta3 += (this.theta2-this.theta3) * 0.07

        if (this.theta > PI2 && this.theta2 > PI2 && this.theta3 > PI2) {
            this.theta -= PI2;
            this.theta2 -= PI2;
            this.theta3 -= PI2;
        }

    }
}

window.onload = () => {
    new App();
}