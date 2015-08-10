import ModuleToTest from './src/ModuleToTest.js';
import expect from 'expect.js';

describe('sample rewires a function which is called before declaration. ', () => {

	it('should export Hello World', () =>{
		expect(ModuleToTest).to.equal('Hello World!');
	});
});
