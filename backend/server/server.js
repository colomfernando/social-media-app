const express = require('express');
const bodyParser = require('body-parser');
const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');

const server = express();
const PORT = 8080;

server.use(bodyParser.json());
server.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', async (req, res) => {
	res.send('Hello server');
});

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

module.export = server;
