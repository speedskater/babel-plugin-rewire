function promiseFunction() {
	return Promise.resolve(2);
};

export default async function asyncFunctionDefault() {
	return await promiseFunction();
};

export async function asyncFunction() {
	return await promiseFunction();
};


