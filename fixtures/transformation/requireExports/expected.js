var MyModule = _get_require()('MyModule');

function out(todo) {
  return _get_MyModule().something(todo);
}

_get_module().exports = _get_out();

function _get_require() {
  return _RewiredData__ === undefined || _RewiredData__['require'] === undefined ? require : _RewiredData__['require'];
}

function _get_MyModule() {
  return _RewiredData__ === undefined || _RewiredData__['MyModule'] === undefined ? MyModule : _RewiredData__['MyModule'];
}

function _get_module() {
  return _RewiredData__ === undefined || _RewiredData__['module'] === undefined ? module : _RewiredData__['module'];
}

function _get_out() {
  return _RewiredData__ === undefined || _RewiredData__['out'] === undefined ? out : _RewiredData__['out'];
}

let _RewiredData__ = {};
let _GETTERS__ = {
  'require': _get_require,
  'MyModule': _get_MyModule,
  'module': _get_module,
  'out': _get_out
};

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
      REWIRED_DATA[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = REWIRED_DATA[variableName];
      REWIRED_DATA[variableName] = object[variableName];
    });
    let result = callback();

    if (typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }
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

let typeOfOriginalExport = typeof module.exports;

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(module.exports, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((typeOfOriginalExport === 'object' || typeOfOriginalExport === 'function') && Object.isExtensible(module.exports)) {
  addNonEnumerableProperty('__get__', _GetDependency__);
  addNonEnumerableProperty('__GetDependency__', _GetDependency__);
  addNonEnumerableProperty('__Rewire__', _Rewire__);
  addNonEnumerableProperty('__set__', _Rewire__);
  addNonEnumerableProperty('__ResetDependency__', _ResetDependency__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}