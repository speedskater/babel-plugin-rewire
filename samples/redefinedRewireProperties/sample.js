import { default as Index, localFunction as localFunctionInIndex, __RewireAPI__ as IndexModule } from './src/index.js';
import { default as MyClass, localFunction as localFunctionInMyClass, __RewireAPI__ as MyClassModule } from './src/MyClass.js';

import expect from 'expect.js';

describe('Test redefine rewire properties', function() {
	it('should ensure that each module should be rewireable independently', function() {
		expect(Index.__Rewire__).to.be(MyClass.__Rewire__);
		expect(IndexModule).not.to.be(MyClassModule);
	})
});
