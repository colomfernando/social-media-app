const jwt = require('jsonwebtoken');
const Token = require('../../modules/token.js');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth-token') || req.cookies['auth-token'];

    if (!token) return res.status(403).send('unauthorized user');
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!verified) return res.status(403).send('unauthorized user');

    const id = new Token(token);

    console.log('id.userId() :>> ', id.userId());

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
