import React from 'react';

export default class Card {
	constructor(props) {
		this.props = props;
	}

	render() {
		return <div {...props}></div>;
	}
}
