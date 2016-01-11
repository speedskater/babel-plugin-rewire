let base = require('./src/base');
let expect = require('expect.js').expect;

describe('Should enable rewiring a passed through module', function() {
  it('should not throw', function() {
    delete require.cache[require.resolve('./src/base')];
    var passThrough = require('./src/passThrough');

    expect(base.get('foo')).to.be('bar');
    passThrough.__set__('foo', 'baz');
    expect(base.get('foo')).to.be('baz');
  });
});
