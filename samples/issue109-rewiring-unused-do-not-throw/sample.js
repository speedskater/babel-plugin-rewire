import { __RewireAPI__ } from './src/main';
import expect from 'expect.js';

describe('rewiring an unused thing', () => {
  it('should not throw', () =>{
    expect(() => {
      __RewireAPI__.__Rewire__('x', 'ok sure');
    }).to.not.throwException();
  });
});
