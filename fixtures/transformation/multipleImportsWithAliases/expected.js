'use strict';

import { first as _unoTemp$Import, second as _dueTemp$Import } from 'path/to/another/LargeModules.js';
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
let _uno$IsLifeBindingActive = true;
let uno = _unoTemp$Import;
let _due$IsLifeBindingActive = true;
let due = _dueTemp$Import;

__$Getters__['uno'] = function () {
  return _uno$IsLifeBindingActive ? _unoTemp$Import : uno;
};

__$Setters__['uno'] = function (value) {
  _uno$IsLifeBindingActive = false;
  uno = value;
};

__$Resetters__['uno'] = function () {
  _uno$IsLifeBindingActive = true;
  uno = _unoTemp$Import;
};

__$Getters__['due'] = function () {
  return _due$IsLifeBindingActive ? _dueTemp$Import : due;
};

__$Setters__['due'] = function (value) {
  _due$IsLifeBindingActive = false;
  due = value;
};

__$Resetters__['due'] = function () {
  _due$IsLifeBindingActive = true;
  due = _dueTemp$Import;
};

export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;