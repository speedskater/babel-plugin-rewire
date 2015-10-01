import DefaultExport from './src/DefaultExport.js';
import expect from 'expect.js';

describe('Added rewire properties', function() {
	it('should not be enumerable', function() {
			expect(Object.keys(DefaultExport).length).to.be(1);
			expect(Object.keys(DefaultExport)[0]).to.be('hello');
		});
});
