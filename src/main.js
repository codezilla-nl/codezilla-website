import Eastereggs from './classes/Easter-eggs';

class Main {
    constructor() {
        new Eastereggs();

    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
