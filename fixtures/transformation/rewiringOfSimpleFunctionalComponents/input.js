import React from 'react'
import MessageList from './ChildComponent.js'

function MySpecialComponentIWantToRewire() {
	return <div>Output</div>;
}

function ComponentToRewirePerElement({ element, children }) {
	return <div key={element.get('id')}>{children}</div>;
}

export let rewireInlineComponent = () => <MySpecialComponentIWantToRewire />;

export let rewireWitMap = () => {
	return (<div>
		{ array.map((element) => (
			<ComponentToRewirePerElement element={element}>
				{element.get('text')}
			</ComponentToRewirePerElement>
		)) }
	</div>);
};

export function another() { return <MessageList/> };

export let arrowWithReturn = () => {
	return <MessageList/>;
};

export default () => <MessageList/>;

