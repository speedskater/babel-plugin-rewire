import { default as RewireExample, __ModuleAPI__ as RewireExampleModule } from './src/RewireExample';
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
		RewireExampleModule.__set__('Database', FakeDatabase);
		expect(RewireExampleModule.__get__('Database')).to.equal(FakeDatabase);
		rewireExample = new RewireExample();
	});

	afterEach(()=> {
		RewireExampleModule.__reset__('Database');
	});

	describe('outputDatabaseInfo function', () => {
		it('should output fakeDatabase when fake database is used', () =>{
			expect(rewireExample.outputDatabaseInfo()).to.be(fakeDatabaseInfo);
		});
	});
});
