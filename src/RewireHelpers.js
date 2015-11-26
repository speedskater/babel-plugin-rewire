export function wasProcessed(path) {
	return path.node.__noRewire === true;
}

export function noRewire(identifier) {
	identifier.__noRewire = true;
	return identifier;
}

export function contains(array, needle) {
	let contains = false;
	for(var i=0; i < array.length; ++i) {
		contains = contains || array[i] == needle;
	}
	return contains;
}