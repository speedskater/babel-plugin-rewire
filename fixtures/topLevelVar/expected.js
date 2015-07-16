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

let MyModule = require('MyModule');

let _MyModule = MyModule;

__$Getters__['MyModule'] = function () {
  return MyModule;
};

__$Setters__['MyModule'] = function (value) {
  MyModule = value;
};

__$Resetters__['MyModule'] = function () {
  MyModule = _MyModule;
};

let Temp,
    Thing = MyModule.doDah;

let _Thing = Thing;

__$Getters__['Thing'] = function () {
  return Thing;
};

__$Setters__['Thing'] = function (value) {
  Thing = value;
};

__$Resetters__['Thing'] = function () {
  Thing = _Thing;
};

function out(todo) {
  var result = Thing.process(todo);
  return MyModule.something(result);
}

module.exports = out;
module.exports.__GetDependency__ = __GetDependency__;
module.exports.__get__ = __GetDependency__;
module.exports.__Rewire__ = __Rewire__;
module.exports.__set__ = __Rewire__;
module.exports.__ResetDependency__ = __ResetDependency__;