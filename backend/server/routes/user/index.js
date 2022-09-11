const express = require('express');
const getUserById = require('../../Controllers/user/getUserById');
const getUsers = require('../../Controllers/user/getUsers');
const subscribeUser = require('../../Controllers/user/subscribeUser');
const unsubscribeUser = require('../../Controllers/user/unsubscribeUser');
const getFollowersByUserId = require('../../Controllers/user/getFollowersByUserId');
const getFollowingByUserId = require('../../Controllers/user/getFollowingByUserId');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:id/followers', getFollowersByUserId);
router.get('/:id/following', getFollowingByUserId);

router.post('/:id/subscribe', subscribeUser);
router.post('/:id/unsubscribe', unsubscribeUser);

module.exports = router;
