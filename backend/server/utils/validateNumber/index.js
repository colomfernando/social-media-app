const validateNumber = (num) =>
  !!(
    (num || num === 0) &&
    typeof num === 'number' &&
    !Number.isNaN(Number(num))
  );

module.exports = validateNumber;
