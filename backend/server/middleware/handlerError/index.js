// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  res.header('Content-Type', 'application/json');
  res
    .status(err.status || 500)
    .send({ status: err.status, message: err.message });
};

module.exports = handleError;
