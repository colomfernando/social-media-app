/**
 * It takes a function that returns a promise, and returns a function that returns an array of two
 * elements, the first being the resolved value of the promise, and the second being the error
 * @param fn - The function that you want to wrap.
 * @returns An array with two elements. The first element is the result of the async function, and the
 * second element is the error.
 */
const asyncWrapper = async (fn) => {
	try {
		const res = await fn();
		return [res, null];
	} catch (error) {
		return [null, error];
	}
};

module.exports = asyncWrapper;
