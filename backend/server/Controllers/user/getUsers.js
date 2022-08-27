const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const getUsers = async (req, res, next) => {
  try {
    const { user } = req.query;

    if (!user) throw new ErrorHandler('user is required', 404);

    const searchByUser = user
      ? {
          $or: [
            { username: { $regex: user } },
            { firstname: { $regex: user } },
            { lastname: { $regex: user } },
            { email: { $regex: user } },
          ],
        }
      : {};

    const [users, error] = await asyncWrapper(() =>
      User.find({ ...searchByUser })
    );

    if (error) throw new ErrorHandler();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = getUsers;
