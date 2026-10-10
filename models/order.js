const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        area: {
        type: String,
        required: true,
        },
        city: {
        type: String,
        required: true,
        },
        state: {
        type: String,
        required: true,
        },
        pincode:  {
        type: String,
        required: true,
        },
      },
    items: [
        {
            listing: {
                type: Schema.Types.ObjectId,
                ref: "Listing",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "In Progress", "Delivered", "Cancelled"],
        default: "Pending",
    }, 
  }, {timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;