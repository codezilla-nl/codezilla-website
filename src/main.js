import Navigation from './classes/Navigation.js'
import Triangles from './classes/Triangles.js'
import Carousel from './classes/Carousel.js'

class Main {
    constructor() {
        const nav = new Navigation('[cz-menu]', '#body-container');

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
