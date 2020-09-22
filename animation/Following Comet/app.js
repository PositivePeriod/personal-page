import {
    Comet
} from './comet.js'

class App {
    constructor() {
        this.comet = new Comet()

        window.addEventListener('mousemove', this.move.bind(this), false);

    }

    move(event) {
        this.comet.move(event)
    }
}

window.onload = () => {
    new App();
}