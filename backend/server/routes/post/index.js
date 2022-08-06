const express = require('express');
const asyncWrapper = require('../../utils/asyncWrapper');
const Post = require('../../models/post');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [posts, error] = await asyncWrapper(() =>
      Post.find({}).populate('user')
    );
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [post, error] = await asyncWrapper(() =>
      Post.findById(id).populate('user')
    );

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    const [post, error] = await asyncWrapper(() => Post.create({ ...body }));

    res.status(200).send('hi');
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [post, error] = await asyncWrapper(() => Post.deleteMany(id).exec());

    res.status(200).send('hi');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
