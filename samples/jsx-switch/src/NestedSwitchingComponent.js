import React from 'react'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ComponentC from './ComponentC'
import DefaultComponent from './DefaultComponent'

export default class NestedSwitchingComponent extends React.Component {
	render() {
		return (
			<div>
				{ this.renderChild('a', 'b') }
			</div>
		)
	}

	renderChild(type1, type2) {
		switch (type1) {
			case 'a':
				switch(type2) {
					case 'b':
						return (<div>
							<ComponentA key='a' />
							<ComponentB key='b' />
						</div>);
					case 'c':
						return (<div>
							<ComponentA key='a' />
							<ComponentB key='c' />
						</div>);
				}
			case 'b':
				switch(type2) {
					case 'a':
						return (<div>
							<ComponentB key='b' />
							<ComponentA key='a' />
						</div>);
					case 'c':
						return (<div>
							<ComponentB key='b' />
							<ComponentC key='c' />
						</div>);
				}
			case 'c':
				switch(type2) {
					case 'a':
						return (<div>
							<ComponentC key='c' />
							<ComponentA key='a' />
						</div>);
					case 'b':
						return (<div>
							<ComponentB key='c' />
							<ComponentC key='b' />
						</div>);
				}
			default:
				return (
					<DefaultComponent key='default'/>
				)
		}
	}
}
