const Jwt = require('../../modules/Jwt');
const ErrorHandler = require('../../modules/ErrorHandler');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth-token') || req.cookies['auth-token'];

    if (!token) throw new ErrorHandler('unauthorized user', 403);

    Jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
