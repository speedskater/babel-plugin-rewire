import chai from 'chai';

const should = chai.should();

describe('issue140-chai-should', function() {
	it('should be supported', function() {
		should.exist({});
	});
});