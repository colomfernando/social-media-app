const express = require('express');
const Post = require('../../models/post');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const post = await Post.find({});
		res.status(200).send(post);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
