import { namedFunction } from './src/ModuleExportingNamedFunction.js';
import expect from 'expect.js';

describe('Tests whether babel-plugin-rewire respects nested variable scopes', function() {
	it('should call the imported functions', function() {
		expect(namedFunction(2)).to.be(3);
	});

	it('should call the local function', function() {
		function namedFunction(arg) {
			return arg * 4;
		}
		expect(namedFunction(2)).to.be(8);
	});
});
