const bcrypt = require('bcrypt');
const Jwt = require('../../modules/Jwt');
const asyncWrapper = require('../../utils/asyncWrapper');
const { newUserSchema } = require('../../schemas/');
const Credential = require('../../models/credential');
const User = require('../../models/user');
const createAvatarUrl = require('../../utils/createAvatarUrl');
const ErrorHandler = require('../../modules/ErrorHandler');

const registerUser = async (req, res, next) => {
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
      avatar: createAvatarUrl(body.firstname, body.lastname),
    };

    const [, errorCredentialDb] = await asyncWrapper(() =>
      Credential.create({ password: hashPassword, email: newUser.email })
    );

    if (errorCredentialDb) throw new ErrorHandler();

    const [dataUser, errorUserDb] = await asyncWrapper(() =>
      User.create({ ...newUser })
    );

    if (errorUserDb) throw new ErrorHandler();

    const token = Jwt.sign({
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      id: dataUser._id,
    });
    // send cookie with one hour expire
    res.cookie('auth-token', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
};

module.exports = registerUser;
