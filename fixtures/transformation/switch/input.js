import React from 'react'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ComponentC from './ComponentC'
import DefaultComponent from './DefaultComponent'

export default class Foo extends React.Component {
	render() {
		return (
			<div>
				{['a', 'b', 'c'].map(this.renderChild)}
			</div>
		)
	}

	renderChild(type) {
		switch (type) {
			case 'a':
				return (
					<ComponentA />
				)
			case 'b':
				return (
					<ComponentB />
				)
			case 'c':
				return (
					<ComponentC />
				)
			default:
				return (
					<DefaultComponent />
				)
		}
	}
}
