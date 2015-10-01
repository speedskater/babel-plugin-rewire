'use strict';

import _MyModuleTemp$Import from 'path/to/MyModule.js';
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
let _MyModule$IsLifeBindingActive = true;
let MyModule = _MyModuleTemp$Import;

__$Getters__['MyModule'] = function () {
  return _MyModule$IsLifeBindingActive ? _MyModuleTemp$Import : MyModule;
};

__$Setters__['MyModule'] = function (value) {
  _MyModule$IsLifeBindingActive = false;
  MyModule = value;
};

__$Resetters__['MyModule'] = function () {
  _MyModule$IsLifeBindingActive = true;
  MyModule = _MyModuleTemp$Import;
};

export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;