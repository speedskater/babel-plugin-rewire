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

export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };