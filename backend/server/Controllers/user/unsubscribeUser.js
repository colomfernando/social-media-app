const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const Jwt = require('../../modules/Jwt');
const ErrorHandler = require('../../modules/ErrorHandler');

const unsubscribeUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = req.header('auth-token') || req.cookies['auth-token'];
    const userId = Jwt.userId(token);

    if (id === userId) return res.status(200).end();

    const [, errorFollowers] = await asyncWrapper(() =>
      User.findByIdAndUpdate(id, { $pull: { followers: userId } })
    );
    if (errorFollowers) throw new ErrorHandler();

    const [, errorFollowing] = await asyncWrapper(() =>
      User.findByIdAndUpdate(userId, { $pull: { following: id } })
    );
    if (errorFollowing) throw new ErrorHandler();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = unsubscribeUser;
