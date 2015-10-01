import { SUCCESS, FAILURE } from './mod2';
import { fun3 } from './mod3';
export function start() {
	return {
		success: fun3(SUCCESS),
		failure: fun3(FAILURE)
	}
}
