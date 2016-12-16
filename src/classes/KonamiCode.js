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
        this.interval = 0;
        this.directionEnum = {
            UP: 'top',
            DOWN: 'bottom',
            LEFT: 'left',
            RIGHT: 'right'
        };


        this.code = [];
        this.konamiCode = [
            this.keyCodesEnum.KEY_UP,
            this.keyCodesEnum.KEY_UP,
            this.keyCodesEnum.KEY_DOWN,
            this.keyCodesEnum.KEY_DOWN,
            this.keyCodesEnum.KEY_LEFT,
            this.keyCodesEnum.KEY_RIGHT,
            this.keyCodesEnum.KEY_LEFT,
            this.keyCodesEnum.KEY_RIGHT,
            this.keyCodesEnum.B,
            this.keyCodesEnum.A,
        ];

        this.events = {
            KEY_DOWN: 'keydown'
        };

        // this.konamiCode = [
        //     this.keyCodesEnum.KEY_UP,
        //     this.keyCodesEnum.KEY_UP
        // ];

        // Binding
        this.codeInputHandler = event => this.codeInputEventHandler(event);
        this.playerInputHandler = event => this.playerInputEventHandler(event);

        this.initialize();
    }

    initialize() {
        this.addListener(this.events.KEY_DOWN, this.codeInputHandler);
    }

    addListener(type, handler) {
        document.addEventListener(type, handler);
    }

    removeListener(type, handler) {
        document.removeEventListener(type, handler);
    }

    // Eventhandler for initial konami code input
    codeInputEventHandler(event) {
        switch (event.keyCode) {
            case this.keyCodesEnum.KEY_UP:
            case this.keyCodesEnum.KEY_DOWN:
            case this.keyCodesEnum.KEY_LEFT:
            case this.keyCodesEnum.KEY_RIGHT:
            case this.keyCodesEnum.A:
            case this.keyCodesEnum.B:
            case this.keyCodesEnum.Q:
                this.code.push(event.keyCode);
                event.preventDefault();
                break;
            case this.keyCodesEnum.ESCAPE:
            case this.keyCodesEnum.SPACE:
                // trigger event quit
                break;
            default:
                break;
        }

        this.isCodeValid(this.code);
    }

    // Eventhandler for player controls
    playerInputEventHandler(event) {
        switch (event.keyCode) {
            case this.keyCodesEnum.KEY_UP:
                this.direction = this.directionEnum.UP;
                break;
            case this.keyCodesEnum.KEY_DOWN:
                this.direction = this.directionEnum.DOWN;
                break;
            case this.keyCodesEnum.KEY_LEFT:
                this.direction = this.directionEnum.LEFT;
                break;
            case this.keyCodesEnum.KEY_RIGHT:
                this.direction = this.directionEnum.RIGHT;
                break;
            default:
                break;
                event.preventDefault();
        }
    }

    // Check if the input code is equal to the Konami Code
    isCodeValid(code) {
        const codeStr = code.join();
        const konamiCodeStr = this.konamiCode.join();

        console.log(`[${codeStr}]`, `[${konamiCodeStr}]`);

        if (codeStr === konamiCodeStr) {
            console.log('code is valid');
            this.initGame();
        } else if (code.length >= 10) {
            this.resetCode();
        }
    }

    // Reset the code array when you each 10 inputs
    resetCode() {
        this.code = [];
    }

    // Initialize the game field, player, monsters, dots.
    initGame() {
        console.log('initing game');
        // const canvas = document.querySelector('.game-field');
        // const ctx = canvas.getContext('2d');
        this.removeListener(this.events.KEY_DOWN, this.codeInputHandler); // remove konami code event

        this.setupPlayer();
    }

    // Build player
    setupPlayer() {
        // const img = new Image();
        // img.onload = () => ctx.drawImage(img, 0, 0);
        // img.src = "/images/team/rory-monster.svg";
        // img.style.position = 'absolute';
        const player = document.querySelector('[data-js=player]');
        player.classList.remove('-hidden');

        this.addListener(this.events.KEY_DOWN, this.playerInputHandler);
        window.requestAnimationFrame(this.movePlayer.bind(this));
    }

    // Draw player movement
    movePlayer() {
        const player = document.querySelector('[data-js=player]');
        console.log('t', this.direction, player.style[this.direction]);

        if (this.direction === this.directionEnum.RIGHT || this.direction === this.directionEnum.DOWN) {
            this.interval += 5;
        }

        if (this.direction === this.directionEnum.LEFT || this.direction === this.directionEnum.UP) {
            this.interval -= 5;
        }

        if (this.direction === this.directionEnum.UP || this.direction === this.directionEnum.DOWN) {
            player.style.top = this.interval + 'px';
        } else {
            player.style.left = this.interval + 'px';
        }

        window.requestAnimationFrame(this.movePlayer.bind(this));
    }
}
