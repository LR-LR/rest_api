// Imports
const mongoose = require('mongoose');

// Model
const Post = require('../models/posts');

exports.get_all = (req, res, next) => {
  Post.find()
    .exec()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};

exports.get_one = (req, res, next) => {
  const id = req.params.id;

  Post.findById(id)
    .populate('user_id', 'username')
    .exec()
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'No post for this ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};

exports.post = (req, res, next) => {
  const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.userData.user_id,
    image: req.file.path,
    description: req.body.description
  });

  newPost
    .save()
    .then((post) => {
      res.status(201).json({
        message: 'Post created!',
        postCreated: post
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

exports.patch = (req, res, next) => {
  const id = req.params.id;
  const description = req.body.description;

  Post.updateOne({ _id: id }, { $set: { description: description } })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Post updated!',
        request: {
          type: 'GET',
          url: `http://localhost:3000/posts/${id}`
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;

  Post.deleteOne({
    _id: id
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Post deleted'
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};
