const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

/**
 * Cart schema definition using Mongoose.
 * Represents a user's shopping cart in the MongoDB collection.
 */
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who owns the cart
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product
            quantity: { type: Number, required: true }, // Quantity of the product in the cart
        }
    ],
});

/**
 * CartModel class extends the BaseModel with the cart schema.
 * Provides CRUD operations for shopping carts.
 */
class CartModel extends BaseModel {
    constructor() {
        super(cartSchema, 'Cart');
    }
}

module.exports = new CartModel();