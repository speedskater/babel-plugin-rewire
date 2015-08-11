import expect from 'expect.js';

import { default as primitiveDefaultExportedValue, addOne, __RewireAPI__ as PrimitiveDefaultExportRewireAPI  } from './src/PrimitiveDefaultExport.js';
import { greet, __RewireAPI__ as NoDefaultExportRewireAPI  } from './src/NoDefaultExport.js';
import { default as defaultExportedObject, __RewireAPI__ as DefaultExportObjectRewireAPI  } from './src/DefaultExportObject.js';
import { default as defaultExportedFunction, __RewireAPI__ as DefaultExportFunctionRewireAPI  } from './src/DefaultExportFunction.js';
import { default as CommonJSModule, __RewireAPI__ as CommonJSRewireAPI } from './src/CommonJSModule.js';

describe('NamedExportRewireSupportTest', function() {
	function checkRewireAPI( APIObject ) {
		expect( APIObject.__Rewire__ ).to.be.a('function');
		expect( APIObject.__ResetDependency__ ).to.be.a('function');
		expect( APIObject.__GetDependency__ ).to.be.a('function');
		expect( APIObject.__set__ ).to.be.a('function');
		expect( APIObject.__get__ ).to.be.a('function');
	}

	it('should add a named export rewire support API for PrimitiveDefaultExport', function() {
		checkRewireAPI( PrimitiveDefaultExportRewireAPI );

		expect( primitiveDefaultExportedValue === false).to.be(true);
		expect( addOne(1) ).to.be(2);

		PrimitiveDefaultExportRewireAPI.__Rewire__('generateOne', function() {
			return 2;
		});

		expect( addOne(1) ).to.be(3);
		PrimitiveDefaultExportRewireAPI.__ResetDependency__('generateOne');
		expect( addOne(1) ).to.be(2);
	});

	it('should add a named export rewire support API for NoDefaultExport', function() {
		expect(NoDefaultExportRewireAPI.__Rewire__).to.be.a('function');
		checkRewireAPI( NoDefaultExportRewireAPI );

		expect( greet() ).to.equal('Hello John');

		NoDefaultExportRewireAPI.__Rewire__('whoToGreet', 'Jane');

		expect( greet() ).to.equal('Hello Jane');
		NoDefaultExportRewireAPI.__ResetDependency__('whoToGreet');
		expect( greet() ).to.equal('Hello John');
	});

	it('should add a named export rewire support API for DefaultExportObject', function() {
		checkRewireAPI( DefaultExportObjectRewireAPI );

		expect( defaultExportedObject.addOne(1) ).to.be(2);

		DefaultExportObjectRewireAPI.__Rewire__('ModuleToRewire', function(val) {
			return val + 2;
		});

		expect( defaultExportedObject.addOne(1) ).to.be(3);
		DefaultExportObjectRewireAPI.__ResetDependency__('ModuleToRewire');
		expect( defaultExportedObject.addOne(1) ).to.be(2);
	});

	it('should add a named export rewire support API for DefaultExportFunction', function() {
		checkRewireAPI( DefaultExportFunctionRewireAPI );

		expect( defaultExportedFunction(1) ).to.be(3);

		DefaultExportFunctionRewireAPI.__Rewire__('ModuleToRewire', function(val) {
			return val + 2;
		});

		expect( defaultExportedFunction(1) ).to.be(4);
		DefaultExportFunctionRewireAPI.__ResetDependency__('ModuleToRewire');
		expect( defaultExportedFunction(1) ).to.be(3);
	});

	it('should add a named export rewire support API for CommonJSModule', function() {
		checkRewireAPI( CommonJSModule );
		checkRewireAPI( CommonJSRewireAPI );

		expect( CommonJSModule(1) ).to.be(3);

		CommonJSModule.__Rewire__('ModuleToRewire', function(val) {
			return val + 2;
		});

		expect( CommonJSModule(1) ).to.be(4);
		CommonJSModule.__ResetDependency__('ModuleToRewire');
		expect( CommonJSModule(1) ).to.be(3);
	});

});