export default class Foo {
    constructor() {
        this.qux = true;

        this.bar('foo');
    }

    
    bar(value) {
        this.bar = value;
    }
}
