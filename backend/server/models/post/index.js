const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	userId: {
		type: String,
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
		type: Date,
		default: Date.now,
	},
});

postSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

postSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

module.exports = mongoose.model('Post', postSchema);
