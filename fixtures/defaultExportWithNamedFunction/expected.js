"use strict";

export { __GetDependency__ };
export { __Rewire__ };
export { __ResetDependency__ };
import _myDependencyTemp from "dependency";

var __$Getters__ = [];
var __$Setters__ = [];
var __$Resetters__ = [];

function __GetDependency__(name) {
	return __$Getters__[name]();
}

function __Rewire__(name, value) {
	__$Setters__[name](value);
}

function __ResetDependency__(name) {
	__$Resetters__[name]();
}

var myDependency = _myDependencyTemp;

function __setmyDependency__(value) {
	myDependency = value;
}

function __getmyDependency__() {
	return myDependency;
}

function __resetmyDependency__() {
	myDependency = _myDependencyTemp;
}

__$Getters__["myDependency"] = __getmyDependency__;
__$Setters__["myDependency"] = __setmyDependency__;
__$Resetters__["myDependency"] = __resetmyDependency__;
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