import React from 'react';
import ReactDOMServer from 'react-dom/server'

import { default as SwitchingComponent, __RewireAPI__ as SwitchingComponentModule } from './src/SwitchingComponent.js';
import { default as NestedSwitchingComponent, __RewireAPI__ as NestedSwitchingComponentModule } from './src/NestedSwitchingComponent.js';

import expect from 'expect.js';

describe('SwitchingComponent', () => {
	it('should render the correct markup', () => {
		var result = ReactDOMServer.renderToStaticMarkup(<SwitchingComponent />);

		expect(result).to.be('<div><div>ComponentA</div><div>ComponentB</div><div>ComponentC</div></div>');
	});

	it('should render the expected rewired markup', () => {
		SwitchingComponentModule.__set__('ComponentB', function() {
			return (<div>Instead of ComponentB</div>);
		});

		var result = ReactDOMServer.renderToStaticMarkup(<SwitchingComponent />);
		expect(result).to.be('<div><div>ComponentA</div><div>Instead of ComponentB</div><div>ComponentC</div></div>');
	});
});

describe('NestedSwitchingComponent', () => {
	it('should render the correct markup', () => {
		var result = ReactDOMServer.renderToStaticMarkup(<NestedSwitchingComponent />);

		expect(result).to.be('<div><div><div>ComponentA</div><div>ComponentB</div></div></div>');
	});

	it('should render the expected rewired markup', () => {
		NestedSwitchingComponent.__set__('ComponentB', function() {
			return (<div>Instead of ComponentB</div>);
		});

		var result = ReactDOMServer.renderToStaticMarkup(<NestedSwitchingComponent />);
		expect(result).to.be('<div><div><div>ComponentA</div><div>Instead of ComponentB</div></div></div>');
	});
});
