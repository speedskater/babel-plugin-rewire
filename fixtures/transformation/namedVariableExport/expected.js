"use strict";

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
let namedVariable = function (val) {
	return val + 1;
},
    namedVariable2 = function (val) {
	return val + 2;
};

let _namedVariable = namedVariable;
let _namedVariable2 = namedVariable2;
/* istanbul ignore next */

__$Getters__["namedVariable"] = function () {
	return namedVariable;
};

/* istanbul ignore next */

__$Setters__["namedVariable"] = function (value) {
	namedVariable = value;
};

/* istanbul ignore next */

__$Resetters__["namedVariable"] = function () {
	namedVariable = _namedVariable;
};

/* istanbul ignore next */

__$Getters__["namedVariable2"] = function () {
	return namedVariable2;
};

/* istanbul ignore next */

__$Setters__["namedVariable2"] = function (value) {
	namedVariable2 = value;
};

/* istanbul ignore next */

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