import { namedFunction } from './src/Reexport.js';
import expect from 'expect.js';

describe('Tests named function', function() {
	it('should reexport the named function', function() {
		expect(namedFunction(5)).to.be(6);
	});
});
