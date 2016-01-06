import React from 'react'
import ChildComponent from './ChildComponent'

export default class Foo extends React.Component {
	render() {
		return (
			<div className='content'>
				<ChildComponent />
			</div>
		)
	}
}
