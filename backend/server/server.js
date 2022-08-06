const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const Post = require('./models/post');

const server = express();
const PORT = 8080;
const url = 'mongodb://mongodb:27017/db';

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err) => {
		console.log('Cannot connect to the database!', err);
		process.exit();
	});

server.use(bodyParser.json());
server.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

server.use('/api/post', postRouter);
server.use('/api/user', userRouter);

server.get('/', async (req, res) => {
	// Post.create({
	// 	userId: '234234',
	// 	likes: 3,
	// 	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et massa nec libero condimentum eleifend a ut risus. Maecenas vel ligula lobortis, vulputate metus ut, ullamcorper elit. Proin in tortor in nulla lacinia dignissim. Nullam fringilla, mi sit amet euismod sagittis, nulla felis porttitor urna, in semper libero tortor in turpis. Quisque vel porttitor quam. Nulla.',
	// });

	res.send('Hello server');
});

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.export = server;
