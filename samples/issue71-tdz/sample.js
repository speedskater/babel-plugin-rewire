import expect from 'expect.js';

import { default as indexDefault, getLogConstant } from './src/index.js';

describe('issue71', () => {
	it('should work', () =>{
		expect(getLogConstant()).to.be('main');
	});

	it('should contain all necessarry proeprties on the RewireAPI Object of the default export', () => {
		expect(indexDefault.message === 'test').to.be(true);
		expect(indexDefault.__get__ !== undefined).to.be(true);
		expect(indexDefault.__RewireAPI__ !== undefined).to.be(true);
	})
});
