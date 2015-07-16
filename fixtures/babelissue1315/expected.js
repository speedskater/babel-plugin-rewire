'use strict';

import 'babel/polyfill';

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
import _$Temp from 'jquery';
import _ie8IconsTemp from 'utils/ie8-icons';
import _UserModelTemp from 'models/user';

let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];

function __GetDependency__(name) {
	return __$Getters__[name]();
}

function __Rewire__(name, value) {
	__$Setters__[name](value);
}

function __ResetDependency__(name) {
	__$Resetters__[name]();
}

let $ = _$Temp;

__$Getters__['$'] = function () {
	return $;
};

__$Setters__['$'] = function (value) {
	$ = value;
};

__$Resetters__['$'] = function () {
	$ = _$Temp;
};

let ie8Icons = _ie8IconsTemp;

__$Getters__['ie8Icons'] = function () {
	return ie8Icons;
};

__$Setters__['ie8Icons'] = function (value) {
	ie8Icons = value;
};

__$Resetters__['ie8Icons'] = function () {
	ie8Icons = _ie8IconsTemp;
};

let UserModel = _UserModelTemp;

__$Getters__['UserModel'] = function () {
	return UserModel;
};

__$Setters__['UserModel'] = function (value) {
	UserModel = value;
};

__$Resetters__['UserModel'] = function () {
	UserModel = _UserModelTemp;
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

// Main app entryPoint
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

$(() => ie8Icons.fix());
export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };