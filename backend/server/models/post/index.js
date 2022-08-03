const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	userId: {
		type: Number,
		required: true,
	},
	likes: {
		type: Number,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Post', postSchema);
