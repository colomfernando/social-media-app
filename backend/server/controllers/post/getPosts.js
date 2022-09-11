const ErrorHandler = require('../../modules/ErrorHandler');
const Post = require('../../models/post');
const User = require('../../models/user');
const asyncWrapper = require('../../utils/asyncWrapper');
const Jwt = require('../../modules/Jwt');

const getPosts = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const token = req.header('auth-token') || req.cookies['auth-token'];
    const userIdToken = Jwt.userId(token);

    const [followingUser, errorFollowingUser] = await asyncWrapper(() =>
      User.find({ followers: { $in: userIdToken } }).select({ _id: 1 })
    );

    if (errorFollowingUser) throw new ErrorHandler();

    const filterByUser = userId ? [userId] : [userIdToken, ...followingUser];

    const [posts, errorPosts] = await asyncWrapper(() =>
      Post.find({
        user: { $in: filterByUser },
      })
        .populate('user')
        .sort({ timestamp: -1 })
    );

    if (errorPosts) throw new ErrorHandler(errorPosts.message, 400);

    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = getPosts;
