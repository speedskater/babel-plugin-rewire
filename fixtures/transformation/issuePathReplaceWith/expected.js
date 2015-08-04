'use strict';

export { requiredValidatorFunction };
import { createSingleFieldValidatorFactory as _createSingleFieldValidatorFactoryTemp } from 'data/commons/ValidatorFactories.js';

let __$Getters__ = [];
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

let _defaultExport = createSingleFieldValidatorFactory(requiredValidatorFunction);

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
export default _defaultExport;
export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };