/**
 * @name getCookie
 * @description get cookie value
 * @param {string} name
 * @private
 * @param name
 * @returns {string} cookie value
 * @example getCookie('google') => 'test'
 */
const getCookie = (name: string): string => {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || ''
  );
};

export default getCookie;
