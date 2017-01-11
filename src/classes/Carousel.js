export default class {
    constructor(instance) {
        const el = document.querySelector(instance);
        this.cycle = undefined;
        this.slides = el.children;
        this.options = {
            interval: 6000,
            class: {
                current: 'cz-carousel--current',
                transition: 'cz-carousel--transition'
            }
        };

        if (!el.nodeName) {
            console.error(`Carousel ${el} is not a valid HTML element`);
            return;
        }
        this.carousel = instance;
        
        //Show First slide
        this.slides[0].classList.add(this.options.class.current);
        this.init();
    }

    init() {
        var _self = this;
        this.cycle = setInterval(function() { _self.next() }, _self.options.interval);
    }

    next() {
        let current, next;
        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].classList.value.indexOf(this.options.class.current) > -1) {
                current = this.slides[i];
                next = (i + 1 < this.slides.length) ? this.slides[i+1] : this.slides[0];
            }
        }

        current.classList.add(this.options.class.transition);

        //on transitionend
        let _self = this;
        setTimeout(function() {
            current.classList.remove(_self.options.class.transition);
            current.classList.remove(_self.options.class.current);
            next.classList.add(_self.options.class.current);
        }, 1600);

    }

    //get from rabo
    // el.addEventListener('webkitTransitionEnd', vm.transitionEnd(someEl), false);

    // };

    // vm.transitionEnd = function(somEl) {
    //     angular.element(somEl).removeClass('animating'); 
    // };

    // set bar(value) {
    //     this.bar = value;
    // }

}
