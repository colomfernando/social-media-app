const express = require('express');
const logUser = require('../../Controllers/auth/logUser');
const registerUser = require('../../Controllers/auth/registerUser');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', logUser);

module.exports = router;
