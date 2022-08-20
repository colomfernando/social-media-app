const express = require('express');
const getUserById = require('../../Controllers/user/getUserById');
const getUsers = require('../../Controllers/user/getUsers');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

module.exports = router;
