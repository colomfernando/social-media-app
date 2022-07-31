/**
 * If the timestamp is truthy, return the absolute value of the difference between the current time and
 * the timestamp divided in hours.
 * @param {number} timestamp - number - The timestamp to get the difference from.
 * @returns {number | null} The difference in hours between the current time and the timestamp.
 */
const getDifferenceHours = (timestamp: number): number | null => {
  if (!timestamp) return null;
  const now = new Date().getTime();

  return Math.floor((now - timestamp) / 36e5);
};

export default getDifferenceHours;