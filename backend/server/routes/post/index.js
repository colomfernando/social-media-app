const express = require('express');
const asyncWrapper = require('../../utils/asyncWrapper');
const Jwt = require('../../modules/Jwt');
const Post = require('../../models/post');
const ErrorHandler = require('../../modules/ErrorHandler');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [posts, error] = await asyncWrapper(() =>
      Post.find({}).populate('user')
    );

    if (error) throw new ErrorHandler();

    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
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
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const token = req.header('auth-token') || req.cookies['auth-token'];

    const userId = Jwt.userId(token);

    if (!userId) throw new ErrorHandler('unauthorized user', 403);

    const [post, error] = await asyncWrapper(() =>
      Post.create({ ...body, user: userId })
    );

    if (error) throw new ErrorHandler();

    res.status(201).send(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [dataPost, errorPost] = await asyncWrapper(() =>
      Post.deleteOne({ id }).exec()
    );

    if (errorPost) throw new ErrorHandler();

    if (dataPost.deletedCount === 0)
      throw new ErrorHandler('record not found', 404);

    res.status(204).send({ message: 'Record deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
