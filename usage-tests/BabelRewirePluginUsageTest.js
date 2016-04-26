var babel = require('babel-core');
var path = require('path');
var fs = require('fs');
var expect = require('expect.js');
var hook = require('node-hook');
var babelPluginRewire = require('../lib/babel-plugin-rewire.js'); // */require('../test-helpers/getBabelPluginRewire.js');
require('core-js');

function isSampleCode(filename) {
	var samplesPath = path.resolve(path.join(__dirname, '../samples/'));
	return (filename.substr(0, samplesPath.length) === samplesPath);
}


function transformSampleCodeToTestWithBabelPluginRewire(source, filename) {
	var babelTransformationOptions = {
		"presets": ["es2015", "react"], //,
		"plugins": [
			babelPluginRewire,
			"syntax-async-functions",
			"transform-es2015-template-literals",
			"transform-es2015-block-scoping",
			"transform-es2015-typeof-symbol",
			"transform-export-extensions",
			"transform-regenerator"
		]
	};

	/*if(isSampleCode(filename)) {
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
require('../samples/issue59/sample.js');
require('../samples/issue71-tdz/sample.js');
//uncomment as we are currently not able to support this. As this as soon as we are able to support wildcard rexecport: require('../samples/issue78/sample.js');
require('../samples/issue82/sample.js');
require('../samples/issue121/sample.js');
require('../samples/functionRewireScope/sample.js');
require('../samples/namedExportsRewire/sample.js');
require('../samples/namedExportRewireSupport/sample.js');
require('../samples/namedExportsWithNameClash/sample.js');
require('../samples/nestedScopes/sample.js');
require('../samples/objectLiteralNameClash/sample.js');
require('../samples/passThrough/sample.js');
require('../samples/defaultExportNonExtensible/sample.js');
require('../samples/typedExport/sample.js');
require('../samples/nonEnumerableProperties/sample.js');
require('../samples/redefinedRewireProperties/sample.js');
require('../samples/defaultExportImport/sample.js');
require('../samples/redux-issue/sample.js');
require('../samples/withSupport/sample.js');
require('../samples/rewireClasses/sample.js');
require('../samples/objectAssign/sample.js');
require('../samples/updateOperations/sample.js');
require('../samples/wildcardExport/sample.js');
require('../samples/namedWildcardExport/sample.js');
require('../samples/assignmentOperations/sample.js');
require('../samples/jsx-switch/sample.js');
require('../samples/jsx-stateless-multilevel/sample.js');
hook.unhook('.js'); // removes your own transform
