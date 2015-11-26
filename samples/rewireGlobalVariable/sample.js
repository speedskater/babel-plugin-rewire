import { default as print, __RewireAPI__ } from './src/print.js';
import expect from 'expect.js';

describe('Test for rewiring of global variables', function() {
	it('should be able to rewire any global variable', function() {
		var output;
		__RewireAPI__.__set__('print', function(input) {
			output = input;
		});
		print('Hello Global!');
		expect(output).to.be('Hello Global!');
	});
});
