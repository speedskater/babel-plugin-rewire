'use strict';

import { first as _firstTemp, second as _secondTemp } from 'path/to/another/LargeModules.js';
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

let first = _firstTemp;
let second = _secondTemp;

__$Getters__['first'] = function () {
  return first;
};

__$Setters__['first'] = function (value) {
  first = value;
};

__$Resetters__['first'] = function () {
  first = _firstTemp;
};

__$Getters__['second'] = function () {
  return second;
};

__$Setters__['second'] = function (value) {
  second = value;
};

__$Resetters__['second'] = function () {
  second = _secondTemp;
};

export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };