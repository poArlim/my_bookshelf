const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    userId: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0  // 0: User, 1 : Admin
    },
    token: String,
    tokenExp: Number
})

const User = mongoose.model('User', userSchema);

module.exports = { User };