import { varA, setVarA, setVarB, setVarC, __RewireAPI__ as  rewire } from './src/module.js';
import expect from 'expect.js';

describe('rewired variables', () => {
	it('should be assigned values to rewired variable', () => {
		expect(varA).to.be(undefined);
		setVarB(5);
		setVarC(9);
		setVarA(true);
		expect(varA).to.be(5);
		setVarA(false);
		expect(varA).to.be(9);
		rewire.__set__('varB', 20);
		setVarA(true);
		expect(varA).to.be(20);
	});
});