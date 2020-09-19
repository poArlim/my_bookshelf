const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10; // 최대 글자 길이

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

userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User };