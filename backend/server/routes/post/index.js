const express = require('express');
const getPosts = require('../../Controllers/post/getPosts');
const createPost = require('../../Controllers/post/createPost');
const getPostById = require('../../Controllers/post/getPostById');
const addLikePost = require('../../Controllers/post/addLikePost');
const removeLikePost = require('../../Controllers/post/removeLikePost');
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);
router.patch('/:id/like', addLikePost);
router.patch('/:id/unlike', removeLikePost);

module.exports = router;
