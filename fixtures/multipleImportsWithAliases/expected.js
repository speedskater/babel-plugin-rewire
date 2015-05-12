'use strict';

export { __GetDependency__ };
export { __Rewire__ };
export { __ResetDependency__ };
import { first as _unoTemp, second as _dueTemp } from 'path/to/another/LargeModules.js';
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

var uno = _unoTemp;
var due = _dueTemp;

function __setuno__(value) {
  uno = value;
}

function __setdue__(value) {
  due = value;
}

function __getuno__() {
  return uno;
}

function __getdue__() {
  return due;
}

function __resetuno__() {
  uno = _unoTemp;
}

function __resetdue__() {
  due = _dueTemp;
}

__$Getters__['uno'] = __getuno__;
__$Setters__['uno'] = __setuno__;
__$Resetters__['uno'] = __resetuno__;
__$Getters__['due'] = __getdue__;
__$Setters__['due'] = __setdue__;
__$Resetters__['due'] = __resetdue__;