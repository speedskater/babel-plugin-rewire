import expect from 'expect.js';

describe('Object assign', function() {
	it('should still work after rewire', function() {
		let test = Object.assign({}, { testValue: 6 });
		expect(test.testValue).to.be(6);
	});
});
