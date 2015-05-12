'use strict';

export { __GetDependency__ };
export { __Rewire__ };
export { __ResetDependency__ };
import { first as _firstTemp, second as _secondTemp } from 'path/to/another/LargeModules.js';
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

var first = _firstTemp;
var second = _secondTemp;

function __setfirst__(value) {
  first = value;
}

function __setsecond__(value) {
  second = value;
}

function __getfirst__() {
  return first;
}

function __getsecond__() {
  return second;
}

function __resetfirst__() {
  first = _firstTemp;
}

function __resetsecond__() {
  second = _secondTemp;
}

__$Getters__['first'] = __getfirst__;
__$Setters__['first'] = __setfirst__;
__$Resetters__['first'] = __resetfirst__;
__$Getters__['second'] = __getsecond__;
__$Setters__['second'] = __setsecond__;
__$Resetters__['second'] = __resetsecond__;