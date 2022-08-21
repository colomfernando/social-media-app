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

    const [user, error] = await asyncWrapper(() =>
      User.findByIdAndUpdate(id, { $pull: { followers: userId } })
    );
    if (error) throw new ErrorHandler();

    res.status(204).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = unsubscribeUser;
