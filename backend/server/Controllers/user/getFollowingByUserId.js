const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const getFollowingByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [user, error] = await asyncWrapper(() =>
      User.findById(id).populate('followers')
    );

    if (error) throw new ErrorHandler();

    res.set({
      'X-Total-Count': user.following.length,
    });
    res.status(200).send(user.following);
  } catch (err) {
    next(err);
  }
};

module.exports = getFollowingByUserId;
