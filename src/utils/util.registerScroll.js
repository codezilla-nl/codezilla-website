export default class UtilRegisterScroll {
    constructor(cb, type) {
        this.lastScrollY = 0;
        this.ticking = false;
        this.callback = cb || false;
        this.type = type || 'throttle'; // Use 'throttle' (default) or 'requestAnimationFrame'

        this.registerScroll(this.callback, type);
    }

    // Register scroll event
    registerScroll(callback, type = 'throttle') {
        if (!callback) { return; }

        this.callback = callback;
        this.type = type;

        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    // Handle scroll event.
    onScroll() {
        this.lastScrollY = window.scrollY;

        // Use requestAnimationFrame
        if (this.type === 'requestAnimationFrame') {
            this.handleRequestAnimationFrame();

        // Use throttler
        } else {
            this.throttle(this.callback.bind(this), 100);
        }
    }

    // Use throttle on callback for performance
    throttle(callback, limit) {
        let _self = this;
        if (!_self.ticking) {
            _self.ticking = true;

            setTimeout(function() {
                callback.call();
                _self.ticking = false;
            }, limit);
        }
    }

    // Use requestAnimationFrame on callback when frame animation is important
    handleRequestAnimationFrame() {
        if(!this.ticking) {
            requestAnimationFrame(this.updateFrame.bind(this));
            this.ticking = true;
        }
    }

    // RequestAnimationFrame wrapper. Used by handleRequestAnimationFrame
    requestAnimationFrame() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }

    // Handles animationFrame callback. Used by handleRequestAnimationFrame
    updateFrame() {
        this.callback.call();
        this.ticking = false;
    }
}
