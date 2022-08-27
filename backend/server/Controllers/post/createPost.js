const ErrorHandler = require('../../modules/ErrorHandler');
const Post = require('../../models/post');
const asyncWrapper = require('../../utils/asyncWrapper');
const Jwt = require('../../modules/Jwt');

const createPost = async (req, res, next) => {
  try {
    const { body } = req;
    const token = req.header('auth-token') || req.cookies['auth-token'];

    const userId = Jwt.userId(token);

    const [, error] = await asyncWrapper(() =>
      Post.create({ ...body, user: userId })
    );

    if (error) throw new ErrorHandler();

    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

module.exports = createPost;
