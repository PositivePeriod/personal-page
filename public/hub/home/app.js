class App {
    constructor() {
        this.notifier = document.getElementsByClassName("scroll-notifier")[0];
        this.elems = document.getElementsByClassName("op");
        window.addEventListener("scroll", this.scroll.bind(this));
    }

    scroll() {
        this.notifier.innerHTML = Math.round(window.scrollY).toString();
        this.checkPosition();
    }

    checkPosition() {
        for (var i = 0; i < this.elems.length; i++) {
            var posFromTop = this.elems[i].getBoundingClientRect().top;
            if (posFromTop <= window.innerHeight) {
                this.elems[i].className = this.elems[i].className.replace("fade-out", "fade-in");
            } else {
                this.elems[i].className = this.elems[i].className.replace("fade-in", "fade-out");
            }
        }
    }
}

window.onload = function () {
    new App();
}

function getElemsHeight(elems) {
    elemsHeight = [];
    for (var i = 0; i < elems.length; i++) {
        elemsHeight.push(elems[i].getBoundingClientRect().top - windowHeight)
    }
}
/*
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
}*/