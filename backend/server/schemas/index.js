const joi = require('joi');

const credentialSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
});

const userSchema = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  username: joi.string().required(),
  avatar: joi.string().required(),
});

const newUserSchema = userSchema.append({
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
});

module.exports = {
  credentialSchema,
  userSchema,
  newUserSchema,
};
