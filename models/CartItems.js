const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const CartItemsSchema = new Schema({
    _id: String,
    title: String,
    price: Number,
    qty: Number,
    url: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const CartItems = mongoose.model('CartItems', CartItemsSchema);

module.exports = CartItems;