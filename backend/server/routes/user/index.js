const express = require('express');
const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [users, error] = await asyncWrapper(() => User.find({}));

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [user, error] = await asyncWrapper(() => User.findById(id));

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    const [data, error] = await asyncWrapper(() => User.create({ ...body }));
    res.status(200).send('hi');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
