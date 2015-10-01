import { SUCCESS, FAILURE } from './mod2';
export const STATUS = 'OK';
export function fun3(signal) {
	switch (signal) {
		case SUCCESS:
			return 'positive';
		case FAILURE:
			return 'negative';
		default:
			return 'uups';
	}
}
