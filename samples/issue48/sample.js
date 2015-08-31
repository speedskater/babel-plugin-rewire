import { default as asyncFunctionDefault, asyncFunction,  __RewireAPI__ as AsyncFunctionRewireAPI  } from './src/AsyncFunction.js';
import expect from 'expect.js';

describe('Test for issue 48', function() {
  it('should be able to rewire default async function', function() {
    return asyncFunctionDefault().then(response => {
      expect(response).to.equal(2);

      AsyncFunctionRewireAPI.__set__('promiseFunction', function() {
        return Promise.resolve(3);
      });

      return asyncFunctionDefault().then(response => {
        expect(response).to.equal(3);
        AsyncFunctionRewireAPI.__ResetDependency__('promiseFunction');
      });
    });
  });

  it('should be able to rewire non default async function', function() {
    return asyncFunction().then(response => {
      expect(response).to.equal(2);

      AsyncFunctionRewireAPI.__set__('promiseFunction', function() {
        return Promise.resolve(3);
      });

      return asyncFunction().then(response => {
        expect(response).to.equal(3);
        AsyncFunctionRewireAPI.__ResetDependency__('promiseFunction');
      });
    });
  });
});
