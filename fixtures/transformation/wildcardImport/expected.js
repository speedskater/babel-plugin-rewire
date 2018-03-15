import * as wildcardImport from './src/wildcardExport';
import { test1, test2 } from './src/namedExports';
import expect from 'expect.js';

describe('wildcard export of imported object', () => {
		it('has objects exported from namedExports', () => {
				_get__('expect')(_get__('wildcardImport').__ModuleAPI__).toBe(undefined);
				_get__('expect')(_get__('wildcardImport').test1).to.equal(_get__('test1'));
				_get__('expect')(_get__('wildcardImport').test2).to.equal(_get__('test2'));
		});
});

function _getGlobalObject() {
		try {
				if (!!global) {
						return global;
				}
		} catch (e) {
				try {
						if (!!window) {
								return window;
						}
				} catch (e) {
						return this;
				}
		}
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
		if (_RewireModuleId__ === null) {
				let globalVariable = _getGlobalObject();

				if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
						globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
				}

				_RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
		}

		return _RewireModuleId__;
}

function _getRewireRegistry__() {
		let theGlobalVariable = _getGlobalObject();

		if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
				theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
		}

		return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
		let moduleId = _getRewireModuleId__();

		let registry = _getRewireRegistry__();

		let rewireData = registry[moduleId];

		if (!rewireData) {
				registry[moduleId] = Object.create(null);
				rewireData = registry[moduleId];
		}

		return rewireData;
}

(function registerResetAll() {
		let theGlobalVariable = _getGlobalObject();

		if (!theGlobalVariable['__rewire_reset_all__']) {
				theGlobalVariable['__rewire_reset_all__'] = function () {
						theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
				};
		}
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
let _RewireAPI__ = {};

(function () {
		function addPropertyToAPIObject(name, value) {
				Object.defineProperty(_RewireAPI__, name, {
						value: value,
						enumerable: false,
						configurable: true
				});
		}

		addPropertyToAPIObject('__get__', _get__);
		addPropertyToAPIObject('__GetDependency__', _get__);
		addPropertyToAPIObject('__Rewire__', _set__);
		addPropertyToAPIObject('__set__', _set__);
		addPropertyToAPIObject('__reset__', _reset__);
		addPropertyToAPIObject('__ResetDependency__', _reset__);
		addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
		let rewireData = _getRewiredData__();

		if (rewireData[variableName] === undefined) {
				return _get_original__(variableName);
		} else {
				var value = rewireData[variableName];

				if (value === INTENTIONAL_UNDEFINED) {
						return undefined;
				} else {
						return value;
				}
		}
}

function _get_original__(variableName) {
		switch (variableName) {
				case 'expect':
						return expect;

				case 'wildcardImport':
						return _filterWildcardImport__(wildcardImport);

				case 'test1':
						return test1;

				case 'test2':
						return test2;
		}

		return undefined;
}

function _assign__(variableName, value) {
		let rewireData = _getRewiredData__();

		if (rewireData[variableName] === undefined) {
				return _set_original__(variableName, value);
		} else {
				return rewireData[variableName] = value;
		}
}

function _set_original__(variableName, _value) {
		switch (variableName) {}

		return undefined;
}

function _update_operation__(operation, variableName, prefix) {
		var oldValue = _get__(variableName);

		var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

		_assign__(variableName, newValue);

		return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
		let rewireData = _getRewiredData__();

		if (typeof variableName === 'object') {
				Object.keys(variableName).forEach(function (name) {
						rewireData[name] = variableName[name];
				});
		} else {
				if (value === undefined) {
						rewireData[variableName] = INTENTIONAL_UNDEFINED;
				} else {
						rewireData[variableName] = value;
				}

				return function () {
						_reset__(variableName);
				};
		}
}

function _reset__(variableName) {
		let rewireData = _getRewiredData__();

		delete rewireData[variableName];

		if (Object.keys(rewireData).length == 0) {
				delete _getRewireRegistry__()[_getRewireModuleId__];
		}

		;
}

function _with__(object) {
		let rewireData = _getRewiredData__();

		var rewiredVariableNames = Object.keys(object);
		var previousValues = {};

		function reset() {
				rewiredVariableNames.forEach(function (variableName) {
						rewireData[variableName] = previousValues[variableName];
				});
		}

		return function (callback) {
				rewiredVariableNames.forEach(function (variableName) {
						previousValues[variableName] = rewireData[variableName];
						rewireData[variableName] = object[variableName];
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

function _filterWildcardImport__(wildcardImport = {}) {
		let validPropertyNames = Object.keys(wildcardImport).filter(function (propertyName) {
				return propertyName !== '__get__' && propertyName !== '__set__' && propertyName !== '__reset__' && propertyName !== '__with__' && propertyName !== '__GetDependency__' && propertyName !== '__Rewire__' && propertyName !== '__ResetDependency__' && propertyName !== '__RewireAPI__';
		});
		return validPropertyNames.reduce(function (filteredWildcardImport, propertyName) {
				filteredWildcardImport[propertyName] = wildcardImport[propertyName];
				return filteredWildcardImport;
		}, {});
}

export { _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;