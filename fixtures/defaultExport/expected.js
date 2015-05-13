"use strict";

export { __GetDependency__ };
export { __Rewire__ };
export { __ResetDependency__ };
import _MyModuleTemp from "path/to/MyModule.js";

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

var MyModule = _MyModuleTemp;

function __setMyModule__(value) {
  MyModule = value;
}

function __getMyModule__() {
  return MyModule;
}

function __resetMyModule__() {
  MyModule = _MyModuleTemp;
}

__$Getters__["MyModule"] = __getMyModule__;
__$Setters__["MyModule"] = __setMyModule__;
__$Resetters__["MyModule"] = __resetMyModule__;
export default Object.assign("", {
  "__Rewire__": __Rewire__,
  "__set__": __Rewire__,
  "__ResetDependency__": __ResetDependency__,
  "__GetDependency__": __GetDependency__,
  "__get__": __GetDependency__
});