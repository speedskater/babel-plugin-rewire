import getModule1Identifier from './src/Module1.js';
import getModule2Identifier from './src/Module2.js';

import expect from "expect.js";

describe('issue114', function () {
	it('should allow to reset all rewired dependencies', function() {
		expect(getModule1Identifier()).to.be('Module1-Original');
		expect(getModule2Identifier()).to.be('Module2-Original');

		getModule1Identifier.__set__('value', 'module1-rewired');
		getModule2Identifier.__set__('value', 'module2-rewired');

		expect(getModule1Identifier()).to.be('module1-rewired');
		expect(getModule2Identifier()).to.be('module2-rewired');

		__rewire_reset_all__();

		expect(getModule1Identifier()).to.be('Module1-Original');
		expect(getModule2Identifier()).to.be('Module2-Original');
	});
});
