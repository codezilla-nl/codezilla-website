import Triangles from './classes/Triangles.js'

class Main {
    constructor() {
        var triangles = new Triangles('#triangles');
        triangles.addGlobalListeners(); // TODO: this could be nicer
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
