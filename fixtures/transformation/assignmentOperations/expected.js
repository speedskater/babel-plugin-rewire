let value = 'initial';

export function getValue() {
	return _get__('value');
}

export function setValue(newValue) {
	_assign__('value', newValue);
}

export function assign(newValue) {
	return _assign__('value', newValue);
}

export function additionAssignement(addition) {
	return _assign__('value', _get__('value') + addition);
}

export function subtractionAssignment(valueToSubtract) {
	return _assign__('value', _get__('value') - valueToSubtract);
}

export function multiplicationAssignment(valueToMultiply) {
	return _assign__('value', _get__('value') * valueToMultiply);
}

export function divisionAssignment(valueToDivideWith) {
	return _assign__('value', _get__('value') / valueToDivideWith);
}

export function remainderAssignement(valueToCalculcateModulWith) {
	return _assign__('value', _get__('value') % valueToCalculcateModulWith);
}

export function leftShiftAssignment(amountToShift) {
	return _assign__('value', _get__('value') << amountToShift);
}

export function rightShiftAssignment(amountToShift) {
	return _assign__('value', _get__('value') >> amountToShift);
}

export function unsignedRightShiftAssignment(amountToShift) {
	return _assign__('value', _get__('value') >>> amountToShift);
}

export function bitwiseAndAssignement(operand) {
	return _assign__('value', _get__('value') & operand);
}

export function bitwiseOrAssignement(operand) {
	return _assign__('value', _get__('value') | operand);
}

export function bitwiseXorAssignment(operand) {
	return _assign__('value', _get__('value') ^ operand);
}
let _RewiredData__ = {};

function _get__(variableName) {
	return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'value':
			return value;
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
	switch (variableName) {
		case 'value':
			return value = _value;
	}

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

export { _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;