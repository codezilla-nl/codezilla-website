export default class Eastereggs {
    constructor() {
        this.clicks = 0;
        this.executeAfterxTimes = 5;
        this.audiosrc = 'audio/growl.mp3';
        this.audio = document.createElement('audio');
        document.getElementById('logo').addEventListener('click', this.counter.bind(this), false);
    }

    counter() {
        this.clicks++;

        if (this.clicks % this.executeAfterxTimes === 0) {
            this.growl();
        }
    }

    growl() {
        this.audio.src = this.audiosrc;
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();
        this.shaker('page');

        this.audio.addEventListener('ended', this.stopShaking.bind(this));
    }

    shaker(element) {
        document.getElementById(element).classList.add('shaker');
    }

    stopShaking() {
        document.querySelectorAll('.shaker').forEach((el) => {
            el.classList.remove('shaker');
        });
    }
}
