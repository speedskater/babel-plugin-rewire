import React from 'react';

import Loader from './Loader'; // test fails when the Loader is imported
// test passes when the Loader is required
// let Loader = require('components/Loader');

class HomePage extends React.Component {
	render() {
		return (<div><Loader /></div>);
	}
}

export {
	HomePage
};