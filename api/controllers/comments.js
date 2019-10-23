// Imports
const mongoose = require('mongoose');

// Model
const Comment = require('../models/comment');
const Posts = require('../models/posts');

// Functions
exports.get_all = (req, res, next) => {
  Comment.find()
    .exec()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};

exports.get_one = (req, res, next) => {
  const id = req.params.id;

  Comment.findById(id)
    .exec()
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: 'No user for this ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};

exports.get_all_by_post_id = (req, res, next) => {
  let post_id = req.params.post_id;

  Comment.find({ post_id: post_id })
    .exec()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};

exports.post = (req, res, next) => {
  let post_id = req.params.post_id;
  let user_id = req.userData.user_id;
  let body = req.body.body;

  Posts.countDocuments({ _id: post_id }, (err, count) => {
    if (err) {
      res.status(500).json({
        err: err
      });
    } else if (count < 1) {
      res.status(404).json({
        message: "No post for this ID! You can't comment a non-existing post!"
      });
    } else {
      const newComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        post_id: req.params.post_id,
        user_id: user_id,
        body: body
      });

      newComment
        .save()
        .then((comment) => {
          res.status(201).json({
            message: 'Comment created!',
            commentCreated: comment
          });
        })
        .catch((err) => {
          res.status(500).json({
            err: err
          });
        });
    }
  });
};

exports.patch = (req, res, next) => {
  const id = req.params.id;
  const user_id = req.userData.user_id;

  const updateOps = {};
  for (let prop in req.body) {
    updateOps[prop] = req.body[prop];
  }

  Comment.updateOne({ _id: id, user_id: user_id }, { $set: updateOps })
    .exec()
    .then((result) => {
      if (result.nModified === 0) {
        res.status(401).json({
          message: "You're not authorized to update this comment!"
        });
      } else {
        res.status(200).json({
          message: 'Comment updated!',
          request: {
            type: 'GET',
            url: `http://localhost:3000/users/${id}`
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  const user_id = req.userData.user_id;

  Comment.deleteOne({
    _id: id,
    user_id: user_id
  })
    .exec()
    .then((result) => {
      let message;

      if (result.deletedCount < 1) {
        message = 'No comment for this ID!';
      } else {
        message = 'Comment deleted!';
      }

      res.status(200).json({
        message: message
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};
