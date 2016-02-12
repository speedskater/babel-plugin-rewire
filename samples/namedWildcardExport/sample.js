import * as namedWildcardImport from './src/namedWildcardExport';
import {test1, test2} from './src/namedExports';
import expect from 'expect.js';

describe('named wildcard export of imported object', () => {
  it('has objects exported from namedExports', () => {
    expect(namedWildcardImport.namedWildcardExport.test1).to.equal(test1);
    expect(namedWildcardImport.namedWildcardExport.test2).to.equal(test2);
  });
});
