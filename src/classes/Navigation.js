import whichTransitionEvent from '../utils/util.whichTransitionEvent';

const SKEWED_CLASSNAME = 'cz-body-container--skewed';
const OVERLAY_ACTIVE_CLASSNAME = 'cz-body-container__loader-overlay--active';
const BUTTON_ACTIVE_CLASSNAME = 'cz-menu-button--active';
const MENU_LINK_ACTIVE_CLASSNAME = 'cz-navigation__list-link--active';
const BODY_PERSPECTIVE_CLASSNAME = 'cz-body-perspective';

export default class Navigation {
    /**
     * Create a navigation instance
     * @param nav {string} Reference to the navigation element
     * @param content{string} Reference to the content element
     * @param isOpen {Boolean} Defines the initial open state
     */
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

    /**
     * Sets global listeners
     */
    setListeners() {
        this.$switch.addEventListener('click', (e) => {
            this.$switch.blur();
            this.open = !this.open;
        });

        [...this.$links].forEach(($link) => {
            $link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate($link.getAttribute('href'));
            });
        });
    }

    /**
     * Adds an active class to the link for the current page
     */
    setActiveLink() {
        [...this.$links].forEach(($link) => {
            if ($link.getAttribute('href') === window.location.pathname) {
                $link.classList.add(MENU_LINK_ACTIVE_CLASSNAME);
            }
        });
    }

    /**
     * Sets the 'open' state
     * @param isOpen {Boolean}
     */
    set open(isOpen) {
        let transitionEvent = whichTransitionEvent();
        let removePerspective = () => {
            if (!this._open) {
                document.body.classList.remove(BODY_PERSPECTIVE_CLASSNAME);
            }

            this.$content.removeEventListener(transitionEvent, removePerspective);
        };

        this._open = isOpen;

        if (isOpen) {
            document.body.classList.add(BODY_PERSPECTIVE_CLASSNAME);
            this.$content.classList.add(SKEWED_CLASSNAME);
            this.$switch.classList.add(BUTTON_ACTIVE_CLASSNAME);
        } else {
            this.$content.classList.remove(SKEWED_CLASSNAME);
            this.$contentOverlay.classList.remove(OVERLAY_ACTIVE_CLASSNAME);
            this.$switch.classList.remove(BUTTON_ACTIVE_CLASSNAME);
        }

        this.$content.addEventListener(transitionEvent, removePerspective);
    }

    /**
     * Sets the 'loading' state
     * @param isLoading {Boolean}
     */
    set loading(isLoading) {
        this._loading = isLoading;

        if(isLoading) {
            this.$contentOverlay.classList.add(OVERLAY_ACTIVE_CLASSNAME);
        } else {
            this.$contentOverlay.classList.remove(OVERLAY_ACTIVE_CLASSNAME);
        }
    }

    /**
     * Returns the loading state
     * @returns {Boolean}
     */
    get loading() {
        return this._loading;
    }

    /**
     * Returns the open state
     * @returns {Boolean}
     */
    get open() {
        return this._open;
    }

    /**
     * Navigates to a specific url
     * @param href {string} Url href
     */
    navigate(href) {
        let transitionEvent = whichTransitionEvent();
        let setWindowLocation = () => {
            window.location = href;

            this.$content.addEventListener(transitionEvent, setWindowLocation);
        };

        this.open = false;

        transitionEvent && this.$content.addEventListener(transitionEvent, setWindowLocation);
    }
}
