import expect from 'expect.js';

import { userCreatedAt, __RewireAPI__ } from './src/objectRestPropertyModule';

describe('TestModuleWithComplexObjectSpreads', () => {
	it('should work', () => {
		expect(userCreatedAt()).to.eql(10000229393)
		__RewireAPI__.__Rewire__('metadata', { createdAt: 987654321 })
		expect(userCreatedAt()).to.eql(987654321)
	});
});