const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const getFollowersByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [user, error] = await asyncWrapper(() =>
      User.findById(id).populate('followers')
    );

    if (error) throw new ErrorHandler();

    res.set({
      'X-Total-Count': user.followers.length,
    });
    res.status(200).send(user.followers);
  } catch (err) {
    next(err);
  }
};

module.exports = getFollowersByUserId;
