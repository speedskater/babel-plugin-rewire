import { preIncrement, postIncrement, preDecrement, postDecrement, __RewireAPI__ as RewireAPI } from './src/updateOperations.js';
import expect from 'expect.js';

describe('rewired update ', () => {

	it('should support pre increment', () =>{
		expect(preIncrement()).to.equal(2);
		expect(preIncrement()).to.equal(3);
		expect(preIncrement()).to.equal(4);

		RewireAPI.__set__('preIncrementValue', 10);
		expect(preIncrement()).to.equal(11);
		expect(preIncrement()).to.equal(12);
		expect(preIncrement()).to.equal(13);

		RewireAPI.__reset__('preIncrementValue');

		expect(preIncrement()).to.equal(5);
	});

	it('should support post incrment', () =>{
		expect(postIncrement()).to.equal(1);
		expect(postIncrement()).to.equal(2);
		expect(postIncrement()).to.equal(3);

		RewireAPI.__set__('postIncrementValue', 10);
		expect(postIncrement()).to.equal(10);
		expect(postIncrement()).to.equal(11);
		expect(postIncrement()).to.equal(12);

		RewireAPI.__reset__('postIncrementValue');

		expect(postIncrement()).to.equal(4);
	});
	
	it('should support pre decrement', () => {
		expect(preDecrement()).to.equal(-1);
		expect(preDecrement()).to.equal(-2);
		expect(preDecrement()).to.equal(-3);

		RewireAPI.__set__('preDecrementValue', 10);
		expect(preDecrement()).to.equal(9);
		expect(preDecrement()).to.equal(8);
		expect(preDecrement()).to.equal(7);

		RewireAPI.__reset__('preDecrementValue');

		expect(preDecrement()).to.equal(-4);
	});

	it('should support post decrement', () => {
		expect(postDecrement()).to.equal(0);
		expect(postDecrement()).to.equal(-1);
		expect(postDecrement()).to.equal(-2);

		RewireAPI.__set__('postDecrementValue', 10);
		expect(postDecrement()).to.equal(10);
		expect(postDecrement()).to.equal(9);
		expect(postDecrement()).to.equal(8);

		RewireAPI.__reset__('postDecrementValue');

		expect(postDecrement()).to.equal(-3);
	});
});
