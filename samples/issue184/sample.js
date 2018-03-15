import expect from 'expect.js';
import { default as addOneToEachB, __RewireAPI__ as Module } from './src/module.js';

describe('Subject of forIn Loop', () => {
	it('should be rewireable', () => {
		expect(addOneToEachB()).to.eql([ 4, 7, 2 ]);
		Module.__set__('b', [13, 42]);
		expect(addOneToEachB()).to.eql([ 14, 43 ]);
		Module.__reset__('b');
	});
});

