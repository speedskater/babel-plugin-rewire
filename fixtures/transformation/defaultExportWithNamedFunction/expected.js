"use strict";

import _myDependencyTemp from 'dependency';

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

let myDependency = _myDependencyTemp;

__$Getters__["myDependency"] = function () {
	return myDependency;
};

__$Setters__["myDependency"] = function (value) {
	myDependency = value;
};

__$Resetters__["myDependency"] = function () {
	myDependency = _myDependencyTemp;
};

function helloWorld() {
	console.log("Hello World!");
}
export default Object.assign(helloWorld, {
	"__Rewire__": __Rewire__,
	"__set__": __Rewire__,
	"__ResetDependency__": __ResetDependency__,
	"__GetDependency__": __GetDependency__,
	"__get__": __GetDependency__
});
export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };