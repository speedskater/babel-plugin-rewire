import ComponentToTest from './src/ComponentToTest.js';
import expect from 'expect.js';

describe('Tests General Configuration', function(){
	it('should not be null', function(){
		ComponentToTest.__Rewire__('node','hey I\'m mock');
		let a = ['a','b','c'];
		for( let b of a) {
			expect(ComponentToTest.__GetDependency__('node')).to.be('hey I\'m mock');
		}
		ComponentToTest.__ResetDependency__('node');
		expect(ComponentToTest.__GetDependency__('node').isMock).to.be(false);
	})
})

