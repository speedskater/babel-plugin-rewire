'use strict';

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
module.exports = {
  foo: 'bar'
};

if (typeof module.exports === 'object' || typeof module.exports === 'function') {
  Object.defineProperty(module.exports, '__Rewire__', {
    'value': __Rewire__,
    'enumberable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__set__', {
    'value': __Rewire__,
    'enumberable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__ResetDependency__', {
    'value': __ResetDependency__,
    'enumberable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__GetDependency__', {
    'value': __GetDependency__,
    'enumberable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__get__', {
    'value': __GetDependency__,
    'enumberable': false,
    'configurable': true
  });
  Object.defineProperty(module.exports, '__RewireAPI__', {
    'value': __RewireAPI__,
    'enumberable': false,
    'configurable': true
  });
}