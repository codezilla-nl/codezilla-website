import Foo from './classes/Foo.js'
import Triangles from './classes/Triangles.js'

class Main {
    constructor() {
        // new Foo();
        new Triangles('#triangles');
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
