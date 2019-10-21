// Imports
const mongoose = require('mongoose');

// Schema
const postSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    image: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('post', postSchema);
