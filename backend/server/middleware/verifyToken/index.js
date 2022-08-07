const Jwt = require('../../modules/Jwt');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth-token') || req.cookies['auth-token'];

    if (!token) return res.status(403).send('unauthorized user');
    Jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    return res.status(403).send('unauthorized user');
  }
};

module.exports = verifyToken;
