var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var os = require('os');
var expect = require('expect.js');
var babelPluginRewire = require('../lib/babel-plugin-rewire.js'); //  require('../test-helpers/getBabelPluginRewire.js');


describe('BabelRewirePluginTest', function() {

	var babelTranslationOptions = {
		"presets": ["react"],
		"plugins": [
			babelPluginRewire,
			"syntax-async-functions",
			"syntax-flow",
			"transform-export-extensions"
		]
	};

	var babelTranslationOptionsIgnoredIdentifiers = {
		"presets": ["react"],
		"plugins": [
			[babelPluginRewire, {
				ignoredIdentifiers: ['ignoredIdentifier1', 'ignoredIdentifier2']
			}],
			"syntax-async-functions",
			"syntax-flow",
			"transform-export-extensions"
		]
	};

	var babelTranslationOptionsAllEnabled = {
		"presets": ["es2015", "react"], //,
		"plugins": [
			babelPluginRewire,
			"syntax-async-functions",
			"transform-runtime",
			"transform-es2015-block-scoping",
			"transform-es2015-template-literals",
			"transform-es2015-typeof-symbol",
			"transform-export-extensions",
			"transform-regenerator"
		]
	};

	function testTranslation(testName, options) {
		var directory = path.resolve(__dirname, '..', 'fixtures', 'transformation', testName);

		var input = fs.readFileSync(path.resolve(directory, 'input.js'), 'utf-8');
		var expected = fs.readFileSync(path.resolve(directory, 'expected.js'), 'utf-8');

		try {
			var transformationOutput = babel.transform(input, options).code;
		} catch(error) {
			expect().fail("Transformation failed: \n" + error.stack)
		}

		var tempDir = path.resolve(os.tmpdir(), 'babel-plugin-rewire');
		console.log('TempDir: ' + tempDir);
		try {
			fs.mkdirSync(tempDir);
		} catch(error) {}
		
		fs.writeFileSync(tempDir + '/testexpected' + testName + '.js', transformationOutput, 'utf-8');
		//fs.writeFileSync(path.resolve(directory, 'expected.js'), transformationOutput, 'utf-8');

		if(expected.trim() != transformationOutput.trim()) {
			console.log(transformationOutput);
		}
		expect(transformationOutput.trim()).to.be(expected.trim());
	}

	function testSuccessfulTranslation(testName, additionalOptions) {
		var directory = path.resolve(__dirname, '..', 'fixtures', 'transformation', testName);
		var input = fs.readFileSync(path.resolve(directory, 'input.js'), 'utf-8');

		var transformationResult = babel.transform(input, combineOptions(babelTranslationOptionsAllEnabled, additionalOptions));
	}

	function testIgnoredIdentifiersTranslation(testName) {
		var directory = path.resolve(__dirname, '..', 'fixtures', 'transformation', testName);
		var input = fs.readFileSync(path.resolve(directory, 'input.js'), 'utf-8');

		var transformationResult = babel.transform(input, babelTranslationOptionsAllEnabledIgnoredIdentifiers);
	}

	function combineOptions(baseOptions, additionalOptions) {
		var additionalPresets = (additionalOptions && additionalOptions.presets) || [];
		var additionalPlugins = (additionalOptions && additionalOptions.plugins) || [];

		return {
			presets: baseOptions.presets.concat(additionalPresets),
			plugins: baseOptions.plugins.concat(additionalPlugins)
		};
	}


	var featuresToTest = [
		'babelissue1315',
		'issue16',
		'forOf',
		'commonJSExportOnly',
		'defaultImport',
		'defaultExport',
		'defaultExportImport',
		'defaultExportWithClass',
		'defaultExportWithNamedFunction',
		'defaultExportWithObject',
		'issuePathReplaceWith',
		'importWithReactClass',
		'jsxSupport',
		'jsxWithComponentImport',
		'moduleExports',
		'multipleImports',
		'multipleImportsWithAliases',
		'namedFunctionExport',
		'namedFunctionImport',
		'namedVariableExport',
		'noDefaultExport',
		'passThrough',
		'primitiveExportWithNamedFunctionExport',
		'wildcardImport',
		'wildcardExport',
		'namedWildcardExport',
		'recursiveRewireCall',
		'requireExports',
		'requireMultiExports',
		'switch',
		'topLevelVar',
		'functionRewireScope',
		'issue69',
		'issue71-tdz',
		'issue71-tdz-index',
		'flowTypeExport',
		'flowTypeImport',
		'updateOperations',
		'assignmentOperations',
		'rewiringOfReactComponents',
		'rewiringOfSimpleFunctionalComponents',
		'issue121',
		'issue133',
		'issue136',
		'issue152',
		'issue155'
	];

	var stage0FeaturesToTests = [
		'issue164'
	];


	var ignoredIdentifiers = [
		'ignoredIdentifiers'
	];

	featuresToTest.forEach(function(feature) {
		it('test babel-plugin-rewire for ' + feature, testTranslation.bind(null, feature, babelTranslationOptions));
	});

	featuresToTest.forEach(function(feature) {
		it('test translation babel-plugin-rewire with ignored identifiers for ' + feature, testTranslation.bind(null, feature, babelTranslationOptions));
	});

	ignoredIdentifiers.forEach(function(feature) {
		it('test translation babel-plugin-rewire with ignored identifiers for ' + feature, testTranslation.bind(null, feature, babelTranslationOptionsIgnoredIdentifiers));
	});

	featuresToTest.forEach(function(feature) {
		it('test successful translation babel-plugin-rewire for ' + feature, testSuccessfulTranslation.bind(null, feature, {}));
	});

	stage0FeaturesToTests.forEach(function(feature) {
		var additionalOptions = {
			presets: ['stage-0'],
		};

		it('test successful translation babel-plugin-rewire for ' + feature, testSuccessfulTranslation.bind(null, feature, combineOptions(babelTranslationOptions, additionalOptions)));
		it('test translation babel-plugin-rewire for ' + feature, testSuccessfulTranslation.bind(null, feature, additionalOptions));
	});
});
