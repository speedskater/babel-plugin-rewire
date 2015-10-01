let test = 'Local Property to rewire in MyClass';

export function localFunction() {
	return test + ":: MyClass.js";
}

export default class MyClass {
}
