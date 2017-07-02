module.exports = {
    url: function() {
        return this.api.launchUrl;
    },
    elements: {
        h1: 'h1',
        bodyContainer: '#body-container',
        staticHeader: 'header.cz-header-static'
    },
    sections: {
        nav: {
            selector: 'nav',
            elements: {
                menuButton: '[cz-menu-button]',
                menuItem: 'nav .cz-navigation__list-item:nth-child(2)'
            }
        },
        carousel: {
            selector: 'header',
            elements: {
                firstSlide: 'li.cz-carousel--item:nth-child(1)',
                firstSlideHeader: 'li.cz-carousel--item:nth-child(1) h1',
                secondSlide: 'li.cz-carousel--item:nth-child(2)',
                secondSlideHeader: 'li.cz-carousel--item:nth-child(2) h1'
            }
        },
        clients: {
            selector: '[cz-bedrijven-carousel]',
            elements: {
                firstSlide: 'li.cz-bedrijven-carousel--item:nth-child(1)',
                firstSlideContent: 'li.cz-bedrijven-carousel--item:nth-child(1) .media-block__content',
                secondSlide: 'li.cz-bedrijven-carousel--item:nth-child(2)',
                secondSlideContent: 'li.cz-bedrijven-carousel--item:nth-child(2) .media-block__content',
                nextButton: '.cz-bedrijven-carousel--next'
            }
        }
    }
};
