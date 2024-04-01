const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    gender: String,
    file: String,

})

const Userprofile = mongoose.model('userprofile',UserSchema)
module.exports = Userprofile;