
const userSchema = require('../Schemas/userSchema');
const {model} = require("mongoose");

const User = new model('User', userSchema);
module.exports = User;