import { config } from './src/config.js';
import expect from 'expect.js';

describe('Test issue 29', function() {

	it('test get config', function() {
		expect(config.mode).to.equal('development');
	});
});
