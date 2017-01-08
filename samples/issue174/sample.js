import * as test from './src/ModuleToTest';
import expect from 'expect.js';
import sinon from 'sinon'

describe('Sinon stub support', () => {
  it('doesnt break sinon stubs', () => {
    expect('Hello').to.equal(test.sayHello());

    let stub = sinon.stub(test, 'sayHello', () => { return "Goodbye" });
    expect('Goodbye').to.equal(test.sayHello());

    stub.restore();
    expect('Hello').to.equal(test.sayHello());
  });
});