const SKEWED_CLASSNAME = 'cz-body-container--skewed';
const OVERLAY_ACTIVE_CLASSNAME = 'cz-body-container__loader-overlay--active';
const BUTTON_ACTIVE_CLASSNAME = 'mb-menu--active';

export default class Navigation {
    constructor(options) {
        this.$content = document.querySelector(options.content);
        this.$contentOverlay = document.querySelector(`${options.content}-overlay`);
        this.$switch = document.querySelector(options.switch);

        this._open = false;

        this.setListeners();
    }

    setListeners() {
        this.$switch.addEventListener('click', (e) => {
            this.open = !this.open;
        });
    }

    set open(isOpen) {
        this._open = isOpen;

        if(isOpen) {
            this.$content.classList.add(SKEWED_CLASSNAME);
            this.$contentOverlay.classList.add(OVERLAY_ACTIVE_CLASSNAME);
            this.$switch.classList.add(BUTTON_ACTIVE_CLASSNAME);
        } else {
            this.$content.classList.remove(SKEWED_CLASSNAME);
            this.$contentOverlay.classList.remove(OVERLAY_ACTIVE_CLASSNAME);
            this.$switch.classList.remove(BUTTON_ACTIVE_CLASSNAME);
        }
    }

    get open() {
        return this._open;
    }
}
