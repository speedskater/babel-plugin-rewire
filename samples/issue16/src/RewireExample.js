import { Database } from './Database.js';

export default class RewireExample {
	constructor(){
		this.database = new Database();
	}

	outputDatabaseInfo() {
		return this.database.info;
	}
}
