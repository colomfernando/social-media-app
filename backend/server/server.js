const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const Db = require('./modules/Db');
const verifyToken = require('./middleware/verifyToken');
const handleError = require('./middleware/handlerError');
// TODO: temp
const Post = require('./models/post');
const Credential = require('./models/credential');
const User = require('./models/user');

require('dotenv').config();

const server = express();
const PORT = 8080;

Db.connect();

server.use(cookieParser());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use('/api', authRouter);

// TODO: temp
server.post('/api/delete', async (req, res, next) => {
  try {
    await Post.deleteMany();
    await Credential.deleteMany();
    await User.deleteMany();
    res.status(200).send('delete all');
  } catch (err) {
    next(err);
  }
});

server.use('/api*', verifyToken);

server.use('/api/post', postRouter);
server.use('/api/user', userRouter);

// eslint-disable-next-line no-unused-vars
server.use(handleError);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.export = server;
