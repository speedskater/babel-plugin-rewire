import expect from 'expect.js';

import { default as primitiveDefaultExportedValue, addOne, __RewireAPI__ as PrimitiveDefaultExportRewireAPI } from './src/PrimitiveDefaultExport.js';
import { greet, __RewireAPI__ as NoDefaultExportRewireAPI } from './src/NoDefaultExport.js';
import { default as defaultExportedObject, __RewireAPI__ as DefaultExportObjectRewireAPI } from './src/DefaultExportObject.js';
import { default as defaultExportedFunction, __RewireAPI__ as DefaultExportFunctionRewireAPI } from './src/DefaultExportFunction.js';
import { default as CommonJSModule, __RewireAPI__ as CommonJSRewireAPI } from './src/CommonJSModule.js';

_get_describe()('NamedExportRewireSupportTest', function () {
	function checkRewireAPI(APIObject) {
		_get_expect()(APIObject.__Rewire__).to.be.a('function');
		_get_expect()(APIObject.__ResetDependency__).to.be.a('function');
		_get_expect()(APIObject.__GetDependency__).to.be.a('function');
		_get_expect()(APIObject.__set__).to.be.a('function');
		_get_expect()(APIObject.__get__).to.be.a('function');
	}

	_get_it()('should add a named export rewire support API for PrimitiveDefaultExport', function () {
		checkRewireAPI(_get_PrimitiveDefaultExportRewireAPI());

		_get_expect()(_get_primitiveDefaultExportedValue() === false).to.be(true);
		_get_expect()(_get_addOne()(1)).to.be(2);

		_get_PrimitiveDefaultExportRewireAPI().__Rewire__('generateOne', function () {
			return 2;
		});

		_get_expect()(_get_addOne()(1)).to.be(3);
		_get_PrimitiveDefaultExportRewireAPI().__ResetDependency__('generateOne');
		_get_expect()(_get_addOne()(1)).to.be(2);
	});

	_get_it()('should add a named export rewire support API for NoDefaultExport', function () {
		_get_expect()(_get_NoDefaultExportRewireAPI().__Rewire__).to.be.a('function');
		checkRewireAPI(_get_NoDefaultExportRewireAPI());

		_get_expect()(_get_greet()()).to.equal('Hello John');

		_get_NoDefaultExportRewireAPI().__Rewire__('whoToGreet', 'Jane');

		_get_expect()(_get_greet()()).to.equal('Hello Jane');
		_get_NoDefaultExportRewireAPI().__ResetDependency__('whoToGreet');
		_get_expect()(_get_greet()()).to.equal('Hello John');
	});

	_get_it()('should add a named export rewire support API for DefaultExportObject', function () {
		_get_console().log("TEST 1");
		checkRewireAPI(_get_DefaultExportObjectRewireAPI());
		_get_console().log("TEST 2: " + _get_defaultExportedObject());
		_get_console().log("TEST 2.5: " + _get_defaultExportedObject().addOne);
		_get_expect()(_get_defaultExportedObject().addOne(1)).to.be(2);
		_get_console().log("TEST 3");
		_get_DefaultExportObjectRewireAPI().__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});
		_get_console().log("TEST 4");

		_get_expect()(_get_defaultExportedObject().addOne(1)).to.be(3);
		_get_console().log("TEST 5");
		_get_DefaultExportObjectRewireAPI().__ResetDependency__('ModuleToRewire');
		_get_console().log("TEST 6");
		_get_expect()(_get_defaultExportedObject().addOne(1)).to.be(2);
	});

	_get_it()('should add a named export rewire support API for DefaultExportFunction', function () {
		checkRewireAPI(_get_DefaultExportFunctionRewireAPI());

		_get_expect()(_get_defaultExportedFunction()(1)).to.be(3);

		_get_DefaultExportFunctionRewireAPI().__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});

		_get_expect()(_get_defaultExportedFunction()(1)).to.be(4);
		_get_DefaultExportFunctionRewireAPI().__ResetDependency__('ModuleToRewire');
		_get_expect()(_get_defaultExportedFunction()(1)).to.be(3);
	});

	_get_it()('should add a named export rewire support API for CommonJSModule', function () {
		checkRewireAPI(_get_CommonJSModule());
		checkRewireAPI(_get_CommonJSRewireAPI());

		_get_expect()(_get_CommonJSModule()(1)).to.be(3);

		_get_CommonJSModule().__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});

		_get_expect()(_get_CommonJSModule()(1)).to.be(4);
		_get_CommonJSModule().__ResetDependency__('ModuleToRewire');
		_get_expect()(_get_CommonJSModule()(1)).to.be(3);
	});
});

function _get_describe() {
	return _RewiredData__ === undefined || _RewiredData__['describe'] === undefined ? describe : _RewiredData__['describe'];
}

function _get_expect() {
	return _RewiredData__ === undefined || _RewiredData__['expect'] === undefined ? expect : _RewiredData__['expect'];
}

function _get_it() {
	return _RewiredData__ === undefined || _RewiredData__['it'] === undefined ? it : _RewiredData__['it'];
}

function _get_PrimitiveDefaultExportRewireAPI() {
	return _RewiredData__ === undefined || _RewiredData__['PrimitiveDefaultExportRewireAPI'] === undefined ? PrimitiveDefaultExportRewireAPI : _RewiredData__['PrimitiveDefaultExportRewireAPI'];
}

function _get_primitiveDefaultExportedValue() {
	return _RewiredData__ === undefined || _RewiredData__['primitiveDefaultExportedValue'] === undefined ? primitiveDefaultExportedValue : _RewiredData__['primitiveDefaultExportedValue'];
}

function _get_addOne() {
	return _RewiredData__ === undefined || _RewiredData__['addOne'] === undefined ? addOne : _RewiredData__['addOne'];
}

function _get_NoDefaultExportRewireAPI() {
	return _RewiredData__ === undefined || _RewiredData__['NoDefaultExportRewireAPI'] === undefined ? NoDefaultExportRewireAPI : _RewiredData__['NoDefaultExportRewireAPI'];
}

function _get_greet() {
	return _RewiredData__ === undefined || _RewiredData__['greet'] === undefined ? greet : _RewiredData__['greet'];
}

function _get_console() {
	return _RewiredData__ === undefined || _RewiredData__['console'] === undefined ? console : _RewiredData__['console'];
}

function _get_DefaultExportObjectRewireAPI() {
	return _RewiredData__ === undefined || _RewiredData__['DefaultExportObjectRewireAPI'] === undefined ? DefaultExportObjectRewireAPI : _RewiredData__['DefaultExportObjectRewireAPI'];
}

function _get_defaultExportedObject() {
	return _RewiredData__ === undefined || _RewiredData__['defaultExportedObject'] === undefined ? defaultExportedObject : _RewiredData__['defaultExportedObject'];
}

function _get_DefaultExportFunctionRewireAPI() {
	return _RewiredData__ === undefined || _RewiredData__['DefaultExportFunctionRewireAPI'] === undefined ? DefaultExportFunctionRewireAPI : _RewiredData__['DefaultExportFunctionRewireAPI'];
}

function _get_defaultExportedFunction() {
	return _RewiredData__ === undefined || _RewiredData__['defaultExportedFunction'] === undefined ? defaultExportedFunction : _RewiredData__['defaultExportedFunction'];
}

function _get_CommonJSModule() {
	return _RewiredData__ === undefined || _RewiredData__['CommonJSModule'] === undefined ? CommonJSModule : _RewiredData__['CommonJSModule'];
}

function _get_CommonJSRewireAPI() {
	return _RewiredData__ === undefined || _RewiredData__['CommonJSRewireAPI'] === undefined ? CommonJSRewireAPI : _RewiredData__['CommonJSRewireAPI'];
}

let _RewiredData__ = {};
let _GETTERS__ = {
	'describe': _get_describe,
	'expect': _get_expect,
	'it': _get_it,
	'PrimitiveDefaultExportRewireAPI': _get_PrimitiveDefaultExportRewireAPI,
	'primitiveDefaultExportedValue': _get_primitiveDefaultExportedValue,
	'addOne': _get_addOne,
	'NoDefaultExportRewireAPI': _get_NoDefaultExportRewireAPI,
	'greet': _get_greet,
	'console': _get_console,
	'DefaultExportObjectRewireAPI': _get_DefaultExportObjectRewireAPI,
	'defaultExportedObject': _get_defaultExportedObject,
	'DefaultExportFunctionRewireAPI': _get_DefaultExportFunctionRewireAPI,
	'defaultExportedFunction': _get_defaultExportedFunction,
	'CommonJSModule': _get_CommonJSModule,
	'CommonJSRewireAPI': _get_CommonJSRewireAPI
};

function _GetDependency__(variableName) {
	return _GETTERS__[variableName]();
}

function _Rewire__(variableName, value) {
	return _RewiredData__[variableName] = value;
}

function _ResetDependency__(variableName) {
	delete _RewiredData__[variableName];
}

function _with__(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			_RewiredData__[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = _RewiredData__[variableName];
			_RewiredData__[variableName] = object[variableName];
		});
		let result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

let _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _GetDependency__);
	addPropertyToAPIObject('__GetDependency__', _GetDependency__);
	addPropertyToAPIObject('__Rewire__', _Rewire__);
	addPropertyToAPIObject('__set__', _Rewire__);
	addPropertyToAPIObject('__ResetDependency__', _ResetDependency__);
	addPropertyToAPIObject('__with__', _with__);
})();

export { _GetDependency__ as __get__, _GetDependency__ as __GetDependency__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;