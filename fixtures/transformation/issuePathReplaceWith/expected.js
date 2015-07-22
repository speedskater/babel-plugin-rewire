'use strict';

export { requiredValidatorFunction };

import { createSingleFieldValidatorFactory as _createSingleFieldValidatorFactoryTemp } from 'data/commons/ValidatorFactories.js';let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];

function __GetDependency__(name) {
	return __$Getters__[name]();
}

function __Rewire__(name, value) {
	__$Setters__[name](value);
}

function __ResetDependency__(name) {
	__$Resetters__[name]();
}

let createSingleFieldValidatorFactory = _createSingleFieldValidatorFactoryTemp;

__$Getters__['createSingleFieldValidatorFactory'] = function () {
	return createSingleFieldValidatorFactory;
};

__$Setters__['createSingleFieldValidatorFactory'] = function (value) {
	createSingleFieldValidatorFactory = value;
};

__$Resetters__['createSingleFieldValidatorFactory'] = function () {
	createSingleFieldValidatorFactory = _createSingleFieldValidatorFactoryTemp;
};

function requiredValidatorFunction(translatedFieldLabel, fieldValue) {
	return fieldValue === undefined || fieldValue !== null && fieldValue !== '' || translatedFieldLabel + ' is required.';
}

export default Object.assign(createSingleFieldValidatorFactory(requiredValidatorFunction), {
	'__Rewire__': __Rewire__,
	'__set__': __Rewire__,
	'__ResetDependency__': __ResetDependency__,
	'__GetDependency__': __GetDependency__,
	'__get__': __GetDependency__
});
export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };