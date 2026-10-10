const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title: {
     type: String,
     required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
        // type: String,
        // default: "https://unsplash.com...",
        // set: (v) => v === "" ? "https://unsplash.com..." : v,
    },
    price: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
  await Review.deleteMany({_id : {$in: listing.reviews}});
}  
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;