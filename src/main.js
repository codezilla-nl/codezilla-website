import Foo from './classes/Foo.js'
import Triangles from './classes/Triangles.js'

class Main {
    constructor() {
        // new Foo();
        const footer = new Triangles('.cz-footer__triangles');
        footer.addGlobalListeners(); // TODO: this could be nicer
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
