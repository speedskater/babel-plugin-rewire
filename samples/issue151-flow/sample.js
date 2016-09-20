import l10n from './src/testModuleWithFlowAnnotations';
import expect from 'expect.js';

describe('TestModuleWithFlowAnnotations', () => {
	it('should work', () => {
		expect(l10n.separators).to.eql({
			decimalSeparator: '',
			thousandsSeparator: ''
		})
	});
});