'use strict';

import { createSingleFieldValidatorFactory as _createSingleFieldValidatorFactoryTemp$Import } from 'data/commons/ValidatorFactories.js';

var requiredValidatorFunction = _requiredValidatorFunctionOrig;
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
let _createSingleFieldValidatorFactory$IsLifeBindingActive = true;
let createSingleFieldValidatorFactory = _createSingleFieldValidatorFactoryTemp$Import;

__$Getters__['createSingleFieldValidatorFactory'] = function () {
	return _createSingleFieldValidatorFactory$IsLifeBindingActive ? _createSingleFieldValidatorFactoryTemp$Import : createSingleFieldValidatorFactory;
};

__$Setters__['createSingleFieldValidatorFactory'] = function (value) {
	_createSingleFieldValidatorFactory$IsLifeBindingActive = false;
	createSingleFieldValidatorFactory = value;
};

__$Resetters__['createSingleFieldValidatorFactory'] = function () {
	_createSingleFieldValidatorFactory$IsLifeBindingActive = true;
	createSingleFieldValidatorFactory = _createSingleFieldValidatorFactoryTemp$Import;
};

function _requiredValidatorFunctionOrig(translatedFieldLabel, fieldValue) {
	return fieldValue === undefined || fieldValue !== null && fieldValue !== '' || translatedFieldLabel + ' is required.';
}

var _requiredValidatorFunction = requiredValidatorFunction;

__$Getters__['requiredValidatorFunction'] = function () {
	return requiredValidatorFunction;
};

__$Setters__['requiredValidatorFunction'] = function (value) {
	requiredValidatorFunction = value;
};

__$Resetters__['requiredValidatorFunction'] = function () {
	requiredValidatorFunction = _requiredValidatorFunction;
};

export { _requiredValidatorFunctionOrig as requiredValidatorFunction };

let _defaultExport = _GetDependency__('createSingleFieldValidatorFactory')(requiredValidatorFunction);

if ((typeof _defaultExport === 'object' || typeof _defaultExport === 'function') && Object.isExtensible(_defaultExport)) {
	Object.defineProperty(_defaultExport, '__Rewire__', {
		'value': _Rewire__,
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(_defaultExport, '__set__', {
		'value': _Rewire__,
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(_defaultExport, '__ResetDependency__', {
		'value': _ResetDependency__,
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(_defaultExport, '__GetDependency__', {
		'value': _GetDependency__,
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(_defaultExport, '__get__', {
		'value': _GetDependency__,
		'enumerable': false,
		'configurable': true
	});
	Object.defineProperty(_defaultExport, '__RewireAPI__', {
		'value': _RewireAPI__,
		'enumerable': false,
		'configurable': true
	});
}

export default _defaultExport;
export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };