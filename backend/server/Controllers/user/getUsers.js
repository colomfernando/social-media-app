const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');
const Jwt = require('../../modules/Jwt');

const getUsers = async (req, res, next) => {
  try {
    const { user } = req.query;
    const token = req.header('auth-token') || req.cookies['auth-token'];
    const userIdToken = Jwt.userId(token);

    const searchByUser = user ? { username: { $regex: user } } : {};

    const [users, error] = await asyncWrapper(() =>
      User.find({ _id: { $ne: userIdToken }, ...searchByUser })
    );

    if (error) throw new ErrorHandler();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = getUsers;
