import Frozen from './src/Frozen';
import NonExtensible from './src/NonExtensible';
import Sealed from './src/Sealed';

import expect from 'expect.js';

/**
 * If the Object.isExtensible() functionality didn't work,
 * importing these would throw an error at runtime.
 */
import BooleanPrimitive from './src/Boolean';
import Null from './src/Null';
import NumberPrimitive from './src/Number';
import StringPrimitive from './src/String';
import Undefined from './src/Undefined';

describe('Non-extensible default exports', () => {
	it('Frozen values are not rewired', () => {
		expect(Object.isFrozen(Frozen)).to.be(true);
		expect(Object.isExtensible(Frozen)).to.be(false);
		expect(Frozen.__Rewire__).to.be(undefined);
	});

	it('NonExtensible values are not rewired', () => {
		expect(Object.isExtensible(NonExtensible)).to.be(false);
		expect(NonExtensible.__Rewire__).to.be(undefined);
	});

	it('Sealed values are not rewired', () => {
		expect(Object.isSealed(Sealed)).to.be(true);
		expect(Object.isExtensible(Sealed)).to.be(false);
		expect(Sealed.__Rewire__).to.be(undefined);
	});
});
