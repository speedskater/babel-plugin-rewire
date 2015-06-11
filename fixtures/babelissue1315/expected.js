'use strict';

export { __GetDependency__ };
export { __Rewire__ };
export { __ResetDependency__ };
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

var __$Getters__ = [];
var __$Setters__ = [];
var __$Resetters__ = [];

function __GetDependency__(name) {
	return __$Getters__[name]();
}

function __Rewire__(name, value) {
	__$Setters__[name](value);
}

function __ResetDependency__(name) {
	__$Resetters__[name]();
}

var $ = _$Temp;

function __set$__(value) {
	$ = value;
}

function __get$__() {
	return $;
}

function __reset$__() {
	$ = _$Temp;
}

__$Getters__['$'] = __get$__;
__$Setters__['$'] = __set$__;
__$Resetters__['$'] = __reset$__;
var ie8Icons = _ie8IconsTemp;

function __setie8Icons__(value) {
	ie8Icons = value;
}

function __getie8Icons__() {
	return ie8Icons;
}

function __resetie8Icons__() {
	ie8Icons = _ie8IconsTemp;
}

__$Getters__['ie8Icons'] = __getie8Icons__;
__$Setters__['ie8Icons'] = __setie8Icons__;
__$Resetters__['ie8Icons'] = __resetie8Icons__;
var UserModel = _UserModelTemp;

function __setUserModel__(value) {
	UserModel = value;
}

function __getUserModel__() {
	return UserModel;
}

function __resetUserModel__() {
	UserModel = _UserModelTemp;
}

__$Getters__['UserModel'] = __getUserModel__;
__$Setters__['UserModel'] = __setUserModel__;
__$Resetters__['UserModel'] = __resetUserModel__;
var a = 'b';

var user = UserModel.getCurrent();
var moduleName = user && user.inState('activated') ? 'inside' : 'outside';

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

$(function () {
	return ie8Icons.fix();
});