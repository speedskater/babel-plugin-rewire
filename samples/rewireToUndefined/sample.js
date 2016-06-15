import {test, __Rewire__, __ResetDependency__} from './src/ModuleToTest';
import expect from 'expect.js';

describe('an ability to override a dependency to undefined', () => {
  afterEach(() => {
    __ResetDependency__('shouldNotFail')
  })

  it('allows to override a dependency to a number', () =>{
    __Rewire__('shouldNotFail', 123)
    expect(test).to.throwException(TypeError)
  });

  it('allows to override a dependency to undefined', () =>{
    __Rewire__('shouldNotFail', undefined)
    expect(test).to.throwException(TypeError)
  });
});
