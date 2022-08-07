const handleError = (err, req, res) => {
  res.status(err.status).send({ status: err.status, message: err.message });
};

module.exports = handleError;
