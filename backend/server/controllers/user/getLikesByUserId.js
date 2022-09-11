const asyncWrapper = require('../../utils/asyncWrapper');
const Post = require('../../models/post');
const ErrorHandler = require('../../modules/ErrorHandler');

const getLikesByUserId = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    const [postLikes, error] = await asyncWrapper(() =>
      Post.find({ likes: { $in: userId } }).populate('user')
    );

    if (error) throw new ErrorHandler(error.message);

    res.status(200).send(postLikes);
  } catch (err) {
    next(err);
  }
};

module.exports = getLikesByUserId;
