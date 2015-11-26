var ModuleToRewire = require('./ModuleToRewire.js').default;

module.exports = function(val) {
	return val + ModuleToRewire(val)
};