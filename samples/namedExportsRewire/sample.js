import { default as NamedVariableExport, namedVariable, namedVariable2 } from './src/ExportNamedVariable.js';
import { default as NamedFunctionExport, namedFunction } from './src/ExportNamedFunction.js';
import expect from 'expect.js';

describe('Test for named exports rewiring', function() {
	it('should still export namedVariable', function() {
		expect( namedVariable(1) ).to.be(2);
	});

	it('should still export namedVariable2', function() {
		expect( namedVariable2(1) ).to.be(3);
	});

	it('should rewire the exported named variable', function() {
		expect( NamedVariableExport(1) ).to.be(5);
		NamedVariableExport.__Rewire__('namedVariable', val => val+1000);
		expect( NamedVariableExport(1) ).to.be(1004);
		NamedVariableExport.__Rewire__('namedVariable2', val => val+1000);
		expect( NamedVariableExport(1) ).to.be(2002);
		NamedVariableExport.__ResetDependency__('namedVariable');
		NamedVariableExport.__ResetDependency__('namedVariable2');
	});

	it('should still export named function', function() {
		expect( namedFunction(1) ).to.be(2);
	});

	it('should rewire the exported named function', function() {
		expect( NamedFunctionExport(1)).to.be(2);
		NamedFunctionExport.__Rewire__('namedFunction', val=> val+1000);
		expect( NamedFunctionExport(1)).to.be(1001);
	})
});