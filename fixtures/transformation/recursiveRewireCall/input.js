import expect from 'expect.js';

import { default as primitiveDefaultExportedValue, addOne, __ModuleAPI__ as PrimitiveDefaultExportModuleAPI  } from './src/PrimitiveDefaultExport.js';
import { greet, __ModuleAPI__ as NoDefaultExportModuleAPI  } from './src/NoDefaultExport.js';
import { default as defaultExportedObject, __ModuleAPI__ as DefaultExportObjectModuleAPI  } from './src/DefaultExportObject.js';
import { default as defaultExportedFunction, __ModuleAPI__ as DefaultExportFunctionModuleAPI  } from './src/DefaultExportFunction.js';
import { default as CommonJSModule, __ModuleAPI__ as CommonJSModuleAPI } from './src/CommonJSModule.js';

describe('NamedExportRewireSupportTest', function() {
	function checkModuleAPI( APIObject ) {
		expect( APIObject.__Rewire__ ).to.be.a('function');
		expect( APIObject.__ResetDependency__ ).to.be.a('function');
		expect( APIObject.__GetDependency__ ).to.be.a('function');
		expect( APIObject.__set__ ).to.be.a('function');
		expect( APIObject.__get__ ).to.be.a('function');
	}

	it('should add a named export rewire support API for PrimitiveDefaultExport', function() {
		checkModuleAPI( PrimitiveDefaultExportModuleAPI );

		expect( primitiveDefaultExportedValue === false).to.be(true);
		expect( addOne(1) ).to.be(2);

		PrimitiveDefaultExportModuleAPI.__Rewire__('generateOne', function() {
			return 2;
		});

		expect( addOne(1) ).to.be(3);
		PrimitiveDefaultExportModuleAPI.__ResetDependency__('generateOne');
		expect( addOne(1) ).to.be(2);
	});

	it('should add a named export rewire support API for NoDefaultExport', function() {
		expect(NoDefaultExportModuleAPI.__Rewire__).to.be.a('function');
		checkModuleAPI( NoDefaultExportModuleAPI );

		expect( greet() ).to.equal('Hello John');

		NoDefaultExportModuleAPI.__Rewire__('whoToGreet', 'Jane');

		expect( greet() ).to.equal('Hello Jane');
		NoDefaultExportModuleAPI.__ResetDependency__('whoToGreet');
		expect( greet() ).to.equal('Hello John');
	});

	it('should add a named export rewire support API for DefaultExportObject', function() {
		console.log("TEST 1");
		checkModuleAPI( DefaultExportObjectModuleAPI );
		console.log("TEST 2: " + defaultExportedObject);
		console.log("TEST 2.5: " + defaultExportedObject.addOne);
		expect( defaultExportedObject.addOne(1) ).to.be(2);
		console.log("TEST 3");
		DefaultExportObjectModuleAPI.__Rewire__('ModuleToRewire', function(val) {
			return val + 2;
		});
		console.log("TEST 4");

		expect( defaultExportedObject.addOne(1) ).to.be(3);
		console.log("TEST 5");
		DefaultExportObjectModuleAPI.__ResetDependency__('ModuleToRewire');
		console.log("TEST 6");
		expect( defaultExportedObject.addOne(1) ).to.be(2);
	});

	it('should add a named export rewire support API for DefaultExportFunction', function() {
		checkModuleAPI( DefaultExportFunctionModuleAPI );

		expect( defaultExportedFunction(1) ).to.be(3);

		DefaultExportFunctionModuleAPI.__Rewire__('ModuleToRewire', function(val) {
			return val + 2;
		});

		expect( defaultExportedFunction(1) ).to.be(4);
		DefaultExportFunctionModuleAPI.__ResetDependency__('ModuleToRewire');
		expect( defaultExportedFunction(1) ).to.be(3);
	});

	it('should add a named export rewire support API for CommonJSModule', function() {
		checkModuleAPI( CommonJSModule );
		checkModuleAPI( CommonJSModuleAPI );

		expect( CommonJSModule(1) ).to.be(3);

		CommonJSModule.__Rewire__('ModuleToRewire', function(val) {
			return val + 2;
		});

		expect( CommonJSModule(1) ).to.be(4);
		CommonJSModule.__ResetDependency__('ModuleToRewire');
		expect( CommonJSModule(1) ).to.be(3);
	});

});
