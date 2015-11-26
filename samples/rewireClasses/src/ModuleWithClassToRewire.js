class A {
	callMe() {
		return 5;
	}
}

export function returnTheResultOfCallMe() {
	return new A().callMe();
}