'use strict';

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
module.exports = {
  foo: 'bar'
};

if (typeof module.exports === 'object' || typeof module.exports === 'function') {
  Object.defineProperty(module.exports, '__Rewire__', {
    'value': _Rewire__,
    'enumerable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__set__', {
    'value': _Rewire__,
    'enumerable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__ResetDependency__', {
    'value': _ResetDependency__,
    'enumerable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__GetDependency__', {
    'value': _GetDependency__,
    'enumerable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__get__', {
    'value': _GetDependency__,
    'enumerable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__RewireAPI__', {
    'value': _RewireAPI__,
    'enumerable': false,
    'configurable': true
  });
}