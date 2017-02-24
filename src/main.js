import Navigation from './classes/Navigation.js'
import Triangles from './classes/Triangles.js'
import Carousel from './classes/Carousel.js'
import SmoothZilla from 'smooth-zilla' 

class Main {
    constructor() {
        console.log(`window.location.hash`, window.location.hash);
        
        const nav = new Navigation('[cz-menu]', '#body-container');

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
