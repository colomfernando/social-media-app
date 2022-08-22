/**
 * @function setCookie
 * @param  {string} name
 * @param  {string} value
 * @param  {number} expires 1 hour
 * @returns void
 * @example setCookie('cookieName', 'cookieValue', 'expiresInHours')
 */
const setCookie = (name: string, value: string, expires = 0): void => {
  const now = new Date();
  now.setTime(now.getTime() + expires * 3600 * 1000);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${now.toUTCString()}`;
};

export default setCookie;
