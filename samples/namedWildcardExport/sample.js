import * as wildcardImport from './src/wildcardExport';
import {test1, test2} from './src/namedExports';
import expect from 'expect.js';

describe('wildcard export of imported object', () => {
  it('has objects exported from namedExports', () => {
    expect(wildcardImport.test1).to.equal(test1);
    expect(wildcardImport.test2).to.equal(test2);
  });
});
