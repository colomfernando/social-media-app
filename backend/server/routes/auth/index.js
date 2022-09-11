const express = require('express');
const logUser = require('../../controllers/auth/logUser');
const registerUser = require('../../controllers/auth/registerUser');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', logUser);

module.exports = router;
