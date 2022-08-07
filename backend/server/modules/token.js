const jwt = require('jsonwebtoken');

class Token {
  constructor(token) {
    this.token = token;
  }

  verify() {
    try {
      const tokenVerified = jwt.verify(this.token, process.env.TOKEN_SECRET);
      return tokenVerified;
    } catch (err) {
      return err.message;
    }
  }

  userId() {
    return this.verify().id;
  }
}

module.exports = Token;
