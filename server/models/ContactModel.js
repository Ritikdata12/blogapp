const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    message: String,
    timestamp: Date, // Use the Date datatype for timestamps
})

const ContactModel = mongoose.model('contact',UserSchema)
module.exports = ContactModel;