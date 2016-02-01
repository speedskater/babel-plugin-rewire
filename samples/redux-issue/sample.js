'use strict';

import {store, __ModuleAPI__ as DefaultExportStoreModuleAPI} from './src/redux';

import expect from 'expect.js';

describe('Redux tests', function(){

	it ('Store is available for redux with babel-rewire', function() {
		expect(store).to.not.be.undefined;
		expect( DefaultExportStoreModuleAPI.__Rewire__ ).to.be.a('function');
		expect( DefaultExportStoreModuleAPI.__ResetDependency__ ).to.be.a('function');
		expect( DefaultExportStoreModuleAPI.__GetDependency__ ).to.be.a('function');
		expect( DefaultExportStoreModuleAPI.__set__ ).to.be.a('function');
		expect( DefaultExportStoreModuleAPI.__get__ ).to.be.a('function');
	});
});
