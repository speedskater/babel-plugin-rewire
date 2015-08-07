'use strict'

import BoolObject from './src/ExportsBoolPrimitive.js';
import StringObject from './src/ExportsStringPrimitive.js';
import NumberObject from './src/ExportsNumberPrimitive.js';

var BoolObjectFromRewireJS = require('./src/ExportsBoolPrimitiveViaCommonJs.js');
var StringObjectFromRewireJS = require('./src/ExportsStringPrimitiveViaCommonJs.js');
var NumberObjectFromRewireJS = require('./src/ExportsNumberPrimitiveViaCommonJs.js');

import expect from 'expect.js';

describe('Primitive', function(){

	function expectRewireProperties(object) {
		expect(typeof object.__Rewire__ == 'function').to.be(true);
		expect(typeof object.__set__ == 'function').to.be(true);
		expect(typeof object.__get__ == 'function').to.be(true);
		expect(typeof object.__GetDependency__ == 'function').to.be(true);
		expect(typeof object.__ResetDependency__ == 'function').to.be(true);
	}

  it('rewireing of exported primitive bool', function(){
    expect(BoolObject == true).to.be(true);
		expectRewireProperties(BoolObject);
  });

	it('rewireing of exported primitive bool via common js', function(){
		expect(BoolObjectFromRewireJS == false).to.be(true);
		expectRewireProperties(BoolObject);
	});

	it('rewireing of exported primitive number', function(){
		expect(NumberObject == 7).to.be(true);
		expectRewireProperties(NumberObject);
	});

	it('rewireing of exported primitive number via common js', function(){
		expect(NumberObjectFromRewireJS == 4).to.be(true);
		expectRewireProperties(NumberObjectFromRewireJS);
	});

	it('rewireing of exported primitive string', function(){
		expect(StringObject == 'test').to.be(true);
		expectRewireProperties(StringObject);
	});

	it('rewireing of exported primitive string via common js', function(){
		expect(StringObjectFromRewireJS == 'test common js').to.be(true);
		expectRewireProperties(StringObjectFromRewireJS);
	});
});
