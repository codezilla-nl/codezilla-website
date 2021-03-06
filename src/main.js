import Navigation from './classes/Navigation';
import DiamondSplitPanel from './classes/DiamondSplitPanel';
import Carousel from './classes/Carousel.js';
import BodyLocker from './classes/BodyLocker';

class Main {
    
    constructor() {
        const nav = new Navigation('[cz-menu]', '#body-container');
        const bodyLocker = new BodyLocker();
        new DiamondSplitPanel(bodyLocker, nav);

        // only create a carousel when the attribute cz-carousel is present
        if (document.querySelector('[cz-carousel]') !== null) {
            const carousel = new Carousel('[cz-carousel]');
        }
        if (document.querySelector('[cz-bedrijven-carousel]') !== null) {
            const carousel2 = new Carousel('[cz-bedrijven-carousel]', {
                interval: 6000,
                equaliseHeight: true,
                class: {
                    current: 'cz-bedrijven-carousel--current',
                    item: 'cz-bedrijven-carousel--item',
                    transition: 'cz-bedrijven-carousel--transition',
                    navigation: {
                        next: 'cz-bedrijven-carousel--next',
                        previous: 'cz-bedrijven-carousel--previous'
                    }
                }
            });
        }
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
