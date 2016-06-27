import React from 'react';
import ReactDOMServer from 'react-dom/server';

import expect from 'expect.js';

import  {HomePage, __RewireAPI__ as HomePageRewireApi} from './src/HomePage.js';

class PageLoaderMock extends React.Component {
	render() {
		return (<div>loader mock</div>);
	}
}

describe('Page', () => {
	it('displays Loader', () => {
		HomePageRewireApi.__Rewire__('Loader', PageLoaderMock);

		const result = ReactDOMServer.renderToStaticMarkup(<HomePage  />);
		expect(result).to.be('<div><div>loader mock</div></div>');
	});
});