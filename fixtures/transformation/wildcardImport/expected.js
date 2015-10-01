'use strict';

import * as _AllImportsTemp$Import from 'path/to/LargeModules.js';
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
let _AllImports$IsLifeBindingActive = true;
let AllImports = _AllImportsTemp$Import;

__$Getters__['AllImports'] = function () {
  return _AllImports$IsLifeBindingActive ? _AllImportsTemp$Import : AllImports;
};

__$Setters__['AllImports'] = function (value) {
  _AllImports$IsLifeBindingActive = false;
  AllImports = value;
};

__$Resetters__['AllImports'] = function () {
  _AllImports$IsLifeBindingActive = true;
  AllImports = _AllImportsTemp$Import;
};

export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;