const asyncWrapper = require('../../utils/asyncWrapper');
const Post = require('../../models/post');
const ErrorHandler = require('../../modules/ErrorHandler');

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [post, error] = await asyncWrapper(() =>
      Post.findById(id).populate('user')
    );

    if (error) throw new ErrorHandler();

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};

module.exports = getPostById;
