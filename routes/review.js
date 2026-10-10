const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//Validate for review
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
      if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

const reviewCOntroller = require("../controllers/reviews.js");

//Review
//POST  Review Route
router.post("/", 
    validateReview, 
    wrapAsync (reviewCOntroller.createReview));

//Delete Review Route 
router.delete(
    "/:reviewId",
    wrapAsync(reviewCOntroller.destroyReview));

module.exports = router;