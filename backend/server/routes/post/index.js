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
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const token = req.header('auth-token') || req.cookies['auth-token'];

    const userId = Jwt.userId(token);

    const [post, error] = await asyncWrapper(() =>
      Post.create({ ...body, user: userId })
    );

    if (error) throw new ErrorHandler();

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [error] = await asyncWrapper(() => Post.deleteOne({ id }).exec());

    if (error) throw new ErrorHandler();

    res.status(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
