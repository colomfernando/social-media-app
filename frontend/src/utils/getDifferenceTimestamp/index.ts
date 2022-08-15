/**
 * If the timestamp is truthy, return the absolute value of the difference between the current time and
 * the timestamp divided in hours.
 * @param {number} timestamp - number - The timestamp to get the difference from.
 * @returns {number | null} The difference in hours between the current time and the timestamp.
 */
const getDifferenceTimestamp = (timestamp: number): string | null => {
  if (!timestamp) return null;

  const now = new Date().getTime();
  const timestampDate = new Date(timestamp);

  const differenceHours = Math.floor((now - timestampDate.getTime()) / 36e5);

  if (differenceHours >= 1 && differenceHours < 24)
    return `${differenceHours}h`;

  if (differenceHours > 24)
    return `${timestampDate.getDate()}-${timestampDate.toLocaleString(
      'default',
      {
        month: 'short',
      }
    )}`;

  const differenceMinutes = Math.floor((now - timestampDate.getTime()) / 60e3);
  return `${differenceMinutes}m`;
};

export default getDifferenceTimestamp;
