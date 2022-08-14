type response<T> = T | null;
type error = unknown | null | Error;

/**
 * @module utils/api/utils
 * @function asyncWrapper
 * @async
 * @param {Promise} fn
 * @return {Promise}
 */
const asyncWrapper = async <T>(
  fn: () => Promise<T>
): Promise<[error, response<T>]> => {
  try {
    const response = await fn();
    return [null, response];
  } catch (error) {
    return [error, null];
  }
};

export default asyncWrapper;
