const ErrorHandler = require('../../modules/ErrorHandler');
const Post = require('../../models/post');
const asyncWrapper = require('../../utils/asyncWrapper');
const Jwt = require('../../modules/Jwt');

const addLikePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = req.header('auth-token') || req.cookies['auth-token'];
    const userId = Jwt.userId(token);

    const [post, errorPost] = await asyncWrapper(() => Post.findById(id));

    if (errorPost) throw new ErrorHandler();
    if (!post) throw new ErrorHandler('Post not found', 400);

    const { user: postUser } = post;
    if (postUser.id === userId) res.status(204).end();

    const [, errorUpdatePost] = await asyncWrapper(() =>
      Post.findOneAndUpdate({ _id: id }, { $addToSet: { likes: userId } })
    );

    if (errorUpdatePost) throw new ErrorHandler(errorUpdatePost.message, 400);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = addLikePost;
