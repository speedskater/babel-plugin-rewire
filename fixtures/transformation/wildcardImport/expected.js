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
let _RewiredData__ = {};

function _get__(variableName) {
		return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
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
		if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
				return _set_original__(variableName, value);
		} else {
				return _RewiredData__[variableName] = value;
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
		return _RewiredData__[variableName] = value;
}

function _reset__(variableName) {
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

		addPropertyToAPIObject('__get__', _get__);
		addPropertyToAPIObject('__GetDependency__', _get__);
		addPropertyToAPIObject('__Rewire__', _set__);
		addPropertyToAPIObject('__set__', _set__);
		addPropertyToAPIObject('__reset__', _reset__);
		addPropertyToAPIObject('__ResetDependency__', _reset__);
		addPropertyToAPIObject('__with__', _with__);
})();

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
