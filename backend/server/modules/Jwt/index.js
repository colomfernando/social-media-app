const jwt = require('jsonwebtoken');
const ErrorHandler = require('../../modules/ErrorHandler');

class Jwt {
  static verify(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) throw new ErrorHandler(err.message, 403);

      return data;
    });
  }

  static sign(userData) {
    return jwt.sign(
      { ...userData, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.TOKEN_SECRET
    );
  }

  static userId(token) {
    return this.verify(token).id;
  }
}

module.exports = Jwt;
