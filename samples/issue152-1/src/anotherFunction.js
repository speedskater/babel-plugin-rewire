let called = false;

export default function something() {
	called = true;
}

export function wasCalled() {
	return called;
}