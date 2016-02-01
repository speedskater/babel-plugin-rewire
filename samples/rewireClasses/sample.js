'use strict';

import { returnTheResultOfCallMe, __ModuleAPI__ as ModuleAPI} from './src/ModuleWithClassToRewire.js';

import expect from 'expect.js';

describe('classes', function(){

	it ('should be able to get rewired', function() {
		expect(returnTheResultOfCallMe()).to.be(5);
		ModuleAPI.__set__('A', class B {
			callMe() {
				return 'rewired';
			}
		});
		expect(returnTheResultOfCallMe()).to.be('rewired');
		ModuleAPI.__ResetDependency__('A');
		expect(returnTheResultOfCallMe()).to.be(5);
	});
});
