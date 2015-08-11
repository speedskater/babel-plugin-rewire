export let namedVariable = function( val ) {
	return val + 1;
}, namedVariable2 = function(val) {
	return val + 2;
};

export default function( val ) {
	return namedVariable( val ) + namedVariable2(val);
}

export let namedPrimitiveNumber = 4;
export let namedPrimitiveBoolean = false;
export let namedPrimitiveString = 'teststring';
