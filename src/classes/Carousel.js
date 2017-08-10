import { listenForTransitionEnd } from '../utils/util.listenForEnd.js';

export default class {
    constructor(instance, options = {}) {
        this.el = document.querySelector(instance);
        this.cycle = undefined;
        this.options = Object.assign({
            interval: 5000, // set to 0 to disable
            equaliseHeight: false,
            class: {
                current: 'cz-carousel--current',
                item: 'cz-carousel--item',
                transition: 'cz-carousel--transition',
                navigation: {
                    next: 'cz-carousel-next',
                    previous: 'cz-carousel-previous',
                }
            }
        }, options);
        this.slides = this.el.querySelectorAll('.'+this.options.class.item);

        // TODO: Fix height issues with CSS instead of js
        if (this.options.equaliseHeight) {
            this.el.style.height = Array.from(this.slides).reduce((maxHeight, slide) => {
                return slide.offsetHeight > maxHeight ? slide.offsetHeight : maxHeight;
            }, 0) + 'px';
        }

        if (!this.el.nodeName) {
            console.error(`Carousel ${this.el} is not a valid HTML element`);
            return;
        }
        this.carousel = instance;
        
        //Show First slide
        this.slides[0].classList.add(this.options.class.current);
        this.init();
        this.addListeners();
    }

    init() {
        var _self = this;
        if (_self.options.interval > 0) {
            this.cycle = setInterval(function() { _self.slide('right') }, _self.options.interval);
        }
    }

    addListeners() {
        var _self = this;

        const next = this.el.querySelector(`.${this.options.class.navigation.next}`);   
        if (next) {
            next.addEventListener('click', function() {
                _self.triggerSlide('right');
            });
        }

        const previous = this.el.querySelector(`.${this.options.class.navigation.previous}`);
        if (previous) {
            previous.addEventListener('click', function() {
                _self.triggerSlide('left');
            });
        }
    }

    triggerSlide(direction) {
        if (!direction) {
            return;
        }

        this.slide(direction);
        window.clearInterval(this.cycle);
        this.init();
    }

    slide(direction) {
        let current, next;

        if (direction) {
            this.el.setAttribute('cz-carousel-direction', direction);
        }

        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].classList.value.indexOf(this.options.class.current) > -1) {
                current = this.slides[i];

                if (direction === 'right') {
                    next = (i + 1 < this.slides.length) ? this.slides[i+1] : this.slides[0];
                } else {
                    next = (i - 1 > 0) ? this.slides[i-1] : this.slides[this.slides.length-1];
                }
            }
        }


        current.classList.add(this.options.class.transition);

        let _self = this;
        listenForTransitionEnd(current, function() {
            current.classList.remove(_self.options.class.transition);
            current.classList.remove(_self.options.class.current);
            next.classList.add(_self.options.class.current);
        });
    }
}
