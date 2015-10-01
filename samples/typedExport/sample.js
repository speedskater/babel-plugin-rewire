import { default as TestModule } from './src/TestModuleWithTypeImport.js';
import expect from 'expect.js';

describe('Test for type imports together with rewiring', function() {
	it('should still work', function() {
		expect( TestModule.hello()).to.be('Hello World!');
		TestModule.__Rewire__('target', 'Test');
		expect( TestModule.hello()).to.be('Hello Test!');
	});
});
