import React from 'react'
import ChildComponent from './ChildComponent'
import { x as AnotherChildComponent } from './ChildComponent'
import * as AnotherChildComponents from './ChildComponent'

export default class Foo extends React.Component {
	render() {
		return (
			<div className="content">
				<ChildComponent />
				<AnotherChildComponent />
				<AnotherChildComponents />
			</div>
		)
	}
}
