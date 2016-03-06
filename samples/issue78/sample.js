import { fn1 } from './src/with-reexports';
import expect from 'expect.js';

describe('issue78', () => {
	it('should allow to call function exported from reexported module', () => {
		expect(fn1()).to.equal(1);
	});
});
