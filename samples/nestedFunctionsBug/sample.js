import test from './src/ModuleToTest';
import expect from 'expect.js';

describe('nested functions bug', () => {
  it('has rewire API', () =>{
    expect(typeof test.__Rewire__).to.be('function');
  });
});
