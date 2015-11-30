import expect from 'expect.js';

import { default as primitiveDefaultExportedValue, addOne, __RewireAPI__ as PrimitiveDefaultExportRewireAPI } from './src/PrimitiveDefaultExport.js';
import { greet, __RewireAPI__ as NoDefaultExportRewireAPI } from './src/NoDefaultExport.js';
import { default as defaultExportedObject, __RewireAPI__ as DefaultExportObjectRewireAPI } from './src/DefaultExportObject.js';
import { default as defaultExportedFunction, __RewireAPI__ as DefaultExportFunctionRewireAPI } from './src/DefaultExportFunction.js';
import { default as CommonJSModule, __RewireAPI__ as CommonJSRewireAPI } from './src/CommonJSModule.js';

describe('NamedExportRewireSupportTest', function () {
	function checkRewireAPI(APIObject) {
		_get__('expect')(APIObject.__Rewire__).to.be.a('function');
		_get__('expect')(APIObject.__ResetDependency__).to.be.a('function');
		_get__('expect')(APIObject.__GetDependency__).to.be.a('function');
		_get__('expect')(APIObject.__set__).to.be.a('function');
		_get__('expect')(APIObject.__get__).to.be.a('function');
	}

	it('should add a named export rewire support API for PrimitiveDefaultExport', function () {
		checkRewireAPI(_get__('PrimitiveDefaultExportRewireAPI'));

		_get__('expect')(_get__('primitiveDefaultExportedValue') === false).to.be(true);
		_get__('expect')(_get__('addOne')(1)).to.be(2);

		_get__('PrimitiveDefaultExportRewireAPI').__Rewire__('generateOne', function () {
			return 2;
		});

		_get__('expect')(_get__('addOne')(1)).to.be(3);
		_get__('PrimitiveDefaultExportRewireAPI').__ResetDependency__('generateOne');
		_get__('expect')(_get__('addOne')(1)).to.be(2);
	});

	it('should add a named export rewire support API for NoDefaultExport', function () {
		_get__('expect')(_get__('NoDefaultExportRewireAPI').__Rewire__).to.be.a('function');
		checkRewireAPI(_get__('NoDefaultExportRewireAPI'));

		_get__('expect')(_get__('greet')()).to.equal('Hello John');

		_get__('NoDefaultExportRewireAPI').__Rewire__('whoToGreet', 'Jane');

		_get__('expect')(_get__('greet')()).to.equal('Hello Jane');
		_get__('NoDefaultExportRewireAPI').__ResetDependency__('whoToGreet');
		_get__('expect')(_get__('greet')()).to.equal('Hello John');
	});

	it('should add a named export rewire support API for DefaultExportObject', function () {
		console.log("TEST 1");
		checkRewireAPI(_get__('DefaultExportObjectRewireAPI'));
		console.log("TEST 2: " + _get__('defaultExportedObject'));
		console.log("TEST 2.5: " + _get__('defaultExportedObject').addOne);
		_get__('expect')(_get__('defaultExportedObject').addOne(1)).to.be(2);
		console.log("TEST 3");
		_get__('DefaultExportObjectRewireAPI').__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});
		console.log("TEST 4");

		_get__('expect')(_get__('defaultExportedObject').addOne(1)).to.be(3);
		console.log("TEST 5");
		_get__('DefaultExportObjectRewireAPI').__ResetDependency__('ModuleToRewire');
		console.log("TEST 6");
		_get__('expect')(_get__('defaultExportedObject').addOne(1)).to.be(2);
	});

	it('should add a named export rewire support API for DefaultExportFunction', function () {
		checkRewireAPI(_get__('DefaultExportFunctionRewireAPI'));

		_get__('expect')(_get__('defaultExportedFunction')(1)).to.be(3);

		_get__('DefaultExportFunctionRewireAPI').__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});

		_get__('expect')(_get__('defaultExportedFunction')(1)).to.be(4);
		_get__('DefaultExportFunctionRewireAPI').__ResetDependency__('ModuleToRewire');
		_get__('expect')(_get__('defaultExportedFunction')(1)).to.be(3);
	});

	it('should add a named export rewire support API for CommonJSModule', function () {
		checkRewireAPI(_get__('CommonJSModule'));
		checkRewireAPI(_get__('CommonJSRewireAPI'));

		_get__('expect')(_get__('CommonJSModule')(1)).to.be(3);

		_get__('CommonJSModule').__Rewire__('ModuleToRewire', function (val) {
			return val + 2;
		});

		_get__('expect')(_get__('CommonJSModule')(1)).to.be(4);
		_get__('CommonJSModule').__ResetDependency__('ModuleToRewire');
		_get__('expect')(_get__('CommonJSModule')(1)).to.be(3);
	});
});
let _RewiredData__ = {};

function _get__(variableName) {
	return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'expect':
			return expect;

		case 'PrimitiveDefaultExportRewireAPI':
			return PrimitiveDefaultExportRewireAPI;

		case 'primitiveDefaultExportedValue':
			return primitiveDefaultExportedValue;

		case 'addOne':
			return addOne;

		case 'NoDefaultExportRewireAPI':
			return NoDefaultExportRewireAPI;

		case 'greet':
			return greet;

		case 'DefaultExportObjectRewireAPI':
			return DefaultExportObjectRewireAPI;

		case 'defaultExportedObject':
			return defaultExportedObject;

		case 'DefaultExportFunctionRewireAPI':
			return DefaultExportFunctionRewireAPI;

		case 'defaultExportedFunction':
			return defaultExportedFunction;

		case 'CommonJSModule':
			return CommonJSModule;

		case 'CommonJSRewireAPI':
			return CommonJSRewireAPI;
	}

	return undefined;
}

function _assign__(variableName, value) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return _RewiredData__[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	return _RewiredData__[variableName] = value;
}

function _reset__(variableName) {
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

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

export { _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;