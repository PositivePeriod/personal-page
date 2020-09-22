export class Comet {
    constructor() {
        this.length = 5;
        for (var i = 0; i < this.length; i++) {
            const component = document.createElement('div');
            component.className = 'indicator'
            document.body.appendChild(component);
        }

        this.duration = 30;
        this.opacity = 0.8
        this.size = 60;
    }

    move(event) {
        const x = event.clientX;
        const y = event.clientY;

        var duration = this.duration;
        var opacity = this.opacity;
        var size = this.size;

        document.body.querySelectorAll('.indicator').forEach(elem => {
            elem.style.opacity = opacity;
            elem.style.width = `${size}px`;
            elem.style.height = `${size}px`;
            const anim = elem.animate({
                transform: `translate(${x-size/2}px, ${y-size/2}px)`
            }, {
                duration: duration,
                fill: 'forwards'
            });
            //anim.onremove = () => {tally.textContent = ++animationTally;};
            duration *= 2;
            size *= 0.9;
            opacity *= 0.8;
        });
    }

}