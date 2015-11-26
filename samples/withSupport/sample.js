import { __RewireAPI__, default as getTestValue } from './src/getTestValue.js';

import expect from 'expect.js';

describe('__with__', function() {
	it('should rewire the specified properties until the callback was executed', function() {
		let rewiredTestValue = null;
		expect( __RewireAPI__.__GetDependency__('test')).to.be(500);
		__RewireAPI__.__with__({
			test: 2000
		})(function() {
			expect( __RewireAPI__.__GetDependency__('test')).to.be(2000);
			rewiredTestValue = getTestValue();
		});
		expect(rewiredTestValue).to.be(2000);
		expect( __RewireAPI__.__GetDependency__('test')).to.be(500);
	});

	it('should return the value returned by the callback', function() {
		let rewiredTestValue = null;
		expect( __RewireAPI__.__GetDependency__('test')).to.be(500);
		let result = __RewireAPI__.__with__({
			test: 2000
		})(function() {
			expect( __RewireAPI__.__GetDependency__('test')).to.be(2000);
			rewiredTestValue = getTestValue();
			return 'callbackResult';
		});
		expect(result).to.be('callbackResult');
		expect(rewiredTestValue).to.be(2000);
		expect( __RewireAPI__.__GetDependency__('test')).to.be(500);
	});

	it('should rewire the specified properties until the promise was resolved', function() {
		let resolvePromise;
		let promiseWasResolved = false;

		let promise = __RewireAPI__.__with__({
			test: 2000
		})(function() {
			expect( __RewireAPI__.__GetDependency__('test')).to.be(2000);
			let rewiredTestValue = getTestValue();
			return new Promise(function(resolve) {
				resolvePromise = function () {
					resolve(rewiredTestValue)
				};
			});
		}).then(function(value) {
			promiseWasResolved = true;
			expect(value).to.be(2000);
			expect( __RewireAPI__.__GetDependency__('test')).to.be(500);
		});

		expect(promiseWasResolved).to.be(false);
		expect(__RewireAPI__.__GetDependency__('test')).to.be(2000);
		resolvePromise();
		return promise;
	});
});