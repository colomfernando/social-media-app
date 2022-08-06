const express = require('express');
const asyncWrapper = require('../../utils/asyncWrapper');
const { credentialSchema } = require('../../schemas/');
const Credential = require('../../models/credential');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { body } = req;

    const { error: errorSchema } = credentialSchema.validate(body);

    if (errorSchema)
      return res.status(400).send(errorSchema.details[0].message);

    const [isEmailRegistered] = await asyncWrapper(() =>
      Credential.findOne({ email: body.email })
    );

    if (isEmailRegistered) return res.status(400).send('Email exist');
    // await asyncWrapper(() => Credential.create({ ...body }));

    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const [, error] = await asyncWrapper(() => Credential.create({ ...body }));

    res.status(200).send(error.message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
