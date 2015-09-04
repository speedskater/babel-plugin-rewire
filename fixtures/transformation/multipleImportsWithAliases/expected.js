'use strict';

import { first as _unoTemp, second as _dueTemp } from 'path/to/another/LargeModules.js';
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
let uno = _unoTemp;
let due = _dueTemp;
/* istanbul ignore next */

__$Getters__['uno'] = function () {
  return uno;
};

/* istanbul ignore next */

__$Setters__['uno'] = function (value) {
  uno = value;
};

/* istanbul ignore next */

__$Resetters__['uno'] = function () {
  uno = _unoTemp;
};

/* istanbul ignore next */

__$Getters__['due'] = function () {
  return due;
};

/* istanbul ignore next */

__$Setters__['due'] = function (value) {
  due = value;
};

/* istanbul ignore next */

__$Resetters__['due'] = function () {
  due = _dueTemp;
};

export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };
export default __RewireAPI__;