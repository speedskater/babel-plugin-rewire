'use strict';

import * as _AllImportsTemp from 'path/to/LargeModules.js';
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
  '__GetDependency__': __GetDependency__,
  '__get__': __GetDependency__,
  '__Rewire__': __Rewire__,
  '__set__': __Rewire__,
  '__ResetDependency__': __ResetDependency__
};
let AllImports = _AllImportsTemp;

__$Getters__['AllImports'] = function () {
  return AllImports;
};

__$Setters__['AllImports'] = function (value) {
  AllImports = value;
};

__$Resetters__['AllImports'] = function () {
  AllImports = _AllImportsTemp;
};

export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };
export default __RewireAPI__;