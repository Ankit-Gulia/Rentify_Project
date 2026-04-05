const express = require('express');
const router = express.Router({mergeParams : true});
const {isLoggedIn, isReviewAuthor, wrapAsync} = require('../Utils/middleware');
const {addReview, deleteReview} = require('../Controller/review');


router.post("/", isLoggedIn, wrapAsync(addReview));
router.delete("/:rev_id", isLoggedIn, isReviewAuthor, wrapAsync(deleteReview));

module.exports = router;
