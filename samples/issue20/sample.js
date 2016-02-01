import { __Rewire__, default as WelcomePanel2 } from './src/WelcomePanel2.js';
import ComponentToTest from './src/WelcomePanel';
let DefaultCommonJSExport = require('./src/DefaultExport');

'use strict';

describe('Tests General Configuration', function () {

	beforeEach(function () {
		DefaultCommonJSExport.__GetDependency__('myFunnyDependency')();
		ComponentToTest.__set__('node', "hey I'm mock");
		__Rewire__('anotherthing', 'dong');
	});

	it('should not be null', function () {
		let panel = new ComponentToTest.WelcomePanel();
		panel.initPanel('body', 'This is message no ');
	});

	afterEach(function () {
		ComponentToTest.__ResetDependency__('node');
	});
});
