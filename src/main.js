import Navigation from './classes/Navigation';
import DiamondSplitPanel from './classes/DiamondSplitPanel';
import Triangles from './classes/Triangles.js';
import Carousel from './classes/Carousel.js';
import BodyLocker from './classes/BodyLocker';

class Main {
    
    constructor() {
        const nav = new Navigation('[cz-menu]', '#body-container');
        const bodyLocker = new BodyLocker();
        new DiamondSplitPanel(bodyLocker);
        //const triangles = new Triangles('#cz-triangles-header');
        const footer = new Triangles('#cz-triangles-footer');
        //triangles.addGlobalListeners(); // TODO: this could be nicer
        //footer.addGlobalListeners(); // TODO: re-enable whenever the perf bug has been fixed

        // only create a carousel when the attribute cz-carousel is present
        if (document.querySelector('[cz-carousel]') !== null) {
            const carousel = new Carousel('[cz-carousel]');
        }
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
