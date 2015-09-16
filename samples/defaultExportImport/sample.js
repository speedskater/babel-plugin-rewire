import DefaultExportImport from './src/defaultExportImport.js';
import ModuleToExport from './src/moduleToExport.js';

import expect from 'expect.js';

describe('default export of imported default', function() {
    it('works with the original module', function() {
        const view  = new ModuleToExport();
        expect(view.render()).to.be('Hello');
    });

    it('has the functionality of the original module', function() {
        const view = new DefaultExportImport();
        expect(view.render()).to.be('Hello');
    });
});