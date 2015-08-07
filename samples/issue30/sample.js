var Normaliser = require('./src/Normaliser.js');

import expect from 'expect.js';

describe('Test for issue 30', function() {

	it('normalize rewire', function() {
		var Path = {
			normalise: (name) => name
		};

		Normaliser.__Rewire__('Path', Path);

		expect(Normaliser('test')).to.equal('test production');

		Normaliser.__Rewire__('env', 'testing');

		expect(Normaliser('test')).to.equal('test testing');

		Normaliser.__ResetDependency__('env');

		expect(Normaliser('test')).to.equal('test production');

		Normaliser.__ResetDependency__('Path');
	});

});


