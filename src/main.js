import Foo from './classes/Foo.js'

class Main {
    constructor() {
        new Foo();
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
