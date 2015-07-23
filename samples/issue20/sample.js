import ComponentToTest from './src/WelcomePanel';

'use strict'

describe('Tests General Configuration', function(){

	beforeEach(function() {
		ComponentToTest.__Rewire__('node',"hey I'm mock");
	});

	it('should not be null', function(){
		let panel = new ComponentToTest.WelcomePanel();
		panel.initPanel('body','This is message no ');
	})

	afterEach(function() {
		ComponentToTest.__ResetDependency__('node');
	});
});


