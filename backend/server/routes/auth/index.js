const express = require('express');
const bcrypt = require('bcrypt');
const Jwt = require('../../modules/Jwt');
const asyncWrapper = require('../../utils/asyncWrapper');
const { newUserSchema, credentialSchema } = require('../../schemas/');
const Credential = require('../../models/credential');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { body } = req;

    const { error: errorNewUserSchema } = newUserSchema.validate(body);

    if (errorNewUserSchema)
      throw new ErrorHandler(errorNewUserSchema.details[0].message, 400);

    const [isEmailRegistered] = await asyncWrapper(() =>
      Credential.findOne({ email: body.email })
    );

    if (isEmailRegistered) throw new ErrorHandler('Email exist', 409);

    const { password, ...rest } = body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      ...rest,
    };

    const [, errorCredentialDb] = await asyncWrapper(() =>
      Credential.create({ password: hashPassword, email: newUser.email })
    );

    if (errorCredentialDb)
      throw new ErrorHandler('Email Something went wrong', 500);

    const [dataUser, errorUserDb] = await asyncWrapper(() =>
      User.create({ ...newUser })
    );

    if (errorUserDb) throw new ErrorHandler('Email Something went wrong', 500);

    const token = Jwt.sign(
      {
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        id: dataUser._id,
      },
      process.env.TOKEN_SECRET
    );
    // send cookie with one hour expire
    res.cookie('auth-token', token, {
      expires: new Date(Date.now() + 3600000),
    });
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
      throw new ErrorHandler(errorCredentialSchema.details[0].message, 400);

    const [userFound] = await asyncWrapper(() =>
      Credential.findOne({ email: body.email })
    );

    if (!userFound) throw new ErrorHandler('Email is not registered', 404);

    const validPassword = await bcrypt.compare(
      body.password,
      userFound.password
    );
    if (!validPassword) throw new ErrorHandler('invalid password', 400);

    const [dataUser, errorUser] = await asyncWrapper(() =>
      User.findOne({ email: body.email })
    );

    if (errorUser) throw new ErrorHandler('Email Something went wrong', 500);

    const token = Jwt.sign(
      {
        email: dataUser.email,
        firstname: dataUser.firstname,
        lastname: dataUser.lastname,
        username: dataUser.username,
        id: dataUser._id,
      },
      process.env.TOKEN_SECRET
    );
    // send cookie with one hour expire
    res.cookie('auth-token', token, {
      expires: new Date(Date.now() + 3600000),
    });
    res.status(200).send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
