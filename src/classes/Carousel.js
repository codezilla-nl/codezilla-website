export default class Carousel {
    constructor(instance) {
        if (!isElement(instance)) {
            console.error(`Carousel ${instance} is not a valid HTML element`);
            return;
        }
        this.carousel = instance;
        
        console.info('aaa', instance);
    }


    // set bar(value) {
    //     this.bar = value;
    // }

    isElement(o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    }
}
