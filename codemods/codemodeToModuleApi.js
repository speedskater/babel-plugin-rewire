var babel = require('babel-core');
var codeModPlugin = require('./codemodPlugin.js');

export default function ({ source }, api) {

	return babel.transform(source, {
		compact: false,
		"plugins": [ codeModPlugin ]
	}).code;

}
