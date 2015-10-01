'use strict';

import { foo as _fooTemp$Import } from './dependency';

/** Executes the module. */
var run = _runOrig;
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
	'__GetDependency__': _GetDependency__,
	'__get__': _GetDependency__,
	'__Rewire__': _Rewire__,
	'__set__': _Rewire__,
	'__ResetDependency__': _ResetDependency__
};
/** @module main */

'use strict';let _foo$IsLifeBindingActive = true;
let foo = _fooTemp$Import;

__$Getters__['foo'] = function () {
	return _foo$IsLifeBindingActive ? _fooTemp$Import : foo;
};

__$Setters__['foo'] = function (value) {
	_foo$IsLifeBindingActive = false;
	foo = value;
};

__$Resetters__['foo'] = function () {
	_foo$IsLifeBindingActive = true;
	foo = _fooTemp$Import;
};

function _runOrig() {
	_GetDependency__('foo')('bar');
}

var _run = run;

__$Getters__['run'] = function () {
	return run;
};

__$Setters__['run'] = function (value) {
	run = value;
};

__$Resetters__['run'] = function () {
	run = _run;
};

export { _runOrig as run };
export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;