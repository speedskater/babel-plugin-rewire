var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var expect = require('expect.js');
var hook = require('node-hook');
var babelPluginRewire = require('../lib/babel-plugin-rewire.js'); // */ require('../test-helpers/getBabelPluginRewire.js');
require('core-js');

function isSampleCode(filename) {
	var samplesPath = path.resolve(path.join(__dirname, '../samples/'));
	return (filename.substr(0, samplesPath.length) === samplesPath);
}

var configurations = {
	transformSampleCodeToTestWithBabelPluginRewireAndTransformRegenerator: {
		transformOptions: {
			"presets": ["es2015", "react" ], //,
			"plugins": [
				"transform-flow-strip-types",
				babelPluginRewire,
				"syntax-async-functions",
				"transform-es2015-template-literals",
				"transform-es2015-block-scoping",
				"transform-es2015-typeof-symbol",
				"transform-export-extensions",
				"transform-regenerator"
			]
		},
		samples: [
			'issue16',
			'issue18',
			'issue19',
			'issue20',
			'issue22',
			'issue28',
			'issue29',
			'issue30',
			'issue33',
			'issue48',
			'issue59',
			'issue71-tdz',
			//uncomment as we are currently not able to support this. As this as soon as we are able to support wildcard rexecport: require('../samples/issue78/sample.js');
			//require('../samples/issue82/sample.js');
			'issue121',
			'functionRewireScope',
			'namedExportsRewire',
			'namedExportRewireSupport',
			'namedExportsWithNameClash',
			'nestedScopes',
			'objectLiteralNameClash',
			'passThrough',
			'defaultExportNonExtensible',
			'typedExport',
			'nonEnumerableProperties',
			'redefinedRewireProperties',
			'defaultExportImport',
			'redux-issue',
			'withSupport',
			'rewireClasses',
			'rewireParentChild',
			'objectAssign',
			'updateOperations',
			'wildcardExport',
			'namedWildcardExport',
			'assignmentOperations',
			'jsx-switch',
			'jsx-stateless-multilevel',
			'rewireToUndefined',
			'issue115-should-js',
			'issue140-chai-should',
			'issue130-jsx-es6-type-imports',
			'issue133',
			'issue136',
			'jsxSupport',
			'issue152-1',
			'issue155',
			'issue146-revert-function-for-set',
			'issue163',
			'issue165',
			'issue109'
		]
	},
	transformSampleCodeToTestWithBabelPluginRewireAndTransformAsyncToGenerator: {
		transformOptions: {
			"presets": ["es2015", "react"], //,
			"plugins": [
				babelPluginRewire,
				"syntax-async-functions",
				"transform-es2015-template-literals",
				"transform-es2015-block-scoping",
				"transform-es2015-typeof-symbol",
				"transform-export-extensions",
				"babel-plugin-transform-async-to-generator"
			]
		},
		samples: [
			'issue152-2'
		]
	},
	transformSampleCodeToTestWithBabelPluginRewireAndFlow: {
		transformOptions: {
			"presets": ["es2015", "react"], //,
			"plugins": [
				babelPluginRewire,
				"transform-object-rest-spread",
				"transform-flow-strip-types",
				"syntax-async-functions",
				"transform-es2015-template-literals",
				"transform-es2015-block-scoping",
				"transform-es2015-typeof-symbol",
				"transform-export-extensions",
				"transform-regenerator"
			]
		},
		samples: [
			'issue151-flow'
		]
	},
	transformSampleCodeToTestWithBabelPluginRewireAndObjectRestProperty: {
		transformOptions: {
			"presets": ["es2015"],
			"plugins": [
				babelPluginRewire,
				"transform-object-rest-spread"
			]
		},
		samples: [
			"objectRestProperty"
		]
	}
};


Object.keys(configurations).forEach(function(configurationName) {
	describe(configurationName, function() {
		var configuration = configurations[configurationName];
		var transformOptions = configuration.transformOptions;

		function transformFunction(source, filename) {
			/*if(isSampleCode(filename)) {
			 console.log("=========== " + filename + "============");
			 var code = babel.transform(source, transformOptions).code;
			 console.log(code);
			 return code;
			 }*/

			return isSampleCode(filename) ? babel.transform(source, transformOptions).code : source;
		}

		hook.hook('.js', transformFunction);
		configuration.samples.forEach(function (sampleName) {
			require('../samples/' + sampleName + '/sample.js');
		});
		hook.unhook('.js'); // removes your own transform
	});
});
