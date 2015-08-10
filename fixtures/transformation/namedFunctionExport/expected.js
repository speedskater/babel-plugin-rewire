"use strict";

var namedFunction = _namedFunctionOrig;
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

function _namedFunctionOrig(val) {
	return val + 1;
}

var _namedFunction = namedFunction;

__$Getters__["namedFunction"] = function () {
	return namedFunction;
};

__$Setters__["namedFunction"] = function (value) {
	namedFunction = value;
};

__$Resetters__["namedFunction"] = function () {
	namedFunction = _namedFunction;
};

export { _namedFunctionOrig as namedFunction };

let _defaultExport = function (val) {
	return namedFunction(val);
};

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