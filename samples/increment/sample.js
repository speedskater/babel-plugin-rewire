import incrementCallCount from './src/incrementCallCount.js';
import expect from 'expect.js';

describe('sample which increments a global call count. ', () => {

	it('should work', () =>{
		expect(incrementCallCount()).to.equal(2);
		expect(incrementCallCount()).to.equal(3);
		expect(incrementCallCount()).to.equal(4);
	});
});
