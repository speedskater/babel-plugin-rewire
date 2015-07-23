'use strict';

import expect from 'expect.js';
import { run, __Rewire__, __GetDependency__, __ResetDependency__,  } from './src/main.js';

function createPseudoSpy(name) {
	let calls = [];

	let spy = function() {
		calls.push(arguments);
	};

	spy.toHaveBeenCalled = function() {
		return calls.length > 0;
	}

	spy.toHaveBeenCalledWith = function(...expectedArgs) {
		return expectedArgs.every((arg, index) => (calls[0][index] === arg));
	};

	spy.identity = function() { return name; };

	return spy;
}

describe('Main', function() {

	it('calls dependency\'s foo:', function() {
		let spy = createPseudoSpy('my spy');
		__Rewire__('foo', spy);

		run();

		expect(__GetDependency__('foo')).to.be(spy);
		expect(spy.toHaveBeenCalledWith('bar')).to.be(true);

		__ResetDependency__('foo');

		expect(__GetDependency__('foo')).not.to.be(spy);

	});
});
