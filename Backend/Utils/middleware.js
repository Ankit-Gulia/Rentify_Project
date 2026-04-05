
const Listing = require('../Models/Listing');
const Review = require('../Models/Review');
const listingSchema = require('../Schema.js');
const customError = require("./Error.js");

module.exports.validateListing = (req,res,next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return next(new customError(406, msg));
    }
    next()
}

module.exports.wrapAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
} 


module.exports.isOwner = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!req.user._id.equals(listing.owner._id)){
      return res.status(406).json({message : "You'r not the owner of the listing"});
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
     let {id, rev_id} = req.params;
    const review = await Review.findById(rev_id);
    if(!req.user._id.equals(review.author._id)){
      return res.status(406).json({message : "You'r not the author of the review"});
    }
    next();
};


module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
   return res.status(401).json({
    success: false,
    message: "You must login before moving ahead."
  });
}



