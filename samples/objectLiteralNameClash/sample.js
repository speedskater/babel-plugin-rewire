import { default as defaultFunction, namedFunction } from './src/ModuleExportingFunction.js';
import expect from 'expect.js';

let firstClash = {
	defaultFunction,
	namedFunction: namedFunction
};

let secondClash = {
	defaultFunction: function() { return 5;  },
	namedFunction: function() { return 'Test'; }
};

describe('Tests whether objects literals will class with usage of named Exports', function() {
	it('should call the imported functions', function() {
		expect(defaultFunction(2)).to.be(3);
		expect(namedFunction(2)).to.be(3);
	});

	it('should no result in a name clash', function() {
		expect(firstClash.defaultFunction(2)).to.be(3);
		expect(firstClash.namedFunction(2)).to.be(3);
		expect(secondClash.defaultFunction()).to.be(5);
		expect(secondClash.namedFunction()).to.be('Test');
	});
});
