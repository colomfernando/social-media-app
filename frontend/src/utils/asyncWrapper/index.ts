import { ErrorApi } from 'types';

type response<T> = T | null;

/**
 * @module utils/api/utils
 * @function asyncWrapper
 * @async
 * @param {Promise} fn
 * @return {Promise}
 */
const asyncWrapper = async <T>(
  fn: () => Promise<T>
): Promise<[null | ErrorApi, response<T>]> => {
  try {
    const response = await fn();

    return [null, response];
  } catch (error) {
    return [error as ErrorApi, null];
  }
};

export default asyncWrapper;
