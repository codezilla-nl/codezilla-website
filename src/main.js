import Foo from './classes/Foo.js'
import DiamondSplitPanel from './classes/DiamondSplitPanel';
import Triangles from './classes/Triangles.js';
import Carousel from './classes/Carousel.js';
import BodyLocker from './classes/BodyLocker';

class Main {
    
    constructor() {
        const bodyLocker = new BodyLocker();
        //new Foo();
        new DiamondSplitPanel(bodyLocker);
        const triangles = new Triangles('#cz-triangles-header');
        const footer = new Triangles('#cz-triangles-footer');
        triangles.addGlobalListeners(); // TODO: this could be nicer
        //footer.addGlobalListeners(); // TODO: re-enable whenever the perf bug has been fixed

        const carousel = new Carousel('[cz-carousel]');
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
