'use strict';

import {store, __RewireAPI__ as DefaultExportStoreRewireApi} from './src/redux';

import expect from 'expect.js';

describe('Redux tests', function(){

	it ('Store is available for redux with babel-rewire', function() {
		expect(store).to.not.be.undefined;
		expect( DefaultExportStoreRewireApi.__Rewire__ ).to.be.a('function');
		expect( DefaultExportStoreRewireApi.__ResetDependency__ ).to.be.a('function');
		expect( DefaultExportStoreRewireApi.__GetDependency__ ).to.be.a('function');
		expect( DefaultExportStoreRewireApi.__set__ ).to.be.a('function');
		expect( DefaultExportStoreRewireApi.__get__ ).to.be.a('function');
	});
});
