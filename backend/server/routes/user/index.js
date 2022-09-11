const express = require('express');
const getUserById = require('../../controllers/user/getUserById');
const getUsers = require('../../controllers/user/getUsers');
const subscribeUser = require('../../controllers/user/subscribeUser');
const unsubscribeUser = require('../../controllers/user/unsubscribeUser');
const getFollowersByUserId = require('../../controllers/user/getFollowersByUserId');
const getFollowingByUserId = require('../../controllers/user/getFollowingByUserId');
const getLikesByUserId = require('../../controllers/user/getLikesByUserId');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:id/likes', getLikesByUserId);
router.get('/:id/followers', getFollowersByUserId);
router.get('/:id/following', getFollowingByUserId);

router.post('/:id/subscribe', subscribeUser);
router.post('/:id/unsubscribe', unsubscribeUser);

module.exports = router;
