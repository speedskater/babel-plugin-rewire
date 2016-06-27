
describe('issue115-should-js', function() {
	it('should js should be supported', function() {
		let should = require('should');
		should.exist(true);
		delete Object.prototype.should;
	});
});