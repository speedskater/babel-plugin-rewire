"use strict";

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
let namedVariable = function (val) {
	return val + 1;
},
    namedVariable2 = function (val) {
	return val + 2;
};

let _namedVariable = namedVariable;
let _namedVariable2 = namedVariable2;

__$Getters__["namedVariable"] = function () {
	return namedVariable;
};

__$Setters__["namedVariable"] = function (value) {
	namedVariable = value;
};

__$Resetters__["namedVariable"] = function () {
	namedVariable = _namedVariable;
};

__$Getters__["namedVariable2"] = function () {
	return namedVariable2;
};

__$Setters__["namedVariable2"] = function (value) {
	namedVariable2 = value;
};

__$Resetters__["namedVariable2"] = function () {
	namedVariable2 = _namedVariable2;
};

export { _namedVariable as namedVariable };
export { _namedVariable2 as namedVariable2 };

let _defaultExport = function (val) {
	return namedVariable(val) + namedVariable2(val);
};

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