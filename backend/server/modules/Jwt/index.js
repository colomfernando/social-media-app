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
    return jwt.sign(userData, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });
  }

  static userId(token) {
    return this.verify(token).id;
  }
}

module.exports = Jwt;
