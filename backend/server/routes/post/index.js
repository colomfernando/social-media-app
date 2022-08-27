const express = require('express');
const asyncWrapper = require('../../utils/asyncWrapper');
const Post = require('../../models/post');
const ErrorHandler = require('../../modules/ErrorHandler');
const validateNumber = require('../../utils/validateNumber');
const getPosts = require('../../Controllers/post/getPosts');
const createPost = require('../../Controllers/post/createPost');
const getPostById = require('../../Controllers/post/getPostById.js');
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;

    if (!validateNumber(likes))
      throw new ErrorHandler('likes must be a valid number', 404);

    const roundLikes = Math.round(likes);

    const [, error] = await asyncWrapper(() =>
      Post.updateOne({ id }, { likes: roundLikes })
    );
    if (error) throw new ErrorHandler();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
