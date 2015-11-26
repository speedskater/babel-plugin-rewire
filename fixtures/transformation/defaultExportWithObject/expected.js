import aFunction from 'myModule';

let _DefaultExportValue = {
	addOne: function (val) {
		return _get_aFunction()() + 1;
	}
};
export default _DefaultExportValue;
let typeOfOriginalExport = typeof _DefaultExportValue;

function addNonEnumerableProperty(name, value) {
	Object.defineProperty(_DefaultExportValue, name, {
		value: value,
		enumerable: false,
		configurable: true
	});
}

if ((typeOfOriginalExport === 'object' || typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
	addNonEnumerableProperty('__get__', _GetDependency__);
	addNonEnumerableProperty('__GetDependency__', _GetDependency__);
	addNonEnumerableProperty('__Rewire__', _Rewire__);
	addNonEnumerableProperty('__set__', _Rewire__);
	addNonEnumerableProperty('__ResetDependency__', _ResetDependency__);
	addNonEnumerableProperty('__with__', _with__);
	addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

function _get_aFunction() {
	return _RewiredData__ === undefined || _RewiredData__['aFunction'] === undefined ? aFunction : _RewiredData__['aFunction'];
}

let _RewiredData__ = {};
let _GETTERS__ = {
	'aFunction': _get_aFunction
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

export { _GetDependency__ as __get__, _GetDependency__ as __GetDependency__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };