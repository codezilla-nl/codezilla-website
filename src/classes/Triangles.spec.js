// Place your hackathon tests here

import Foo from './Foo.js';

const foo = new Foo();

describe('Foo class', function() {
    it('has the correct variables', function() {
        expect(foo.qux).toEqual(true);
    });
});
