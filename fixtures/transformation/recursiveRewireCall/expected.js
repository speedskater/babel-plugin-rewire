'use strict';

import _expectTemp$Import from 'expect.js';

import { default as _primitiveDefaultExportedValueTemp$Import, addOne as _addOneTemp$Import, __RewireAPI__ as _PrimitiveDefaultExportRewireAPITemp$Import } from './src/PrimitiveDefaultExport.js';
import { greet as _greetTemp$Import, __RewireAPI__ as _NoDefaultExportRewireAPITemp$Import } from './src/NoDefaultExport.js';
import { default as _defaultExportedObjectTemp$Import, __RewireAPI__ as _DefaultExportObjectRewireAPITemp$Import } from './src/DefaultExportObject.js';
import { default as _defaultExportedFunctionTemp$Import, __RewireAPI__ as _DefaultExportFunctionRewireAPITemp$Import } from './src/DefaultExportFunction.js';
import { default as _CommonJSModuleTemp$Import, __RewireAPI__ as _CommonJSRewireAPITemp$Import } from './src/CommonJSModule.js';

let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];

function _GetDependency__(name) {
	return __$Getters__[name]();
}

function _Rewire__(name, value) {
	__$Setters__[name](value);
}

function _ResetDependency__(name) {
	__$Resetters__[name]();
}

let _RewireAPI__ = {
	'__GetDependency__': _GetDependency__,
	'__get__': _GetDependency__,
	'__Rewire__': _Rewire__,
	'__set__': _Rewire__,
	'__ResetDependency__': _ResetDependency__
};
let _expect$IsLifeBindingActive = true;
let expect = _expectTemp$Import;

__$Getters__['expect'] = function () {
	return _expect$IsLifeBindingActive ? _expectTemp$Import : expect;
};

__$Setters__['expect'] = function (value) {
	_expect$IsLifeBindingActive = false;
	expect = value;
};

__$Resetters__['expect'] = function () {
	_expect$IsLifeBindingActive = true;
	expect = _expectTemp$Import;
};

let _primitiveDefaultExportedValue$IsLifeBindingActive = true;
let primitiveDefaultExportedValue = _primitiveDefaultExportedValueTemp$Import;
let _addOne$IsLifeBindingActive = true;
let addOne = _addOneTemp$Import;
let _PrimitiveDefaultExportRewireAPI$IsLifeBindingActive = true;
let PrimitiveDefaultExportRewireAPI = _PrimitiveDefaultExportRewireAPITemp$Import;

__$Getters__['primitiveDefaultExportedValue'] = function () {
	return _primitiveDefaultExportedValue$IsLifeBindingActive ? _primitiveDefaultExportedValueTemp$Import : primitiveDefaultExportedValue;
};

__$Setters__['primitiveDefaultExportedValue'] = function (value) {
	_primitiveDefaultExportedValue$IsLifeBindingActive = false;
	primitiveDefaultExportedValue = value;
};

__$Resetters__['primitiveDefaultExportedValue'] = function () {
	_primitiveDefaultExportedValue$IsLifeBindingActive = true;
	primitiveDefaultExportedValue = _primitiveDefaultExportedValueTemp$Import;
};

__$Getters__['addOne'] = function () {
	return _addOne$IsLifeBindingActive ? _addOneTemp$Import : addOne;
};

__$Setters__['addOne'] = function (value) {
	_addOne$IsLifeBindingActive = false;
	addOne = value;
};

__$Resetters__['addOne'] = function () {
	_addOne$IsLifeBindingActive = true;
	addOne = _addOneTemp$Import;
};

__$Getters__['PrimitiveDefaultExportRewireAPI'] = function () {
	return _PrimitiveDefaultExportRewireAPI$IsLifeBindingActive ? _PrimitiveDefaultExportRewireAPITemp$Import : PrimitiveDefaultExportRewireAPI;
};

__$Setters__['PrimitiveDefaultExportRewireAPI'] = function (value) {
	_PrimitiveDefaultExportRewireAPI$IsLifeBindingActive = false;
	PrimitiveDefaultExportRewireAPI = value;
};

__$Resetters__['PrimitiveDefaultExportRewireAPI'] = function () {
	_PrimitiveDefaultExportRewireAPI$IsLifeBindingActive = true;
	PrimitiveDefaultExportRewireAPI = _PrimitiveDefaultExportRewireAPITemp$Import;
};

let _greet$IsLifeBindingActive = true;
let greet = _greetTemp$Import;
let _NoDefaultExportRewireAPI$IsLifeBindingActive = true;
let NoDefaultExportRewireAPI = _NoDefaultExportRewireAPITemp$Import;

__$Getters__['greet'] = function () {
	return _greet$IsLifeBindingActive ? _greetTemp$Import : greet;
};

__$Setters__['greet'] = function (value) {
	_greet$IsLifeBindingActive = false;
	greet = value;
};

__$Resetters__['greet'] = function () {
	_greet$IsLifeBindingActive = true;
	greet = _greetTemp$Import;
};

__$Getters__['NoDefaultExportRewireAPI'] = function () {
	return _NoDefaultExportRewireAPI$IsLifeBindingActive ? _NoDefaultExportRewireAPITemp$Import : NoDefaultExportRewireAPI;
};

__$Setters__['NoDefaultExportRewireAPI'] = function (value) {
	_NoDefaultExportRewireAPI$IsLifeBindingActive = false;
	NoDefaultExportRewireAPI = value;
};

__$Resetters__['NoDefaultExportRewireAPI'] = function () {
	_NoDefaultExportRewireAPI$IsLifeBindingActive = true;
	NoDefaultExportRewireAPI = _NoDefaultExportRewireAPITemp$Import;
};

let _defaultExportedObject$IsLifeBindingActive = true;
let defaultExportedObject = _defaultExportedObjectTemp$Import;
let _DefaultExportObjectRewireAPI$IsLifeBindingActive = true;
let DefaultExportObjectRewireAPI = _DefaultExportObjectRewireAPITemp$Import;

__$Getters__['defaultExportedObject'] = function () {
	return _defaultExportedObject$IsLifeBindingActive ? _defaultExportedObjectTemp$Import : defaultExportedObject;
};

__$Setters__['defaultExportedObject'] = function (value) {
	_defaultExportedObject$IsLifeBindingActive = false;
	defaultExportedObject = value;
};

__$Resetters__['defaultExportedObject'] = function () {
	_defaultExportedObject$IsLifeBindingActive = true;
	defaultExportedObject = _defaultExportedObjectTemp$Import;
};

__$Getters__['DefaultExportObjectRewireAPI'] = function () {
	return _DefaultExportObjectRewireAPI$IsLifeBindingActive ? _DefaultExportObjectRewireAPITemp$Import : DefaultExportObjectRewireAPI;
};

__$Setters__['DefaultExportObjectRewireAPI'] = function (value) {
	_DefaultExportObjectRewireAPI$IsLifeBindingActive = false;
	DefaultExportObjectRewireAPI = value;
};

__$Resetters__['DefaultExportObjectRewireAPI'] = function () {
	_DefaultExportObjectRewireAPI$IsLifeBindingActive = true;
	DefaultExportObjectRewireAPI = _DefaultExportObjectRewireAPITemp$Import;
};

let _defaultExportedFunction$IsLifeBindingActive = true;
let defaultExportedFunction = _defaultExportedFunctionTemp$Import;
let _DefaultExportFunctionRewireAPI$IsLifeBindingActive = true;
let DefaultExportFunctionRewireAPI = _DefaultExportFunctionRewireAPITemp$Import;

__$Getters__['defaultExportedFunction'] = function () {
	return _defaultExportedFunction$IsLifeBindingActive ? _defaultExportedFunctionTemp$Import : defaultExportedFunction;
};

__$Setters__['defaultExportedFunction'] = function (value) {
	_defaultExportedFunction$IsLifeBindingActive = false;
	defaultExportedFunction = value;
};

__$Resetters__['defaultExportedFunction'] = function () {
	_defaultExportedFunction$IsLifeBindingActive = true;
	defaultExportedFunction = _defaultExportedFunctionTemp$Import;
};

__$Getters__['DefaultExportFunctionRewireAPI'] = function () {
	return _DefaultExportFunctionRewireAPI$IsLifeBindingActive ? _DefaultExportFunctionRewireAPITemp$Import : DefaultExportFunctionRewireAPI;
};

__$Setters__['DefaultExportFunctionRewireAPI'] = function (value) {
	_DefaultExportFunctionRewireAPI$IsLifeBindingActive = false;
	DefaultExportFunctionRewireAPI = value;
};

__$Resetters__['DefaultExportFunctionRewireAPI'] = function () {
	_DefaultExportFunctionRewireAPI$IsLifeBindingActive = true;
	DefaultExportFunctionRewireAPI = _DefaultExportFunctionRewireAPITemp$Import;
};

let _CommonJSModule$IsLifeBindingActive = true;
let CommonJSModule = _CommonJSModuleTemp$Import;
let _CommonJSRewireAPI$IsLifeBindingActive = true;
let CommonJSRewireAPI = _CommonJSRewireAPITemp$Import;

__$Getters__['CommonJSModule'] = function () {
	return _CommonJSModule$IsLifeBindingActive ? _CommonJSModuleTemp$Import : CommonJSModule;
};

__$Setters__['CommonJSModule'] = function (value) {
	_CommonJSModule$IsLifeBindingActive = false;
	CommonJSModule = value;
};

__$Resetters__['CommonJSModule'] = function () {
	_CommonJSModule$IsLifeBindingActive = true;
	CommonJSModule = _CommonJSModuleTemp$Import;
};

__$Getters__['CommonJSRewireAPI'] = function () {
	return _CommonJSRewireAPI$IsLifeBindingActive ? _CommonJSRewireAPITemp$Import : CommonJSRewireAPI;
};

__$Setters__['CommonJSRewireAPI'] = function (value) {
	_CommonJSRewireAPI$IsLifeBindingActive = false;
	CommonJSRewireAPI = value;
};

__$Resetters__['CommonJSRewireAPI'] = function () {
	_CommonJSRewireAPI$IsLifeBindingActive = true;
	CommonJSRewireAPI = _CommonJSRewireAPITemp$Import;
};

describe('NamedExportRewireSupportTest', function () {
	function checkRewireAPI(APIObject) {
		_GetDependency__('expect')(APIObject.__Rewire__).to.be.a('function');
		_GetDependency__('expect')(APIObject.__ResetDependency__).to.be.a('function');
		_GetDependency__('expect')(APIObject.__GetDependency__).to.be.a('function');
		_GetDependency__('expect')(APIObject.__set__).to.be.a('function');
		_GetDependency__('expect')(APIObject.__get__).to.be.a('function');
	}

	it('should add a named export rewire support API for PrimitiveDefaultExport', function () {
		checkRewireAPI(_GetDependency__('PrimitiveDefaultExportRewireAPI'));

		_GetDependency__('expect')(_GetDependency__('primitiveDefaultExportedValue') === false).to.be(true);
		_GetDependency__('expect')(_GetDependency__('addOne')(1)).to.be(2);

		_GetDependency__('PrimitiveDefaultExportRewireAPI').__Rewire__('generateOne', function () {
			return 2;
		});

		_GetDependency__('expect')(_GetDependency__('addOne')(1)).to.be(3);
		_GetDependency__('PrimitiveDefaultExportRewireAPI').__ResetDependency__('generateOne');
		_GetDependency__('expect')(_GetDependency__('addOne')(1)).to.be(2);
	});

	it('should add a named export rewire support API for NoDefaultExport', function () {
		_GetDependency__('expect')(_GetDependency__('NoDefaultExportRewireAPI').__Rewire__).to.be.a('function');
		checkRewireAPI(_GetDependency__('NoDefaultExportRewireAPI'));

		_GetDependency__('expect')(_GetDependency__('greet')()).to.equal('Hello John');

		_GetDependency__('NoDefaultExportRewireAPI').__Rewire__('whoToGreet', 'Jane');

		_GetDependency__('expect')(_GetDependency__('greet')()).to.equal('Hello Jane');
		_GetDependency__('NoDefaultExportRewireAPI').__ResetDependency__('whoToGreet');
		_GetDependency__('expect')(_GetDependency__('greet')()).to.equal('Hello John');
	});

	it('should add a named export rewire support API for DefaultExportObject', function () {
		console.log("TEST 1");
		checkRewireAPI(_GetDependency__('DefaultExportObjectRewireAPI'));
		console.log("TEST 2: " + _GetDependency__('defaultExportedObject'));
		console.log("TEST 2.5: " + _GetDependency__('defaultExportedObject').addOne);
		_GetDependency__('expect')(_GetDependency__('defaultExportedObject').addOne(1)).to.be(2);
		console.log("TEST 3");
		_GetDependency__('DefaultExportObjectRewireAPI').__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});
		console.log("TEST 4");

		_GetDependency__('expect')(_GetDependency__('defaultExportedObject').addOne(1)).to.be(3);
		console.log("TEST 5");
		_GetDependency__('DefaultExportObjectRewireAPI').__ResetDependency__('ModuleToRewire');
		console.log("TEST 6");
		_GetDependency__('expect')(_GetDependency__('defaultExportedObject').addOne(1)).to.be(2);
	});

	it('should add a named export rewire support API for DefaultExportFunction', function () {
		checkRewireAPI(_GetDependency__('DefaultExportFunctionRewireAPI'));

		_GetDependency__('expect')(_GetDependency__('defaultExportedFunction')(1)).to.be(3);

		_GetDependency__('DefaultExportFunctionRewireAPI').__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});

		_GetDependency__('expect')(_GetDependency__('defaultExportedFunction')(1)).to.be(4);
		_GetDependency__('DefaultExportFunctionRewireAPI').__ResetDependency__('ModuleToRewire');
		_GetDependency__('expect')(_GetDependency__('defaultExportedFunction')(1)).to.be(3);
	});

	it('should add a named export rewire support API for CommonJSModule', function () {
		checkRewireAPI(_GetDependency__('CommonJSModule'));
		checkRewireAPI(_GetDependency__('CommonJSRewireAPI'));

		_GetDependency__('expect')(_GetDependency__('CommonJSModule')(1)).to.be(3);

		_GetDependency__('CommonJSModule').__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});

		_GetDependency__('expect')(_GetDependency__('CommonJSModule')(1)).to.be(4);
		_GetDependency__('CommonJSModule').__ResetDependency__('ModuleToRewire');
		_GetDependency__('expect')(_GetDependency__('CommonJSModule')(1)).to.be(3);
	});
});
export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;