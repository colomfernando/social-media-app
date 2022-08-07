const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../../utils/asyncWrapper');
const { newUserSchema, credentialSchema } = require('../../schemas/');
const Credential = require('../../models/credential');
const User = require('../../models/user');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { body } = req;

    const { error: errorNewUserSchema } = newUserSchema.validate(body);

    if (errorNewUserSchema)
      return res.status(400).send(errorNewUserSchema.details[0].message);

    const [isEmailRegistered] = await asyncWrapper(() =>
      Credential.findOne({ email: body.email })
    );

    if (isEmailRegistered) return res.status(409).send('Email exist');

    const { password, ...rest } = body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      ...rest,
    };

    const [, errorCredentialDb] = await asyncWrapper(() =>
      Credential.create({ password: hashPassword, email: newUser.email })
    );

    if (errorCredentialDb) return res.status(500).send('Something went wrong');

    const [dataUser, errorUserDb] = await asyncWrapper(() =>
      User.create({ ...newUser })
    );

    if (errorUserDb) return res.status(500).send('Something went wrong');

    const token = jwt.sign(
      {
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        id: dataUser._id,
      },
      process.env.TOKEN_SECRET
    );

    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;

    const { error: errorCredentialSchema } = credentialSchema.validate(body);

    if (errorCredentialSchema)
      return res.status(400).send(errorCredentialSchema.details[0].message);

    const [userFound] = await asyncWrapper(() =>
      Credential.findOne({ email: body.email })
    );

    if (!userFound) return res.status(404).send('Email is not registered');

    const validPassword = await bcrypt.compare(
      body.password,
      userFound.password
    );
    if (!validPassword)
      return res.status(400).json({ message: 'invalid password' });

    const [dataUser, errorUser] = await asyncWrapper(() =>
      User.findOne({ email: body.email })
    );

    if (errorUser) return res.status(500).send('Something went wrong');

    const token = jwt.sign(
      {
        email: dataUser.email,
        firstname: dataUser.firstname,
        lastname: dataUser.lastname,
        username: dataUser.username,
        id: dataUser._id,
      },
      process.env.TOKEN_SECRET
    );

    res.status(200).send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
