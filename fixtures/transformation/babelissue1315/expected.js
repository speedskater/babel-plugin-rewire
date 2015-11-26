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

const user = _get_UserModel().getCurrent();
const moduleName = _get_user() && _get_user().inState('activated') ? 'inside' : 'outside';

// Main app entryPoint
if (_get_moduleName() === 'inside') {
	_get_require().ensure([], function () {
		_get_require()('inside')();
	});
}

// Login or register entryPoint
else if (_get_moduleName() === 'outside') {
		_get_require().ensure([], function () {
			_get_require()('outside')();
		});
	}

_get_$()(() => _get_ie8Icons().fix());

function _get_UserModel() {
	return _RewiredData__ === undefined || _RewiredData__['UserModel'] === undefined ? UserModel : _RewiredData__['UserModel'];
}

function _get_user() {
	return _RewiredData__ === undefined || _RewiredData__['user'] === undefined ? user : _RewiredData__['user'];
}

function _get_moduleName() {
	return _RewiredData__ === undefined || _RewiredData__['moduleName'] === undefined ? moduleName : _RewiredData__['moduleName'];
}

function _get_require() {
	return _RewiredData__ === undefined || _RewiredData__['require'] === undefined ? require : _RewiredData__['require'];
}

function _get_$() {
	return _RewiredData__ === undefined || _RewiredData__['$'] === undefined ? $ : _RewiredData__['$'];
}

function _get_ie8Icons() {
	return _RewiredData__ === undefined || _RewiredData__['ie8Icons'] === undefined ? ie8Icons : _RewiredData__['ie8Icons'];
}

let _RewiredData__ = {};
let _GETTERS__ = {
	'UserModel': _get_UserModel,
	'user': _get_user,
	'moduleName': _get_moduleName,
	'require': _get_require,
	'$': _get_$,
	'ie8Icons': _get_ie8Icons
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
export default _RewireAPI__;