const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

/**
 * Order schema definition using Mongoose.
 * Represents an order placed by a user in the MongoDB collection.
 */
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who placed the order
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product in the order
            quantity: { type: Number, required: true }, // Quantity of the product ordered
        }
    ],
    totalPrice: { type: Number, required: true }, // Total price of the order
    orderDate: { type: Date, default: Date.now }, // Date when the order was placed
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }, // Status of the payment
});

/**
 * OrderModel class extends the BaseModel with the order schema.
 * Provides CRUD operations for orders.
 */
class OrderModel extends BaseModel {
    constructor() {
        super(orderSchema, 'Order');
    }
}

module.exports = new OrderModel();