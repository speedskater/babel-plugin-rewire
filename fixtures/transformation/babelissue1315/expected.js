'use strict';

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
import _$Temp$Import from 'jquery';
import _ie8IconsTemp$Import from 'utils/ie8-icons';
import _UserModelTemp$Import from 'models/user';

let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];

function _GetDependency__(name) {
	return __$Getters__[name]();
}

function _Rewire__(name, value) {
	__$Setters__[name](value);
}

function _ResetDependency__(name) {
	__$Resetters__[name]();
}

let _RewireAPI__ = {
	'__GetDependency__': _GetDependency__,
	'__get__': _GetDependency__,
	'__Rewire__': _Rewire__,
	'__set__': _Rewire__,
	'__ResetDependency__': _ResetDependency__
};
let _$$IsLifeBindingActive = true;
let $ = _$Temp$Import;

__$Getters__['$'] = function () {
	return _$$IsLifeBindingActive ? _$Temp$Import : $;
};

__$Setters__['$'] = function (value) {
	_$$IsLifeBindingActive = false;
	$ = value;
};

__$Resetters__['$'] = function () {
	_$$IsLifeBindingActive = true;
	$ = _$Temp$Import;
};

let _ie8Icons$IsLifeBindingActive = true;
let ie8Icons = _ie8IconsTemp$Import;

__$Getters__['ie8Icons'] = function () {
	return _ie8Icons$IsLifeBindingActive ? _ie8IconsTemp$Import : ie8Icons;
};

__$Setters__['ie8Icons'] = function (value) {
	_ie8Icons$IsLifeBindingActive = false;
	ie8Icons = value;
};

__$Resetters__['ie8Icons'] = function () {
	_ie8Icons$IsLifeBindingActive = true;
	ie8Icons = _ie8IconsTemp$Import;
};

let _UserModel$IsLifeBindingActive = true;
let UserModel = _UserModelTemp$Import;

__$Getters__['UserModel'] = function () {
	return _UserModel$IsLifeBindingActive ? _UserModelTemp$Import : UserModel;
};

__$Setters__['UserModel'] = function (value) {
	_UserModel$IsLifeBindingActive = false;
	UserModel = value;
};

__$Resetters__['UserModel'] = function () {
	_UserModel$IsLifeBindingActive = true;
	UserModel = _UserModelTemp$Import;
};

let a = 'b';

let _a = a;

__$Getters__['a'] = function () {
	return a;
};

__$Setters__['a'] = function (value) {
	a = value;
};

__$Resetters__['a'] = function () {
	a = _a;
};

let user = UserModel.getCurrent();
let _user = user;

__$Getters__['user'] = function () {
	return user;
};

__$Setters__['user'] = function (value) {
	user = value;
};

__$Resetters__['user'] = function () {
	user = _user;
};

let moduleName = user && user.inState('activated') ? 'inside' : 'outside';

// Main app entryPoint
let _moduleName = moduleName;

__$Getters__['moduleName'] = function () {
	return moduleName;
};

__$Setters__['moduleName'] = function (value) {
	moduleName = value;
};

__$Resetters__['moduleName'] = function () {
	moduleName = _moduleName;
};

if (moduleName === 'inside') {
	require.ensure([], function () {
		require('inside')();
	});
}

// Login or register entryPoint
else if (moduleName === 'outside') {
		require.ensure([], function () {
			require('outside')();
		});
	}

_GetDependency__('$')(() => _GetDependency__('ie8Icons').fix());
export { _GetDependency__ as __GetDependency__, _GetDependency__ as __get__, _Rewire__ as __Rewire__, _Rewire__ as __set__, _ResetDependency__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;