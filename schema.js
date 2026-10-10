const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required().min(0),
      image: Joi.string().allow("", null),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

module.exports.orderSchema = Joi.object({
  order: Joi.object({
    customerName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().trim().required(),
    address: Joi.object({
         area: Joi.string().trim().required(),
         city: Joi.string().trim().required(),
         state: Joi.string().trim().required(),
         pincode: Joi.string().pattern(/^[0-9]{6}$/).required()
      }).min(1).required(),

    items: Joi.array().items(
      Joi.object({
        listing: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
      }).required(),
    )
    .min(1).required(),
  }).required(),
});