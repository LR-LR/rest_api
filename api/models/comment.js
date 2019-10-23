// Imports
const mongoose = require('mongoose');

// Schema
const commentsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: { type: Date, default: Date.now },
    body: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('comment', commentsSchema);
