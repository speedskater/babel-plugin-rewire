'use strict';

var greet = _greetOrig;
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

let test = greet('world');

let _test = test;

__$Getters__['test'] = function () {
	return test;
};

__$Setters__['test'] = function (value) {
	test = value;
};

__$Resetters__['test'] = function () {
	test = _test;
};

let _defaultExport = test;

if (typeof _defaultExport === 'object' || typeof _defaultExport === 'function') {
	Object.defineProperty(_defaultExport, '__Rewire__', {
		'value': __Rewire__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__set__', {
		'value': __Rewire__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__ResetDependency__', {
		'value': __ResetDependency__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__GetDependency__', {
		'value': __GetDependency__,
		'enumberable': false
	});
	Object.defineProperty(_defaultExport, '__get__', {
		'value': __GetDependency__,
		'enumberable': false
	});
}

export default _defaultExport;

function _greetOrig(whoToGreet) {
	return 'Hello ' + whoToGreet;
}

var _greet = greet;

__$Getters__['greet'] = function () {
	return greet;
};

__$Setters__['greet'] = function (value) {
	greet = value;
};

__$Resetters__['greet'] = function () {
	greet = _greet;
};

export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };