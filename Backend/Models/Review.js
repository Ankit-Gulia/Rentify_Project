
const {model} = require("mongoose");

const reviewSchema = require("../Schemas/reviewSchema");
module.exports = new model("Review", reviewSchema);