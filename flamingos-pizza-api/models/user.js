const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
        required: true
    }
})

module.exports = mongoose.model('User', usersSchema)