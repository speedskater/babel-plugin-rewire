'use strict'

import SimpleObject from './src/SimpleObject';
import expect from 'expect.js';

describe('Function keys', function(){

  it('should not be leaked', function(){
    let keys = Object.keys(SimpleObject);
    expect(keys).to.eql(['foo', 'bar']);
  });
});