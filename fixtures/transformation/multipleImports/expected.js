'use strict';

import { first as _firstTemp$Import, second as _secondTemp$Import } from 'path/to/another/LargeModules.js';
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
let _first$IsLifeBindingActive = true;
let first = _firstTemp$Import;
let _second$IsLifeBindingActive = true;
let second = _secondTemp$Import;

__$Getters__['first'] = function () {
  return _first$IsLifeBindingActive ? _firstTemp$Import : first;
};

__$Setters__['first'] = function (value) {
  _first$IsLifeBindingActive = false;
  first = value;
};

__$Resetters__['first'] = function () {
  _first$IsLifeBindingActive = true;
  first = _firstTemp$Import;
};

__$Getters__['second'] = function () {
  return _second$IsLifeBindingActive ? _secondTemp$Import : second;
};

__$Setters__['second'] = function (value) {
  _second$IsLifeBindingActive = false;
  second = value;
};

__$Resetters__['second'] = function () {
  _second$IsLifeBindingActive = true;
  second = _secondTemp$Import;
};

export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;