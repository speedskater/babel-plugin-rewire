/** @module main */

'use strict';

import {foo} from './dependency';

/** Executes the module. */
export function run() {
	foo('bar');
}
