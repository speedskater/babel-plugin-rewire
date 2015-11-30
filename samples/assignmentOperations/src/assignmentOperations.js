let value='initial';

export function getValue() {
	return value;
}

export function setValue(newValue) {
	value = newValue;
}

export function assign(newValue) {
	return value = newValue;
}

export function additionAssignment(addition) {
	return value += addition;
}

export function subtractionAssignment(valueToSubtract) {
	return value -= valueToSubtract;
}

export function multiplicationAssignment(valueToMultiply) {
	return value *= valueToMultiply;
}

export function divisionAssignment(valueToDivideWith) {
	return value /= valueToDivideWith;
}

export function remainderAssignement(valueToCalculcateModulWith) {
	return value %= valueToCalculcateModulWith;
}

export function leftShiftAssignment(amountToShift) {
	return value <<= amountToShift;
}

export function rightShiftAssignment(amountToShift) {
	return value >>= amountToShift;
}

export function unsignedRightShiftAssignment(amountToShift) {
	return value >>>= amountToShift;
}

export function bitwiseAndAssignement(operand) {
	return value &= operand;
}

export function bitwiseOrAssignement(operand) {
	return value |= operand;
}

export function bitwiseXorAssignment(operand) {
	return value ^= operand;
}