import React from 'react';

import ReactDom from 'react-dom'
import ComponentToTest from './src/ComponentToTest.js';
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect.js';
import jsdom from 'jsdom';

describe('issue82', function() {

	beforeEach(function() {
		global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
		global.window = document.parentWindow;
	});

	afterEach(function() {
		delete global.window;
		delete global.document;
	});

	it('Should be able to rewire React components.', function() {
		ComponentToTest.__set__('ChildComponent', function RewiredChildComponent(props) {
			return (<span>Hello from Rewired Component</span>);
		})



		var componenToTest = TestUtils.renderIntoDocument(<ComponentToTest />);
		var child = TestUtils.findRenderedDOMComponentWithClass(componenToTest, 'content');

		expect(child.textContent).to.be('Hello from Rewired Component');
	});
});
