"use strict";

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
let _defaultExport = {
	addOne: function (val) {
		return val + 1;
	}
};

if ((typeof _defaultExport === "object" || typeof _defaultExport === "function") && Object.isExtensible(_defaultExport)) {
	Object.defineProperty(_defaultExport, "__Rewire__", {
		"value": __Rewire__,
		"enumerable": false
	});
	Object.defineProperty(_defaultExport, "__set__", {
		"value": __Rewire__,
		"enumerable": false
	});
	Object.defineProperty(_defaultExport, "__ResetDependency__", {
		"value": __ResetDependency__,
		"enumerable": false
	});
	Object.defineProperty(_defaultExport, "__GetDependency__", {
		"value": __GetDependency__,
		"enumerable": false
	});
	Object.defineProperty(_defaultExport, "__get__", {
		"value": __GetDependency__,
		"enumerable": false
	});
	Object.defineProperty(_defaultExport, "__RewireAPI__", {
		"value": __RewireAPI__,
		"enumerable": false
	});
}

export default _defaultExport;
export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };