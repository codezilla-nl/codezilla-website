import Foo from './classes/Foo.js'
import KonamiCode from './classes/KonamiCode.js'

class Main {
    constructor() {
        new Foo();
        new KonamiCode();
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
