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

module.exports = mongoose.model('Credential', credentialSchema);
