import { __ModuleAPI__ as ComponentToTestModule } from './src/WelcomePanel';

import ComponentToTest from './src/WelcomePanel';

'use strict';

describe('Tests General Configuration', function () {

	beforeEach(function () {
		ComponentToTestModule.__set__('node', "hey I'm mock");
	});

	it('should not be null', function () {
		let panel = new ComponentToTest.WelcomePanel();
		panel.initPanel('body', 'This is message no ');
	});

	afterEach(function () {
		ComponentToTestModule.__reset__('node');
	});
});