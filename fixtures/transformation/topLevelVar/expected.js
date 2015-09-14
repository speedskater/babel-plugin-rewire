'use strict';

var out = _outOrig;
let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];
/* istanbul ignore next */

function __GetDependency__(name) {
  return __$Getters__[name]();
}

/* istanbul ignore next */

function __Rewire__(name, value) {
  __$Setters__[name](value);
}

/* istanbul ignore next */

function __ResetDependency__(name) {
  __$Resetters__[name]();
}

/* istanbul ignore next */
let __RewireAPI__ = {
  '__GetDependency__': __GetDependency__,
  '__get__': __GetDependency__,
  '__Rewire__': __Rewire__,
  '__set__': __Rewire__,
  '__ResetDependency__': __ResetDependency__
};
var MyModule = require('MyModule');

var _MyModule = MyModule;
/* istanbul ignore next */

__$Getters__['MyModule'] = function () {
  return MyModule;
};

/* istanbul ignore next */

__$Setters__['MyModule'] = function (value) {
  MyModule = value;
};

/* istanbul ignore next */

__$Resetters__['MyModule'] = function () {
  MyModule = _MyModule;
};

var Temp,
    Thing = MyModule.doDah;

var _Thing = Thing;
/* istanbul ignore next */

__$Getters__['Thing'] = function () {
  return Thing;
};

/* istanbul ignore next */

__$Setters__['Thing'] = function (value) {
  Thing = value;
};

/* istanbul ignore next */

__$Resetters__['Thing'] = function () {
  Thing = _Thing;
};

function _outOrig(todo) {
  var result = Thing.process(todo);
  return MyModule.something(result);
}

var _out = out;
/* istanbul ignore next */

__$Getters__['out'] = function () {
  return out;
};

/* istanbul ignore next */

__$Setters__['out'] = function (value) {
  out = value;
};

/* istanbul ignore next */

__$Resetters__['out'] = function () {
  out = _out;
};

module.exports = out;

if (typeof module.exports === 'object' || typeof module.exports === 'function') {
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
  Object.defineProperty(module.exports, '__RewireAPI__', {
    'value': __RewireAPI__,
    'enumberable': false
  });
}