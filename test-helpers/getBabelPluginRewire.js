var babel = require('babel-core');
var path = require('path');
var hook = require('node-hook');
var plugin = null;
var pluginPath = path.resolve(__dirname, '../src/babel-plugin-rewire.js');
var babelTransformationOptions = {
	"presets": ["es2015"],
	retainLines: true
};

function isPluginCode(filename) {
	var pluginSrcPath = path.resolve(path.join(__dirname, '../src/'));
	return (filename.substr(0, pluginSrcPath.length) === pluginSrcPath);
}

hook.hook('.js', function(source, filename) {
	return isPluginCode(filename) ? babel.transform(source, babelTransformationOptions).code : source;
});
module.exports = require(pluginPath);
hook.unhook('.js'); // removes babel hook