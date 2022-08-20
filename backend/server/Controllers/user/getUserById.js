const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [user, error] = await asyncWrapper(() =>
      User.findById(id).populate('followers')
    );
    console.log('error :>> ', error);
    if (error) throw new ErrorHandler();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = getUserById;
