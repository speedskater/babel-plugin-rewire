"use strict";

var generateOne = _generateOneOrig;
var addOne = _addOneOrig;
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
	"__GetDependency__": _GetDependency__,
	"__get__": _GetDependency__,
	"__Rewire__": _Rewire__,
	"__set__": _Rewire__,
	"__ResetDependency__": _ResetDependency__
};

function _generateOneOrig() {
	return 1;
}

var _generateOne = generateOne;

__$Getters__["generateOne"] = function () {
	return generateOne;
};

__$Setters__["generateOne"] = function (value) {
	generateOne = value;
};

__$Resetters__["generateOne"] = function () {
	generateOne = _generateOne;
};

function _addOneOrig(val) {
	return val + generateOne();
}

var _addOne = addOne;

__$Getters__["addOne"] = function () {
	return addOne;
};

__$Setters__["addOne"] = function (value) {
	addOne = value;
};

__$Resetters__["addOne"] = function () {
	addOne = _addOne;
};

export { _addOneOrig as addOne };
let _defaultExport = 4;

if ((typeof _defaultExport === "object" || typeof _defaultExport === "function") && Object.isExtensible(_defaultExport)) {
	Object.defineProperty(_defaultExport, "__Rewire__", {
		"value": _Rewire__,
		"enumerable": false,
		"configurable": true
	});
	Object.defineProperty(_defaultExport, "__set__", {
		"value": _Rewire__,
		"enumerable": false,
		"configurable": true
	});
	Object.defineProperty(_defaultExport, "__ResetDependency__", {
		"value": _ResetDependency__,
		"enumerable": false,
		"configurable": true
	});
	Object.defineProperty(_defaultExport, "__GetDependency__", {
		"value": _GetDependency__,
		"enumerable": false,
		"configurable": true
	});
	Object.defineProperty(_defaultExport, "__get__", {
		"value": _GetDependency__,
		"enumerable": false,
		"configurable": true
	});
	Object.defineProperty(_defaultExport, "__RewireAPI__", {
		"value": _RewireAPI__,
		"enumerable": false,
		"configurable": true
	});
}

export default _defaultExport;
export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };