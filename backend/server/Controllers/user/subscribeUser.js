const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const Jwt = require('../../modules/Jwt');
const ErrorHandler = require('../../modules/ErrorHandler');

const subscribeUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = req.header('auth-token') || req.cookies['auth-token'];
    const userId = Jwt.userId(token);

    if (id === userId) return res.status(200).end();

    const [, error] = await asyncWrapper(() =>
      User.findByIdAndUpdate(id, { $addToSet: { followers: userId } })
    );
    if (error) throw new ErrorHandler();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = subscribeUser;
