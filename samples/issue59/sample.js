import { start } from './src/mod1.js';
import expect from 'expect.js';

describe('issue59', function() {
	it('should', function() {
		let result = start();
		expect(result.success).to.be('positive');
		expect(result.failure).to.be('negative');
	});
});
