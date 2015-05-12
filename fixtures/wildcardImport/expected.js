'use strict';

export { __GetDependency__ };
export { __Rewire__ };
export { __ResetDependency__ };
import * as _AllImportsTemp from 'path/to/LargeModules.js';
var __$Getters__ = [];
var __$Setters__ = [];
var __$Resetters__ = [];

function __GetDependency__(name) {
  return __$Getters__[name]();
}

function __Rewire__(name, value) {
  __$Setters__[name](value);
}

function __ResetDependency__(name) {
  __$Resetters__[name]();
}

var AllImports = _AllImportsTemp;

function __setAllImports__(value) {
  AllImports = value;
}

function __getAllImports__() {
  return AllImports;
}

function __resetAllImports__() {
  AllImports = _AllImportsTemp;
}

__$Getters__['AllImports'] = __getAllImports__;
__$Setters__['AllImports'] = __setAllImports__;
__$Resetters__['AllImports'] = __resetAllImports__;