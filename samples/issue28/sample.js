'use strict'

import BoolObject from './src/ExportsBoolPrimitive.js';
import StringObject from './src/ExportsStringPrimitive.js';
import NumberObject from './src/ExportsNumberPrimitive.js';

var BoolObjectFromRewireJS = require('./src/ExportsBoolPrimitiveViaCommonJs.js');
var StringObjectFromRewireJS = require('./src/ExportsStringPrimitiveViaCommonJs.js');
var NumberObjectFromRewireJS = require('./src/ExportsNumberPrimitiveViaCommonJs.js');

import expect from 'expect.js';

describe('Primitive', function(){

  it('rewireing of exported primitive bool', function(){
    expect(BoolObject === true).to.be(true);
  });

	it('rewireing of exported primitive bool via common js', function(){
		if(BoolObjectFromRewireJS) {
			expect(true).to.be(false);
		}
		expect(BoolObjectFromRewireJS === false).to.be(true);
	});

	it('rewireing of exported primitive number', function(){
		expect(NumberObject).to.be(7);
	});

	it('rewireing of exported primitive number via common js', function(){
		expect(NumberObjectFromRewireJS).to.be(4);
	});

	it('rewireing of exported primitive string', function(){
		expect(StringObject).to.be('test');
	});

	it('rewireing of exported primitive string via common js', function(){
		expect(StringObjectFromRewireJS).to.be('test common js');
	});
});
