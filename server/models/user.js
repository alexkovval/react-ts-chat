const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/db');
const  Schema  = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required:true
    },
    token: {
        type:String
    }
});

module.exports = mongoose.model('User', UserSchema);
