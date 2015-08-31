var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var expect = require('expect.js');
var hook = require('node-hook');
require('core-js');

function isSampleCode(filename) {
	var samplesPath = path.resolve(path.join(__dirname, '../samples/'));
	return (filename.substr(0, samplesPath.length) === samplesPath);
}

function transformSampleCodeToTestWithBabelPluginRewire(source, filename) {
	var babelTransformationOptions = {
		plugins: path.resolve(__dirname, '../src/babel-plugin-rewire.js'),
		optional:[
			'runtime',
			'es6.spec.blockScoping',
			'es6.spec.symbols',
			'es6.spec.templateLiterals'
		]
	};

	/*
	if(isSampleCode(filename)) {
		console.log("=========== " + filename + "============");
		var code = babel.transform(source, babelTransformationOptions).code;
		console.log(code);
		return code;
	}*/
	return isSampleCode(filename) ? babel.transform(source, babelTransformationOptions).code : source;
}

hook.hook('.js', transformSampleCodeToTestWithBabelPluginRewire);
require('../samples/issue16/sample.js');
require('../samples/issue18/sample.js');
require('../samples/issue19/sample.js');
require('../samples/issue20/sample.js');
require('../samples/issue22/sample.js');
require('../samples/issue28/sample.js');
require('../samples/issue29/sample.js');
require('../samples/issue30/sample.js');
require('../samples/issue33/sample.js');
require('../samples/issue48/sample.js');
require('../samples/functionRewireScope/sample.js');
require('../samples/namedExportsRewire/sample.js');
require('../samples/namedExportRewireSupport/sample.js');
hook.unhook('.js'); // removes your own transform
