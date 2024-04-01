const mongoose = require('mongoose');

const userCommentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' // Assuming you have a Post model for blog posts
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserComment = mongoose.model('UserComment', userCommentSchema);

module.exports = UserComment;
