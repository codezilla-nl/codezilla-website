import Triangles from './classes/Triangles.js'

class Main {
    constructor() {
        new Triangles();
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
