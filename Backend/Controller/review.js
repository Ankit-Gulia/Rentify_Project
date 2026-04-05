
const Listing = require('../Models/Listing');
const Review = require('../Models/Review');

module.exports.addReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const review = await Review.create({
        ...req.body,
        author: req.user._id
    });
    listing.reviews.push(review);
    await listing.save();
    const populatedReview = await review.populate('author');

    res.json({
        message: "Review added",
        response: populatedReview
    });
};



module.exports.deleteReview = async (req, res) => {
    let { id, rev_id } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: rev_id } });
    await Review.findByIdAndDelete(rev_id);
    res.json({ message: "Review Deleted" });
};