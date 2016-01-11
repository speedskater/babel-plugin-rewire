import React from 'react';

import ReactDOMServer from 'react-dom/server'
import ComponentToTest from './src/ComponentToTest.js';
import DefaultExportSimpleFunctionalComponent from './src/DefaultExportSimpleFunctionalComponent.js';
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect.js';

describe('issue82', function() {

	it('Should be able to rewire React components.', function() {
		ComponentToTest.__set__('ChildComponent', function RewiredChildComponent(props) {
			return (<span>Hello from Rewired Component</span>);
		});

		var result = ReactDOMServer.renderToStaticMarkup(<ComponentToTest />);

		expect(result).to.be('<div class="content"><span>Hello from Rewired Component</span></div>');
	});

	it('Should be able to rewire Simple Functional Components.', function() {
		DefaultExportSimpleFunctionalComponent.__set__('MessageList', () => <div>DIV Test</div>);

		var result = ReactDOMServer.renderToStaticMarkup(<DefaultExportSimpleFunctionalComponent />);

		expect(result).to.be('<div>DIV Test</div>');
	});
});
