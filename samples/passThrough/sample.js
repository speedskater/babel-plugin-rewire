let base = require('./src/base');
let expect = require('expect.js');

describe('Should enable rewiring a passed through module', function() {
  it('should not throw', function() {
    var passThrough = require('./src/passThrough');
    expect(passThrough.get('foo')).to.be('bar');
    passThrough.__set__('foo', 'baz');
    expect(passThrough.get('foo')).to.be('baz');
  });
});
