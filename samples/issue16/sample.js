import RewireExample from './src/RewireExample';
import expect from 'expect.js';

let fakeDatabaseInfo = 'fake database info';

class FakeDatabase {
	get info(){
		return fakeDatabaseInfo;
	}
}

describe('sample rewire issue 16', () => {
	var rewireExample;

	beforeEach(() => {
		RewireExample.__Rewire__('Database', FakeDatabase);
		expect(RewireExample.__GetDependency__('Database')).to.equal(FakeDatabase);
		rewireExample = new RewireExample();
	});

	afterEach(()=> {
		RewireExample.__ResetDependency__('Database');
	});

	describe('outputDatabaseInfo function', () => {
		it('should output fakeDatabase when fake database is used', () =>{
			expect(rewireExample.outputDatabaseInfo()).to.be(fakeDatabaseInfo);
		});
	});
});
