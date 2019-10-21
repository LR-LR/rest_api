// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Routers
const usersRoutes = require('./api/routes/users');
const postsRoutes = require('./api/routes/posts');
const commentsRoutes = require('./api/routes/comments');

// Connection to the database
mongoose.connect(process.env.MONGO_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app
  .use('/uploads', express.static('uploads'))
  // Parsing the body
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

  // CORS handling
  .use((req, res, next) => {
    res
      .header('Access-Control-Allow-Origin', '*')
      .header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }
    next();
  })

  // Routes handling
  .use('/users', usersRoutes)
  .use('/posts', postsRoutes)
  .use('/comments', commentsRoutes)

  // Errors handling
  .use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  })
  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      err: {
        message: err.message
      }
    });
  });

module.exports = app;
