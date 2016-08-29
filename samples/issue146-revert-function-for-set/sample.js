import { default as getHiddenValue, __set__, __RewireAPI__ } from './src/getHiddenValue.js';
import expect from 'expect.js';

describe('__set__', function() {
	it('should return a working revert function, when passed as named export', function() {
		expect(getHiddenValue()).to.be(1234);
		let revertFunction = __set__('hiddenValue', 2344);
		expect(getHiddenValue()).to.be(2344);
		revertFunction();
		expect(getHiddenValue()).to.be(1234);
	});

	it('should return a working revert function, when used on the monkey patched function on the default export', function() {
		expect(getHiddenValue()).to.be(1234);
		let revertFunction = getHiddenValue.__set__('hiddenValue', 2345);
		expect(getHiddenValue()).to.be(2345);
		revertFunction();
		expect(getHiddenValue()).to.be(1234);
	});

	it('should return a working revert function, when used on the __RewireAPI__ object', function() {
		expect(getHiddenValue()).to.be(1234);
		let revertFunction = __RewireAPI__.__set__('hiddenValue', 3345);
		expect(getHiddenValue()).to.be(3345);
		revertFunction();
		expect(getHiddenValue()).to.be(1234);
	});
});