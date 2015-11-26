export function wasProcessed(path) {
	return path.node.__noRewire === true;
}

export function noRewire(identifier) {
	identifier.__noRewire = true;
	return identifier;
}