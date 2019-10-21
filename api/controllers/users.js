// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Model
const User = require('../models/user');

// Functions
exports.get_all = (req, res, next) => {
  User.find()
    .select('username email')
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        err: err
      });
    });
};

exports.get_one = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json(user);
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

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash
      });

      newUser
        .save()
        .then((user) => {
          res.status(201).json({
            message: 'User created!',
            userCreated: user
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
};

exports.patch = (req, res, next) => {
  const id = req.params.id;

  const updateOps = {};
  for (let prop in req.body) {
    updateOps[prop] = req.body[prop];
  }

  User.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User updated!',
        request: {
          type: 'GET',
          url: `http://localhost:3000/users/${id}`
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

  User.deleteOne({
    _id: id
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};
