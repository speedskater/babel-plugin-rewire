'use strict';

import { createSingleFieldValidatorFactory as _createSingleFieldValidatorFactoryTemp } from 'data/commons/ValidatorFactories.js';

var requiredValidatorFunction = _requiredValidatorFunctionOrig;
let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];
/* istanbul ignore next */

function __GetDependency__(name) {
	return __$Getters__[name]();
}

/* istanbul ignore next */

function __Rewire__(name, value) {
	__$Setters__[name](value);
}

/* istanbul ignore next */

function __ResetDependency__(name) {
	__$Resetters__[name]();
}

/* istanbul ignore next */
let __RewireAPI__ = {
	'__GetDependency__': __GetDependency__,
	'__get__': __GetDependency__,
	'__Rewire__': __Rewire__,
	'__set__': __Rewire__,
	'__ResetDependency__': __ResetDependency__
};
let createSingleFieldValidatorFactory = _createSingleFieldValidatorFactoryTemp;
/* istanbul ignore next */

__$Getters__['createSingleFieldValidatorFactory'] = function () {
	return createSingleFieldValidatorFactory;
};

/* istanbul ignore next */

__$Setters__['createSingleFieldValidatorFactory'] = function (value) {
	createSingleFieldValidatorFactory = value;
};

/* istanbul ignore next */

__$Resetters__['createSingleFieldValidatorFactory'] = function () {
	createSingleFieldValidatorFactory = _createSingleFieldValidatorFactoryTemp;
};

function _requiredValidatorFunctionOrig(translatedFieldLabel, fieldValue) {
	return fieldValue === undefined || fieldValue !== null && fieldValue !== '' || translatedFieldLabel + ' is required.';
}

var _requiredValidatorFunction = requiredValidatorFunction;
/* istanbul ignore next */

__$Getters__['requiredValidatorFunction'] = function () {
	return requiredValidatorFunction;
};

/* istanbul ignore next */

__$Setters__['requiredValidatorFunction'] = function (value) {
	requiredValidatorFunction = value;
};

/* istanbul ignore next */

__$Resetters__['requiredValidatorFunction'] = function () {
	requiredValidatorFunction = _requiredValidatorFunction;
};

export { _requiredValidatorFunctionOrig as requiredValidatorFunction };

let _defaultExport = createSingleFieldValidatorFactory(requiredValidatorFunction);

if (typeof _defaultExport === 'object' || typeof _defaultExport === 'function') {
	Object.defineProperty(_defaultExport, '__Rewire__', {
		'value': __Rewire__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__set__', {
		'value': __Rewire__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__ResetDependency__', {
		'value': __ResetDependency__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__GetDependency__', {
		'value': __GetDependency__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__get__', {
		'value': __GetDependency__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__RewireAPI__', {
		'value': __RewireAPI__,
		'enumberable': false
	});
}

export default _defaultExport;
export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };