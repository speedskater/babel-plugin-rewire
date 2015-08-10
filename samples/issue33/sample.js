import Functions from './src/Functions.js';
import expect from 'expect.js';

describe('Test for issue 33', function() {
  it('should be able to rewire function declarations', function() {
    expect(Functions.testMyFunc()).to.equal(2);

    Functions.__set__('myFunc', function() {
      return 3;
    });

    expect(Functions.testMyFunc()).to.equal(3);
  });

  it('should be able to rewire function expressions', function() {
    expect(Functions.testSecondFunc()).to.equal(2);

    Functions.__set__('mySecondFunc', function() {
      return 3;
    });

    expect(Functions.testSecondFunc()).to.equal(3);

		Functions.__ResetDependency__('mySecondFunc');

		expect(Functions.testSecondFunc()).to.equal(2);
  });
});
