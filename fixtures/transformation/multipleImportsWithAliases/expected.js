'use strict';

import { first as _unoTemp, second as _dueTemp } from 'path/to/another/LargeModules.js';
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

let uno = _unoTemp;
let due = _dueTemp;

__$Getters__['uno'] = function () {
  return uno;
};

__$Setters__['uno'] = function (value) {
  uno = value;
};

__$Resetters__['uno'] = function () {
  uno = _unoTemp;
};

__$Getters__['due'] = function () {
  return due;
};

__$Setters__['due'] = function (value) {
  due = value;
};

__$Resetters__['due'] = function () {
  due = _dueTemp;
};

export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };