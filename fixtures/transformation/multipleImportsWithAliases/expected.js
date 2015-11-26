import { first as uno, second as due } from 'path/to/another/LargeModules.js';
let _RewiredData__ = {};
let _GETTERS__ = {};

function _GetDependency__(variableName) {
  return _GETTERS__[variableName]();
}

function _Rewire__(variableName, value) {
  return _RewiredData__[variableName] = value;
}

function _ResetDependency__(variableName) {
  delete _RewiredData__[variableName];
}

function _with__(object) {
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      _RewiredData__[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = _RewiredData__[variableName];
      _RewiredData__[variableName] = object[variableName];
    });
    let result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

let _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _GetDependency__);
  addPropertyToAPIObject('__GetDependency__', _GetDependency__);
  addPropertyToAPIObject('__Rewire__', _Rewire__);
  addPropertyToAPIObject('__set__', _Rewire__);
  addPropertyToAPIObject('__ResetDependency__', _ResetDependency__);
  addPropertyToAPIObject('__with__', _with__);
})();

export { _GetDependency__ as __get__, _GetDependency__ as __GetDependency__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;