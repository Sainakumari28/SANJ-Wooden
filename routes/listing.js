const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Validation for not empty space submit
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
      if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

const listingController = require("../controllers/listings.js");

// Search 
router.get("/search", async (req, res) => {
   const result = await Listing.find({
    title: req.query.query
   });
    res.render("listings/index.ejs", {allListings: result});
   });


// Using Router route and create (index & create)
router
  .route("/")
  .get( wrapAsync(listingController.index))
  .post(
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));
  

 //New Route 
    router.get("/new", isLoggedIn, listingController.renderNewForm);

// For show, update, delete
router
 .route("/:id")
 .get( wrapAsync(listingController.showListing))
 .put( upload.single("listing[image]"),
    // validateListing, 
    wrapAsync(listingController.updateListing)
)
 .delete( wrapAsync(listingController.destroyListing));

//Edit Route 
router.get("/:id/edit", wrapAsync(listingController.renderEditForm));

module.exports = router;