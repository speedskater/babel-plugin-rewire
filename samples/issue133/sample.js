import options from './src/testExportConst.js';
import expect from 'expect.js';

describe('issue133-constVariables', function() {
	it('should be possible to be default exported', function() {
		expect(options.value).to.be('123');
	})
})