"use strict";

var generateOne = _generateOneOrig;
var addOne = _addOneOrig;
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
	"__GetDependency__": __GetDependency__,
	"__get__": __GetDependency__,
	"__Rewire__": __Rewire__,
	"__set__": __Rewire__,
	"__ResetDependency__": __ResetDependency__
};

function _generateOneOrig() {
	return 1;
}

var _generateOne = generateOne;
/* istanbul ignore next */

__$Getters__["generateOne"] = function () {
	return generateOne;
};

/* istanbul ignore next */

__$Setters__["generateOne"] = function (value) {
	generateOne = value;
};

/* istanbul ignore next */

__$Resetters__["generateOne"] = function () {
	generateOne = _generateOne;
};

function _addOneOrig(val) {
	return val + generateOne();
}

var _addOne = addOne;
/* istanbul ignore next */

__$Getters__["addOne"] = function () {
	return addOne;
};

/* istanbul ignore next */

__$Setters__["addOne"] = function (value) {
	addOne = value;
};

/* istanbul ignore next */

__$Resetters__["addOne"] = function () {
	addOne = _addOne;
};

export { _addOneOrig as addOne };
let _defaultExport = 4;

if ((typeof _defaultExport === "object" || typeof _defaultExport === "function") && Object.isExtensible(_defaultExport)) {
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
	Object.defineProperty(_defaultExport, "__RewireAPI__", {
		"value": __RewireAPI__,
		"enumberable": false
	});
}

export default _defaultExport;
export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };