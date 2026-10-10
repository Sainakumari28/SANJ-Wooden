const express = require("express");
const Order = require("../models/order.js");
const router = express.Router();
const { orderSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
// const { error } = orderSchema.validate(req.body);

router.get("/orderForm", (req, res) => {
 res.render("orders/orderForm");
})
module.exports = router;