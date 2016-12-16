export default class KonamiCode {
    constructor() {
        this.keyCodesEnum = {
            KEY_UP: 38,
            KEY_DOWN: 40,
            KEY_LEFT: 37,
            KEY_RIGHT: 39,
            SPACE: 32,
            B: 66,
            A: 65,
            Q: 81,
            ESCAPE: 27
        };
        this.initialize();
    }

    initialize() {
        this.addListener('keydown', this.keyDownHandler.bind(this));
    }

    addListener(type, handler) {
        document.addEventListener(type, event => handler(event));
    }

    keyDownHandler(event) {
        console.log(event);
        switch (event.keyCode) {
            case this.keyCodesEnum.KEY_UP:
                console.log('going up', event.key);
                break;
            case this.keyCodesEnum.KEY_DOWN:
                console.log('going down', event.key);
                break;
            case this.keyCodesEnum.KEY_LEFT:
                console.log('going left', event.key);
                break;
            case this.keyCodesEnum.KEY_RIGHT:
                console.log('going right', event.key);
                break;
            case this.keyCodesEnum.A:
                console.log('A', event.key);
                break;
            case this.keyCodesEnum.B:
                console.log('B', event.key);
                break;
            case this.keyCodesEnum.Q:
            case this.keyCodesEnum.ESCAPE:
                console.log('Escape', event.key);
                break;
            case this.keyCodesEnum.SPACE:
                console.log('space', event.key);
                break;
            default:
                break;
        }
    }
}
