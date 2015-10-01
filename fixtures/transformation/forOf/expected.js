'use strict';

import _ComponentToTestTemp$Import from './src/ComponentToTest.js';
import _expectTemp$Import from 'expect.js';

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
let _ComponentToTest$IsLifeBindingActive = true;
let ComponentToTest = _ComponentToTestTemp$Import;

__$Getters__['ComponentToTest'] = function () {
	return _ComponentToTest$IsLifeBindingActive ? _ComponentToTestTemp$Import : ComponentToTest;
};

__$Setters__['ComponentToTest'] = function (value) {
	_ComponentToTest$IsLifeBindingActive = false;
	ComponentToTest = value;
};

__$Resetters__['ComponentToTest'] = function () {
	_ComponentToTest$IsLifeBindingActive = true;
	ComponentToTest = _ComponentToTestTemp$Import;
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

for (let b of a) {
	_GetDependency__('expect')(_GetDependency__('ComponentToTest').__Get__('node')).to.be('hey I\'m mock');
}
export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;