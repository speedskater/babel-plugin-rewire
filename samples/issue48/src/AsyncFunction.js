export default async function asyncFunctionDefault() {
	return await promiseFunction();
};

export async function asyncFunction() {
	return await promiseFunction();
};

function promiseFunction() {
  return Promise.resolve(2);
};
