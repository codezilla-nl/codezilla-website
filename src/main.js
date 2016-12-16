import Foo from './classes/Foo.js'
import DiamondSplitPanel from './classes/DiamondSplitPanel';

class Main {
    constructor() {
        new Foo();
        new DiamondSplitPanel();
    }
}

// Start after page has been loaded
window.onload = function() {
    new Main();
};
