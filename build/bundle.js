class Foo {
	constructor() {
		console.log('ohai');
	}
}

class Main {
    constructor() {
        new Foo();
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};