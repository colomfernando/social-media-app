const asyncWrapper = require('../../utils/asyncWrapper');
const Post = require('../../models/post');
const Jwt = require('../../modules/Jwt');
const ErrorHandler = require('../../modules/ErrorHandler');

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = req.header('auth-token') || req.cookies['auth-token'];
    const userIdToken = Jwt.userId(token);

    const [post, error] = await asyncWrapper(() =>
      Post.findById(id)
        .populate('user')
        .populate({
          path: 'likes',
          select: 'id',
          match: { id: { $eq: userIdToken } },
        })
    );

    if (error) throw new ErrorHandler(error.message, 400);

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};

module.exports = getPostById;
