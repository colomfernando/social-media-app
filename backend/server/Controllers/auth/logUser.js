const bcrypt = require('bcrypt');
const Jwt = require('../../modules/Jwt');
const asyncWrapper = require('../../utils/asyncWrapper');
const { credentialSchema } = require('../../schemas/');
const Credential = require('../../models/credential');
const User = require('../../models/user');
const ErrorHandler = require('../../modules/ErrorHandler');

const logUser = async (req, res, next) => {
  try {
    const { body } = req;

    const { error: errorCredentialSchema } = credentialSchema.validate(body);

    if (errorCredentialSchema)
      throw new ErrorHandler(
        errorCredentialSchema.details[0].message.replace(/"/g, ''),
        400
      );

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

    if (errorUser) throw new ErrorHandler('Something went wrong', 500);

    const token = Jwt.sign({
      email: dataUser.email,
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      username: dataUser.username,
      id: dataUser._id,
    });
    // send cookie with one hour expire
    res.cookie('auth-token', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.status(200).send(token);
  } catch (err) {
    next(err);
  }
};
module.exports = logUser;
