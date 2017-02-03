import Navigation from './classes/Navigation.js'
import Triangles from './classes/Triangles.js'
import Carousel from './classes/Carousel.js'
import SmoothZilla from 'smooth-zilla' 

class Main {
    constructor() {
        const nav = new Navigation({
            content: '#body-container',
            switch: '[cz-navigation-switch]'
        });

        const triangles = new Triangles('#cz-triangles-header');
        triangles.addGlobalListeners(); // TODO: this could be nicer

        const carousel = new Carousel('[cz-carousel]');
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
