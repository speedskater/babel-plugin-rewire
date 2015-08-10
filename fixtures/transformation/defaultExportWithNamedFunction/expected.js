"use strict";

import _myDependencyTemp from 'dependency';

var helloWorld = _helloWorldOrig;
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

function _helloWorldOrig() {
	console.log("Hello World!");
}

var _helloWorld = helloWorld;

__$Getters__["helloWorld"] = function () {
	return helloWorld;
};

__$Setters__["helloWorld"] = function (value) {
	helloWorld = value;
};

__$Resetters__["helloWorld"] = function () {
	helloWorld = _helloWorld;
};

var _defaultExport = helloWorld;

if (typeof _defaultExport === "object" || typeof _defaultExport === "function") {
	Object.defineProperty(_defaultExport, "__Rewire__", {
		"value": __Rewire__,
		"enumberable": false
	});
	Object.defineProperty(_defaultExport, "__set__", {
		"value": __Rewire__,
		"enumberable": false
	});
	Object.defineProperty(_defaultExport, "__ResetDependency__", {
		"value": __ResetDependency__,
		"enumberable": false
	});
	Object.defineProperty(_defaultExport, "__GetDependency__", {
		"value": __GetDependency__,
		"enumberable": false
	});
	Object.defineProperty(_defaultExport, "__get__", {
		"value": __GetDependency__,
		"enumberable": false
	});
}

export default _defaultExport;
export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };