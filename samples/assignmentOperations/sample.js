import {
	assign,
	additionAssignment,
	subtractionAssignment,
	multiplicationAssignment,
	divisionAssignment,
	remainderAssignement,
	leftShiftAssignment,
	rightShiftAssignment,
	unsignedRightShiftAssignment,
	bitwiseAndAssignement,
	bitwiseOrAssignement,
	bitwiseXorAssignment,
	getValue,
	setValue,
	__RewireAPI__ as RewireAPI
} from './src/assignmentOperations.js';
import expect from 'expect.js';


describe('assignment', function() {

	function expectValue(expectedValue) {
		expect(getValue()).to.be(expectedValue);
		expect(RewireAPI.__get__('value')).to.be(expectedValue);
	}

	function reset() {
		RewireAPI.__reset__('value');
	}

	function setOriginalValue(newValue) {
		setValue(newValue);
		expect(getValue()).to.be(newValue);
		expect(RewireAPI.__get__('value')).to.be(newValue);
	}

	function rewireValue(newValue) {
		RewireAPI.__set__('value', newValue);
		expect(getValue()).to.be(newValue);
		expect(RewireAPI.__get__('value')).to.be(newValue);
	}

	it('should be supported as plain assignment', function() {
		setOriginalValue('test');
		assign('newValue');
		expectValue('newValue');

		rewireValue('myTempValue');
		assign('valueOfRewiredValue');
		expectValue('valueOfRewiredValue');

		reset();
		expectValue('newValue');
	});

	it('should be supported as additionAssignment', function() {
		setOriginalValue(5);
		additionAssignment(10);
		expectValue(15);

		rewireValue(7);
		additionAssignment(2);
		expectValue(9);

		reset();
		expectValue(15);
	});

	it('should be supported as subtractionAssignment', function() {
		setOriginalValue(5);
		subtractionAssignment(1);
		expectValue(4);

		rewireValue(100);
		subtractionAssignment(8);
		expectValue(92);

		reset();
		expectValue(4);
	});

	it('should be supported as multiplicationAssignment', function() {
		setOriginalValue(2);
		multiplicationAssignment(4);
		expectValue(8);

		rewireValue(9);
		multiplicationAssignment(7);
		expectValue(63);

		reset();
		expectValue(8);
	});

	it('should be supported as divisionAssignment', function() {
		setOriginalValue(32);
		divisionAssignment(4);
		expectValue(8);

		rewireValue(64);
		divisionAssignment(2);
		expectValue(32);

		reset();
		expectValue(8);
	});

	it('should be supported as remainderAssignement', function() {
		setOriginalValue(71);
		remainderAssignement(8);
		expectValue(7);

		rewireValue(9);
		remainderAssignement(4);
		expectValue(1);

		reset();
		expectValue(7);
	});

	it('should be supported as leftShiftAssignment', function() {
		setOriginalValue(1);
		leftShiftAssignment(3);
		expectValue(8);

		rewireValue(8);
		leftShiftAssignment(3);
		expectValue(64);

		reset();
		expectValue(8);
	});

	it('should be supported as rightShiftAssignment', function() {
		setOriginalValue(64);
		rightShiftAssignment(3);
		expectValue(8);

		rewireValue(8);
		rightShiftAssignment(3);
		expectValue(1);

		reset();
		expectValue(8);
	});

	it('should be supported as bitwiseAndAssignement', function() {
		setOriginalValue(8);
		bitwiseAndAssignement(4);
		expectValue(0);

		rewireValue(12);
		bitwiseAndAssignement(4);
		expectValue(4);

		reset();
		expectValue(0);
	});

	it('should be supported as bitwiseOrAssignement', function() {
		setOriginalValue(8);
		bitwiseOrAssignement(4);
		expectValue(12);

		rewireValue(1);
		bitwiseOrAssignement(2);
		expectValue(3);

		reset();
		expectValue(12);
	});
});