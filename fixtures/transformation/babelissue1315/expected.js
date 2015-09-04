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
import _$Temp from 'jquery';
import _ie8IconsTemp from 'utils/ie8-icons';
import _UserModelTemp from 'models/user';

let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];
/* istanbul ignore next */

function __GetDependency__(name) {
	return __$Getters__[name]();
}

/* istanbul ignore next */

function __Rewire__(name, value) {
	__$Setters__[name](value);
}

/* istanbul ignore next */

function __ResetDependency__(name) {
	__$Resetters__[name]();
}

/* istanbul ignore next */
let __RewireAPI__ = {
	'__GetDependency__': __GetDependency__,
	'__get__': __GetDependency__,
	'__Rewire__': __Rewire__,
	'__set__': __Rewire__,
	'__ResetDependency__': __ResetDependency__
};
let $ = _$Temp;
/* istanbul ignore next */

__$Getters__['$'] = function () {
	return $;
};

/* istanbul ignore next */

__$Setters__['$'] = function (value) {
	$ = value;
};

/* istanbul ignore next */

__$Resetters__['$'] = function () {
	$ = _$Temp;
};

let ie8Icons = _ie8IconsTemp;
/* istanbul ignore next */

__$Getters__['ie8Icons'] = function () {
	return ie8Icons;
};

/* istanbul ignore next */

__$Setters__['ie8Icons'] = function (value) {
	ie8Icons = value;
};

/* istanbul ignore next */

__$Resetters__['ie8Icons'] = function () {
	ie8Icons = _ie8IconsTemp;
};

let UserModel = _UserModelTemp;
/* istanbul ignore next */

__$Getters__['UserModel'] = function () {
	return UserModel;
};

/* istanbul ignore next */

__$Setters__['UserModel'] = function (value) {
	UserModel = value;
};

/* istanbul ignore next */

__$Resetters__['UserModel'] = function () {
	UserModel = _UserModelTemp;
};

let a = 'b';

let _a = a;
/* istanbul ignore next */

__$Getters__['a'] = function () {
	return a;
};

/* istanbul ignore next */

__$Setters__['a'] = function (value) {
	a = value;
};

/* istanbul ignore next */

__$Resetters__['a'] = function () {
	a = _a;
};

let user = UserModel.getCurrent();
let _user = user;
/* istanbul ignore next */

__$Getters__['user'] = function () {
	return user;
};

/* istanbul ignore next */

__$Setters__['user'] = function (value) {
	user = value;
};

/* istanbul ignore next */

__$Resetters__['user'] = function () {
	user = _user;
};

let moduleName = user && user.inState('activated') ? 'inside' : 'outside';

// Main app entryPoint
let _moduleName = moduleName;
/* istanbul ignore next */

__$Getters__['moduleName'] = function () {
	return moduleName;
};

/* istanbul ignore next */

__$Setters__['moduleName'] = function (value) {
	moduleName = value;
};

/* istanbul ignore next */

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

$(() => ie8Icons.fix());
export { __GetDependency__, __GetDependency__ as __get__, __Rewire__, __Rewire__ as __set__, __ResetDependency__, __RewireAPI__ };
export default __RewireAPI__;