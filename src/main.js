import Foo from './classes/Foo.js'
import Triangles from './classes/Triangles.js'

class Main {
    constructor() {
        // new Foo();
        const triangles = new Triangles('#triangles');
        const footer = new Triangles('.cz-footer__triangles');
        triangles.addGlobalListeners(); // TODO: this could be nicer
        footer.addGlobalListeners(); // TODO: this could be nicer

    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
