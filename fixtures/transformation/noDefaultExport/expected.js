"use strict";

var foo = _fooOrig;
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
	"__GetDependency__": __GetDependency__,
	"__get__": __GetDependency__,
	"__Rewire__": __Rewire__,
	"__set__": __Rewire__,
	"__ResetDependency__": __ResetDependency__
};

function _fooOrig(val) {
	return val + 1;
}

var _foo = foo;

__$Getters__["foo"] = function () {
	return foo;
};

__$Setters__["foo"] = function (value) {
	foo = value;
};

__$Resetters__["foo"] = function () {
	foo = _foo;
};

export { _fooOrig as foo };
export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };
export default __RewireAPI__;