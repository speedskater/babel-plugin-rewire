'use strict';

import _ComponentToTestTemp from './src/ComponentToTest.js';
import _expectTemp from 'expect.js';

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

let __RewireAPI__ = {
	'__GetDependency__': __GetDependency__,
	'__get__': __GetDependency__,
	'__Rewire__': __Rewire__,
	'__set__': __Rewire__,
	'__ResetDependency__': __ResetDependency__
};
let ComponentToTest = _ComponentToTestTemp;

__$Getters__['ComponentToTest'] = function () {
	return ComponentToTest;
};

__$Setters__['ComponentToTest'] = function (value) {
	ComponentToTest = value;
};

__$Resetters__['ComponentToTest'] = function () {
	ComponentToTest = _ComponentToTestTemp;
};

let expect = _expectTemp;

__$Getters__['expect'] = function () {
	return expect;
};

__$Setters__['expect'] = function (value) {
	expect = value;
};

__$Resetters__['expect'] = function () {
	expect = _expectTemp;
};

for (let b of a) {
	expect(ComponentToTest.__Get__('node')).to.be('hey I\'m mock');
}
export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };
export default __RewireAPI__;