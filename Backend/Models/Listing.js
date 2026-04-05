
const {model} = require('mongoose');
const listingSchema =  require('../Schemas/listingSchema');

const Listing = new model('Listing', listingSchema);
module.exports = Listing;