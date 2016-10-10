import MyClass from './src/MyClass';

import expect from 'expect.js';

describe('issue163-should-work-with-default-export', function() {
	it('returns the correct default export', function() {
		expect(new MyClass().foo()).to.be('bar');
	});
});
