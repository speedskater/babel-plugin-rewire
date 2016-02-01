import { preIncrement, postIncrement, preDecrement, postDecrement, __ModuleAPI__ as ModuleAPI } from './src/updateOperations.js';
import expect from 'expect.js';

describe('rewired update ', () => {

	it('should support pre increment', () =>{
		expect(preIncrement()).to.equal(2);
		expect(preIncrement()).to.equal(3);
		expect(preIncrement()).to.equal(4);

		ModuleAPI.__set__('preIncrementValue', 10);
		expect(preIncrement()).to.equal(11);
		expect(preIncrement()).to.equal(12);
		expect(preIncrement()).to.equal(13);

		ModuleAPI.__reset__('preIncrementValue');

		expect(preIncrement()).to.equal(5);
	});

	it('should support post incrment', () =>{
		expect(postIncrement()).to.equal(1);
		expect(postIncrement()).to.equal(2);
		expect(postIncrement()).to.equal(3);

		ModuleAPI.__set__('postIncrementValue', 10);
		expect(postIncrement()).to.equal(10);
		expect(postIncrement()).to.equal(11);
		expect(postIncrement()).to.equal(12);

		ModuleAPI.__reset__('postIncrementValue');

		expect(postIncrement()).to.equal(4);
	});
	
	it('should support pre decrement', () => {
		expect(preDecrement()).to.equal(-1);
		expect(preDecrement()).to.equal(-2);
		expect(preDecrement()).to.equal(-3);

		ModuleAPI.__set__('preDecrementValue', 10);
		expect(preDecrement()).to.equal(9);
		expect(preDecrement()).to.equal(8);
		expect(preDecrement()).to.equal(7);

		ModuleAPI.__reset__('preDecrementValue');

		expect(preDecrement()).to.equal(-4);
	});

	it('should support post decrement', () => {
		expect(postDecrement()).to.equal(0);
		expect(postDecrement()).to.equal(-1);
		expect(postDecrement()).to.equal(-2);

		ModuleAPI.__set__('postDecrementValue', 10);
		expect(postDecrement()).to.equal(10);
		expect(postDecrement()).to.equal(9);
		expect(postDecrement()).to.equal(8);

		ModuleAPI.__reset__('postDecrementValue');

		expect(postDecrement()).to.equal(-3);
	});
});
