const express = require('express');
const getPosts = require('../../controllers/post/getPosts');
const createPost = require('../../controllers/post/createPost');
const getPostById = require('../../controllers/post/getPostById');
const addLikePost = require('../../controllers/post/addLikePost');
const removeLikePost = require('../../controllers/post/removeLikePost');
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);
router.patch('/:id/like', addLikePost);
router.patch('/:id/unlike', removeLikePost);

module.exports = router;
