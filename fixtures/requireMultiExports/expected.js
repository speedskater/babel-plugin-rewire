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

function out(todo) {
  return MyModule.something(todo);
}

module.exports.out = out;
module.exports.other = 'Foo';
module.exports.__GetDependency__ = __GetDependency__;
module.exports.__get__ = __GetDependency__;
module.exports.__Rewire__ = __Rewire__;
module.exports.__set__ = __Rewire__;
module.exports.__ResetDependency__ = __ResetDependency__;