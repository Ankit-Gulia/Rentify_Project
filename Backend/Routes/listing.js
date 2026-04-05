
const express = require('express');
const router = express.Router();
const {wrapAsync, validateListing, isLoggedIn, isOwner} = require('../Utils/middleware');
const {listings, showListing, addListing, editListing, deleteListing} = require('../Controller/listing');
const {upload} = require('../Cloudnary/cloudConfig');


router
    .route("/")
    .get(wrapAsync(listings))
    .post(isLoggedIn, upload.single('image'), validateListing, wrapAsync(addListing))
;


router
    .route("/:id")
    .get(wrapAsync(showListing))
    .put(isLoggedIn, isOwner, upload.single('image'), wrapAsync(editListing))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListing))
;


module.exports = router;