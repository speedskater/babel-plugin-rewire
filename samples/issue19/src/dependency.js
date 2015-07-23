/** @module dependency */

'use strict';

/** Does some stuff. */
export function baz(qux) {
	return qux.toLowerCase();
}

/** Does other stuff. */
export function foo(bar) {
	return bar.toUpperCase();
}
