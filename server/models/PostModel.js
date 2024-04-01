const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    title: String,
    desc: String,
    file: String,
    category: String,
    email: String,
    createdAt: { type: Date, default: Date.now } // Add createdAt field with default value
    
})

const PostModel = mongoose.model('posts',UserSchema)
module.exports = PostModel;