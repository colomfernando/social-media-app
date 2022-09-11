const ErrorHandler = require('../../modules/ErrorHandler');
const Post = require('../../models/post');
const asyncWrapper = require('../../utils/asyncWrapper');
const Jwt = require('../../modules/Jwt');

const createPost = async (req, res, next) => {
  try {
    const { body } = req;
    const token = req.header('auth-token') || req.cookies['auth-token'];

    const userId = Jwt.userId(token);

    const [, error] = await asyncWrapper(() =>
      Post.create({
        ...body,
        user: userId,
      })
    );

    if (error) throw new ErrorHandler(error.message, 400);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

module.exports = createPost;

// uno: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVub0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJ1bm8iLCJsYXN0bmFtZSI6InVubyIsInVzZXJuYW1lIjoidW5vIiwiaWQiOiI2MzFjOGYwZDM5ZmNjOGQ5ODEyYjgxOGMiLCJpYXQiOjE2NjI4MTYwMTMsImV4cCI6MTY2MjkwMjQxM30.r5eb1RVvVTaNUXjlBo8uR---1KfX4RSFxaQM0Zer6cM

// dos: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvc0BnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJkb3MiLCJsYXN0bmFtZSI6ImRvcyIsInVzZXJuYW1lIjoiZG9zIiwiaWQiOiI2MzFjOGYzYjc4NmVhZjAzMGYzYTBiMzEiLCJpYXQiOjE2NjI4MTYwNTksImV4cCI6MTY2MjkwMjQ1OX0.-TuPcP4gb9cFme5mCDjrSNqqExQxo3lYmtxQ7xEPeCE

// tres: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZXNAZ21haWwuY29tIiwiZmlyc3RuYW1lIjoidHJlcyIsImxhc3RuYW1lIjoidHJlcyIsInVzZXJuYW1lIjoidHJlcyIsImlkIjoiNjMxYzhmNTBkN2Q2OWUxMWEyYjljZWFmIiwiaWF0IjoxNjYyODE2MDgwLCJleHAiOjE2NjI5MDI0ODB9.fBFFNhdkPTIdm-3cB8UYgl_F2F7mZ24Vjrebn-IIhlI

// uno publica post
// dos da like post de uno
