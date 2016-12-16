export default class Eastereggs {
    constructor() {
        this.clicks = 0;
        document.getElementById('logo').addEventListener('click', this.counter.bind(this), false);
    }

    counter() {
        this.clicks++;

        if (this.clicks % 3 === 0) {
            this.growl();
        }
    }

    growl() {
        console.log('GROWL');
        
        // audio
    }

    shaker() {
        console.log('SHAKER');
        // screen shaker
    }
}