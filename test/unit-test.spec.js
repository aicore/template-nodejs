// See https://mochajs.org/#getting-started on how to write tests
// Use chai for BDD style assertions (expect, should etc..). See move here: https://www.chaijs.com/guide/styles/#expect
// use nyc https://github.com/istanbuljs/nyc for coverage docs

import helloWorld from "../src/inedx.js";
import * as assert from 'assert';
import * as chai from 'chai';

let expect = chai.expect;

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            expect([1, 2, 3].indexOf(4)).to.equal(-1);
            assert.equal([1, 2, 3].indexOf(4), -1); // or this, but prefer the above syntax
        });
    });
});

describe('Hello world Tests', function() {
    it('should return Hello World', function() {
        expect(helloWorld()).to.equal('Hello World');
    });
});
