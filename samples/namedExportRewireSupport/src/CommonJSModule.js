var ModuleToRewire = require('./ModuleToRewire.js');

module.exports = function(val) {
	return val + ModuleToRewire(val)
};