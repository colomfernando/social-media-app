const mongoose = require('mongoose');
const validateEmail = require('../../utils/validateEmail');

const credentialSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validateEmail, 'Please fill a valid email address'],
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});

credentialSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

credentialSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Credential', credentialSchema);
