const test=0;

export default function getTestValue() {
	return addOne(test);

	function addOne(value) {
		return value + 1;
	}
}
