const React = {createElement: () => { fail() }}
const Component = () => {}

export default function test () {
	<Component />
}
