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

module.exports = {
  foo: 'bar'
};
Object.defineProperty(module.exports, '__Rewire__', {
  'value': __Rewire__,
  'enumberable': false
});
Object.defineProperty(module.exports, '__set__', {
  'value': __Rewire__,
  'enumberable': false
});
Object.defineProperty(module.exports, '__ResetDependency__', {
  'value': __ResetDependency__,
  'enumberable': false
});
Object.defineProperty(module.exports, '__GetDependency__', {
  'value': __GetDependency__,
  'enumberable': false
});
Object.defineProperty(module.exports, '__get__', {
  'value': __GetDependency__,
  'enumberable': false
});