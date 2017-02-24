import whichTransitionEvent from '../utils/util.whichTransitionEvent';

const SKEWED_CLASSNAME = 'cz-body-container--skewed';
const OVERLAY_ACTIVE_CLASSNAME = 'cz-body-container__loader-overlay--active';
const BUTTON_ACTIVE_CLASSNAME = 'cz-menu-button--active';
const MENU_LINK_ACTIVE_CLASSNAME = 'cz-navigation__list-link--active';

export default class Navigation {
    constructor(nav, content, isOpen) {
        this.$nav = document.querySelector(nav);
        this.$content = document.querySelector(content);
        this.$contentOverlay = document.querySelector(`${content}-overlay`);
        this.$switch = this.$nav.querySelector('[cz-menu-button]');
        this.$links = this.$nav.getElementsByTagName('a');
        
        this._open = false;
        this._loading = false;

        this.open = isOpen;

        this.setListeners();
        this.setActiveLink();
    }

    setListeners() {
        this.$switch.addEventListener('click', (e) => {
            this.open = !this.open;
        });

        [...this.$links].forEach(($link) => {
            $link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate($link.getAttribute('href'));
            });
        });
    }

    setActiveLink() {
        [...this.$links].forEach(($link) => {
            if ($link.getAttribute('href') === window.location.pathname) {
                $link.classList.add(MENU_LINK_ACTIVE_CLASSNAME);
            }
        });
    }

    set open(isOpen) {
        this._open = isOpen;

        if(isOpen) {
            this.$content.classList.add(SKEWED_CLASSNAME);
            this.$switch.classList.add(BUTTON_ACTIVE_CLASSNAME);
        } else {
            this.$content.classList.remove(SKEWED_CLASSNAME);
            this.$contentOverlay.classList.remove(OVERLAY_ACTIVE_CLASSNAME);
            this.$switch.classList.remove(BUTTON_ACTIVE_CLASSNAME);
        }
    }

    set loading(isLoading) {
        this._loading = isLoading;

        if(isLoading) {
            this.$contentOverlay.classList.add(OVERLAY_ACTIVE_CLASSNAME);
        } else {
            this.$contentOverlay.classList.remove(OVERLAY_ACTIVE_CLASSNAME);
        }
    }

    get loading() {
        return this._loading;
    }

    get open() {
        return this._open;
    }

    navigate(href) {
        var transitionEvent = whichTransitionEvent();

        this.open = false;

        transitionEvent && this.$content.addEventListener(transitionEvent, function() {
            window.location = href;
        });
    }
}
