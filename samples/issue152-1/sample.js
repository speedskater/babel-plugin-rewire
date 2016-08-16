import { asyncFunction } from './src/asyncFunction.js';
import { wasCalled } from './src/anotherFunction.js';
import expect from 'expect.js';

describe('asyncFunction', function() {
	it('should be able to call an async function', function() {
		return asyncFunction().then(_ => {
			expect( wasCalled() ).to.be( true );
		});
	});
});