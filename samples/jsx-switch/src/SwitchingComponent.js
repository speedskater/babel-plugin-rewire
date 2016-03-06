import React from 'react'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ComponentC from './ComponentC'
import DefaultComponent from './DefaultComponent'

export default class SwitchingComponent extends React.Component {
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
					<ComponentA key='a'/>
				)
			case 'b':
				return (
					<ComponentB key='b'/>
				)
			case 'c':
				return (
					<ComponentC key='c'/>
				)
			default:
				return (
					<DefaultComponent key='default'/>
				)
		}
	}
}
