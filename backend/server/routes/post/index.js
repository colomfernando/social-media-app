const express = require('express');
const mongoose = require('mongoose');
const asyncWrapper = require('../../utils/asyncWrapper');
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

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;

		const [data, error] = await asyncWrapper(() => Post.findById(id).exec());

		res.status(200).send(data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
