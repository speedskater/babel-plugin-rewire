import Path from 'path';

var env = 'production';

module.exports = function(name) {
	return Path.normalise(name) + ' ' + env;
}
