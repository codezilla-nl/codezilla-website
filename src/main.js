import Foo from './classes/Foo.js'
import DiamondSplitPanel from './classes/DiamondSplitPanel';
import Triangles from './classes/Triangles.js'
import Carousel from './classes/Carousel.js'

class Main {
    constructor() {
        //new Foo();
        new DiamondSplitPanel();
        const triangles = new Triangles('#cz-triangles-header');
        triangles.addGlobalListeners(); // TODO: this could be nicer

        const carousel = new Carousel('[cz-carousel]');
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
