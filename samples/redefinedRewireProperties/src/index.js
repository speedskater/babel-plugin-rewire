import MyClass from './MyClass.js';

let test = 'Local Property to rewire';

export function localFunction() {
	return test + ":: index.js";
}

MyClass.foo = 'bar';

export default MyClass;
