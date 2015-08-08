import Functions from './src/Functions.js';
import expect from 'expect.js';

describe('Test for issue 33', function() {
  it('should be able to rewire functions', function() {
    expect(Functions.testFunc()).to.equal(2);

    Functions.__set__(myFunc, function() {
      return 3;
    });

    expect(Functions.testFunc()).to.equal(3);
  });
});
