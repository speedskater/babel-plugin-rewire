var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var expect = require('expect.js');


describe('BabelRewirePluginTest', function() {

	var babelTranslationOptions = {
		blacklist: 'es6.modules',
		whitelist: '',
		plugins: path.resolve(__dirname, '../src/babel-rewire-plugin.js')
	};

	function testTranslation(testName) {
		var directory = path.resolve(__dirname, '..', 'fixtures', testName);

		var input = fs.readFileSync(path.resolve(directory, 'input.js'), 'utf-8');
		var expected = fs.readFileSync(path.resolve(directory, 'expected.js'), 'utf-8');

		var transformationOutput = babel.transform(input, babelTranslationOptions).code;

		if(expected != transformationOutput) {
			console.log(transformationOutput);
		}
		expect(transformationOutput).to.be(expected);
	}

	var featuresToTest = [
		'defaultImport',
		'defaultExport',
		'multipleImports',
		'multipleImportsWithAliases',
		'wildcardImport'
	];
	
	featuresToTest.forEach(function(feature) {
		it('test babel-rewire-plugin for ' + feature, testTranslation.bind(null, feature));
	});

});