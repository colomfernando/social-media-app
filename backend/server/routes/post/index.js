const express = require('express');
const Post = require('../../models/post');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const post = await Post.find({});
		console.log('post :>> ', post);
		res.status(200).send('Hello from router post');
	} catch (error) {
		next(error);
	}
});

module.exports = router;
