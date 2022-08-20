const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const getUsers = async (req, res, next) => {
  try {
    const [users, error] = await asyncWrapper(() => User.find({}));

    if (error) throw new ErrorHandler();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = getUsers;
