
import Eastereggs from './classes/Easter-eggs';
import Triangles from './classes/Triangles.js';

class Main {
    constructor() {
        var triangles = new Triangles('#triangles');
        triangles.addGlobalListeners(); // TODO: this could be nicer
        new Eastereggs();
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
