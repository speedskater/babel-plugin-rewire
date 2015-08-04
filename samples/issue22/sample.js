'use strict'

import SimpleObject from './src/SimpleObject';
import ModuleExports from './src/ModuleExports';
import expect from 'expect.js';

describe('Function keys', function(){

  it('should not be leaked with default export', function(){
    let keys = Object.keys(SimpleObject);
    expect(keys).to.eql(['foo', 'bar']);
    expect(typeof (SimpleObject.__Rewire__)).to.be('function');
  });

  it('should not be leaked with module.exports', function(){
    let keys = Object.keys(ModuleExports);
    expect(keys).to.eql(['foo', 'bar']);
    expect(typeof (ModuleExports.__Rewire__)).to.be('function');
  });
});
