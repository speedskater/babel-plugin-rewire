'use strict'

import BoolObject from './src/ExportsBoolPrimitive.js';
import StringObject from './src/ExportsStringPrimitive.js';
import NumberObject from './src/ExportsNumberPrimitive.js';

import expect from 'expect.js';

describe('Primitive', function(){

	function expectRewireProperties(object) {
		expect(typeof object.__Rewire__ == 'function').to.be(true);
		expect(typeof object.__set__ == 'function').to.be(true);
		expect(typeof object.__get__ == 'function').to.be(true);
		expect(typeof object.__GetDependency__ == 'function').to.be(true);
		expect(typeof object.__ResetDependency__ == 'function').to.be(true);
	}

  it('export rewireing of primitive bool', function(){
    expect(BoolObject == true).to.be(true);
		expectRewireProperties(BoolObject);
  });

	it('export rewireing of primitive number', function(){
		expect(NumberObject == 7).to.be(true);
		expectRewireProperties(NumberObject);
	});

	it('export rewireing of primitive string', function(){
		expect(StringObject == 'test').to.be(true);
		expectRewireProperties(StringObject);
	});
});
