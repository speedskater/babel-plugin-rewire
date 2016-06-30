import test from './src/ModuleToTest';
import expect from 'expect.js';
import sinon from 'sinon'

describe('JSX support', () => {
  afterEach(() => {
    test.__ResetDependency__('shouldFail')
  })

  it('allows to override React', () =>{
    test.__Rewire__('React', {createElement: () => {}});
    expect(test).to.not.throwException(ReferenceError);
  });

  it('allows to override a component', () =>{
    const createElement = sinon.spy();
    test.__Rewire__('React', {createElement});
    test.__Rewire__('Component', 'component class');
    expect(createElement.calledWith('component class')).to.be(true);
  });
});
