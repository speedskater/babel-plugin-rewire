import "babel/polyfill";

import 'underscore-wrapper';
import 'jquery-wrapper';
import 'underscore-wrapper';
import 'backbone-wrapper';
import 'datepicker-wrapper';
import 'moment-wrapper';
import 'handlebars-wrapper';

// IE8 matchMedia polyfill
import 'matchMedia';
import 'matchMedia.addListener';

// Set up custom helpers and modules incompatable with module systems
import 'utils/polyfills';
import 'script!vendor/scripts/highcharts/adapters/standalone-framework.src.js';
import 'script!vendor/scripts/highcharts/highcharts.src.js';

// Kick off the application
import $ from 'jquery';
import ie8Icons from 'utils/ie8-icons';
import UserModel from 'models/user';

let a = 'b';

const user = _get__('UserModel').getCurrent();
const moduleName = _get__('user') && _get__('user').inState('activated') ? 'inside' : 'outside';

// Main app entryPoint
if (_get__('moduleName') === 'inside') {
	_get__('require').ensure([], function () {
		_get__('require')('inside')();
	});
}

// Login or register entryPoint
else if (_get__('moduleName') === 'outside') {
		_get__('require').ensure([], function () {
			_get__('require')('outside')();
		});
	}

_get__('$')(() => _get__('ie8Icons').fix());
let _RewiredData__ = {};

function _get__(variableName) {
	return _RewiredData__ === undefined || _RewiredData__[variableName] === undefined ? _get_original__(variableName) : _RewiredData__[variableName];
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'UserModel':
			return UserModel;

		case 'user':
			return user;

		case 'moduleName':
			return moduleName;

		case 'require':
			return require;

		case '$':
			return $;

		case 'ie8Icons':
			return ie8Icons;
	}

	return undefined;
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
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

export { _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;