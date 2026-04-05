
const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username : String,
    email : String,
});

userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);
module.exports = userSchema;