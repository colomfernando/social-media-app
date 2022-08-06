const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

require('dotenv').config();

const server = express();
const PORT = 8080;
const url = `mongodb://mongodb:27017/${process.env.DBNAME}`;

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
    // eslint-disable-next-line no-undef
    process.exit();
  });

server.use(cookieParser());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use('/api/post', postRouter);
server.use('/api/user', userRouter);
server.use('/api', authRouter);

server.get('/', async (req, res) => {
  res.send('Hello server');
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.export = server;
