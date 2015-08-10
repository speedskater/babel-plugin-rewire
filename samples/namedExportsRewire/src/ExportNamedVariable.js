export let namedVariable = function( val ) {
	return val + 1;
}, namedVariable2 = function(val) {
	return val + 2;
};

export default function( val ) {
	return namedVariable( val ) + namedVariable2(val);
}
