import type Bla from './ExportType.js';

let target = 'World';

let message = {
	hello: function() {
		return 'Hello ' + target  + '!';
	}
};

export default message;
