import ComponentToTest from './src/ComponentToTest.js';
import expect from 'expect.js';

for( let b of a) {
	expect(ComponentToTest.__Get__('node')).to.be('hey I\'m mock');
}
