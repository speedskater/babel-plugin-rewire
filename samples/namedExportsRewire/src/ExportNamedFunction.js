export function namedFunction( val ) {
	return val + 1;
}

export default function( val ) {
	return namedFunction( val );
}