import Foo from './classes/Foo.js'
import DiamondSplitPanel from './classes/DiamondSplitPanel';
import Triangles from './classes/Triangles.js'

class Main {
    constructor() {
        new Foo();
        new DiamondSplitPanel();
        // new Foo();
        const triangles = new Triangles('#triangles');
        triangles.addGlobalListeners(); // TODO: this could be nicer

    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
