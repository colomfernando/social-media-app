const ErrorHandler = require('../../modules/ErrorHandler');
const Post = require('../../models/post');
const asyncWrapper = require('../../utils/asyncWrapper');

const getPosts = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const [posts, error] = await asyncWrapper(() =>
      Post.find({
        ...(userId && { user: userId }),
      })
        .populate('user')
        .sort({ timestamp: -1 })
    );

    if (error) throw new ErrorHandler();

    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = getPosts;
