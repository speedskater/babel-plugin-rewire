'use strict';

import { returnTheResultOfCallMe, __RewireAPI__ as RewireApi} from './src/ModuleWithClassToRewire.js';

import expect from 'expect.js';

describe('classes', function(){

	it ('should be able to get rewired', function() {
		expect(returnTheResultOfCallMe()).to.be(5);
		RewireApi.__set__('A', class B {
			callMe() {
				return 'rewired';
			}
		});
		expect(returnTheResultOfCallMe()).to.be('rewired');
		RewireApi.__ResetDependency__('A');
		expect(returnTheResultOfCallMe()).to.be(5);
	});
});
