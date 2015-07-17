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

let a='b';

const user = UserModel.getCurrent();
const moduleName = user && user.inState('activated') ? 'inside' : 'outside';

// Main app entryPoint
if (moduleName === 'inside') {
	require.ensure([], function() {
		require('inside')();
	});
}

// Login or register entryPoint
else if (moduleName === 'outside') {
	require.ensure([], function() {
		require('outside')();
	});
}

$(() => ie8Icons.fix());
