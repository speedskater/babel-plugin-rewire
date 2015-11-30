let preIncrementValue = 1;
let postIncrementValue = 1;
let preDecrementValue = 0;
let postDecrementValue = 0;

export function preIncrement() {
	return ++preIncrementValue;
}

export function postIncrement() {
	return postIncrementValue++;
}

export function preDecrement() {
	return --preDecrementValue;
}

export function postDecrement() {
	return postDecrementValue--;
}
