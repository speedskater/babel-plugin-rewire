'use strict';

import _MyModuleTemp from 'path/to/MyModule.js';
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
let MyModule = _MyModuleTemp;
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
  MyModule = _MyModuleTemp;
};

export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };
export default __RewireAPI__;