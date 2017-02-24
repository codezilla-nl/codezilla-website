import Foo from './classes/Foo.js'
import Triangles from './classes/Triangles.js'
import Carousel from './classes/Carousel.js'

class Main {
    constructor() {
        // new Foo();
    
        const carousel = new Carousel('[cz-carousel]');
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
