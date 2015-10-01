var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var os = require('os');
var expect = require('expect.js');


describe('BabelRewirePluginTest', function() {

	var babelTranslationOptions = {
		blacklist: 'es6.modules',
		whitelist: [ 'strict' ],
		plugins: path.resolve(__dirname, '../src/babel-plugin-rewire.js')
	};

	var babelTranslationOptionsAllEnabled = {
		plugins: path.resolve(__dirname, '../src/babel-plugin-rewire.js')
	};

	function testTranslation(testName) {
		var directory = path.resolve(__dirname, '..', 'fixtures', 'transformation', testName);

		var input = fs.readFileSync(path.resolve(directory, 'input.js'), 'utf-8');
		var expected = fs.readFileSync(path.resolve(directory, 'expected.js'), 'utf-8');

		try {
			var transformationOutput = babel.transform(input, babelTranslationOptions).code;
		} catch(error) {
			expect().fail("Transformation failed: \n" + error.stack)
		}

		var tempDir = path.resolve(os.tmpdir(), 'babel-plugin-rewire');
		console.log('TempDir: ' + tempDir);
		try {
			fs.mkdirSync(tempDir);
		} catch(error) {}

		fs.writeFileSync(tempDir + '/testexpected' + testName + '.js', transformationOutput, 'utf-8');

		if(expected != transformationOutput) {
			console.log(transformationOutput);
		}
		expect(transformationOutput.trim()).to.be(expected.trim());
	}

	function testSuccessfulTranslation(testName) {
		var directory = path.resolve(__dirname, '..', 'fixtures', 'transformation', testName);
		var input = fs.readFileSync(path.resolve(directory, 'input.js'), 'utf-8');

		var transformationResult = babel.transform(input, babelTranslationOptionsAllEnabled);
	}

	var featuresToTest = [
		'babelissue1315',
		'issue16',
		'forOf',
		'defaultImport',
		'defaultExport',
		'defaultExportWithClass',
		'defaultExportWithNamedFunction',
		'defaultExportWithObject',
		'issuePathReplaceWith',
		'importWithReactClass',
		'moduleExports',
		'multipleImports',
		'multipleImportsWithAliases',
		'namedFunctionExport',
		'namedFunctionImport',
		'namedVariableExport',
		'noDefaultExport',
		'primitiveExportWithNamedFunctionExport',
		'wildcardImport',
		'recursiveRewireCall',
		'requireExports',
		'requireMultiExports',
		'topLevelVar',
		'functionRewireScope'
	];

	featuresToTest.forEach(function(feature) {
		it('test babel-plugin-rewire for ' + feature, testTranslation.bind(null, feature));
	});

	featuresToTest.forEach(function(feature) {
		it('test successful translation babel-plugin-rewire for ' + feature, testSuccessfulTranslation.bind(null, feature));
	});
});
