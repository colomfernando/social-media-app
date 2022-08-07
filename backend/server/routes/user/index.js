const express = require('express');
const asyncWrapper = require('../../utils/asyncWrapper');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [users, error] = await asyncWrapper(() => User.find({}));

    if (error) throw new ErrorHandler();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [user, error] = await asyncWrapper(() => User.findById(id));

    if (error) throw new ErrorHandler();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
