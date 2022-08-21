const express = require('express');
const getUserById = require('../../Controllers/user/getUserById');
const getUsers = require('../../Controllers/user/getUsers');
const subscribeUser = require('../../Controllers/user/subscribeUser');
const unsubscribeUser = require('../../Controllers/user/unsubscribeUser');
const getFollowersByUserId = require('../../Controllers/user/getFollowersByUserId');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id/followers', getFollowersByUserId);
router.get('/:id', getUserById);

router.post('/:id/subscribe', subscribeUser);
router.post('/:id/unsubscribe', unsubscribeUser);

module.exports = router;
