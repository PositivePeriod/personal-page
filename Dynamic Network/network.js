import {
    Ball, MouseBall
} from "./ball.js";

export class Network {
    constructor() {
        this.disLimit = 500;
        this.velLimit = [0.1, 2];
        this.ballRadius = 3;
        this.maxBall = 40;
        this.lineWidth = 0.8;

        this.balls = [];
        this.mouse = {enable:false, pos:{x:null, y:null}};
        this.updateBalls();
    }

    mouseEnter(event){
        this.mouse.enable = true;
        this.mouse.pos = {x: event.pageX, y:event.pageY};
    }

    mouseMove(event){
        this.mouse.pos = {x: event.pageX, y:event.pageY};
    }

    mouseLeave(event){
        this.mouse.enable = false;
    }

    animate(ctx) {
        this.balls.forEach(ball => {
            ball.animate();
            ball.draw(ctx);
        });

        ctx.lineWidth = this.lineWidth;
        var getDistance = (b1, b2) => Math.sqrt(Math.pow(b1.pos.x - b2.pos.x, 2) + Math.pow(b1.pos.y - b2.pos.y, 2));
        for (var i = 0; i < this.balls.length; i++) {
            for (var j = i + 1; j < this.balls.length; j++) {
                var fraction = getDistance(this.balls[i], this.balls[j]) / this.disLimit;
                if (fraction < 1) {
                    var alpha = (1 - fraction).toString();

                    ctx.strokeStyle = 'rgba(150, 150, 150,' + alpha + ')';

                    ctx.beginPath();
                    ctx.moveTo(this.balls[i].pos.x, this.balls[i].pos.y);
                    ctx.lineTo(this.balls[j].pos.x, this.balls[j].pos.y);
                    ctx.stroke();
                }
            }
        }
        if (this.mouse.enable) {
            for (var i = 0; i < this.balls.length; i++) {
                var fraction = getDistance(this.mouse, this.balls[i]) / this.disLimit;
                if (fraction < 1) {
                    var alpha = (1 - fraction).toString();
    
                    ctx.strokeStyle = 'rgba(150, 150, 150,' + alpha + ')';
    
                    ctx.beginPath();
                    ctx.moveTo(this.mouse.pos.x, this.mouse.pos.y);
                    ctx.lineTo(this.balls[i].pos.x, this.balls[i].pos.y);
                    ctx.stroke();
                }
            }
        }
        this.updateBalls();
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    updateBalls() {
        var newBalls = [];

        this.balls.forEach(ball => {
            var inXRange = (-this.disLimit < ball.pos.x) && (ball.pos.x < this.stageWidth + this.disLimit);
            var inYRange = (-this.disLimit < ball.pos.y) && (ball.pos.y < this.stageHeight + this.disLimit);
            if (inXRange && inYRange) {
                newBalls.push(ball);
            }
        });
        this.balls = newBalls;
        if (this.balls.length < this.maxBall) {
            this.balls.push(this.getNewBall());
        }
    }

    getNewBall() {
        const type = ['top', 'right', 'bottom', 'left'];

        var pos = {
            x: getRandomReal(0, this.stageWidth),
            y: getRandomReal(0, this.stageHeight)
        };

        var speed = getRandomReal(this.velLimit[0], this.velLimit[1]);
        var theta = getRandomReal(0, Math.PI * 2);
        var velocity = {
            x: speed*Math.cos(theta),
            y: speed*Math.sin(theta)
        };
        
        switch (type[getRandomInt(0, 4)]) {
            case 'right':
                pos.x = this.stageWidth + this.lineWidth;
                velocity.x = -Math.abs(velocity.x);
                break;
            case 'top':
                pos.y = -this.lineWidth;
                velocity.y = Math.abs(velocity.y);
                break;
            case 'left':
                pos.x = -this.lineWidth;
                velocity.x = Math.abs(velocity.x);
                break;
            case 'bottom':
                pos.y = this.stageHeight + this.lineWidth;
                velocity.y = -Math.abs(velocity.y);
                break;
        }

        var phase = getRandomReal(0, 5);

        return new Ball(pos, velocity, this.ballRadius, phase)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomReal(min, max) {
    return Math.random() * (max - min) + min;
}