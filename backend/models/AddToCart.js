const mongoose = require("mongoose");

const AddToCartSchema = new mongoose.Schema({
    productId: {
        ref: 'Product',
        type: String
    },
    userId: String,
    quantity: Number
}, {
    timestamps: true
});

const AddToCart = mongoose.model("AddToCart", AddToCartSchema);
module.exports = AddToCart;