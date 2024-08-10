import mongoose from 'mongoose';
import BaseModel from './baseModel.js';

/**
 * OrderModel class extends the BaseModel with the order schema.
 * Provides CRUD operations for orders.
 */
class OrderModel extends BaseModel {
    constructor() {
        // Define the order schema
        const schemaDefinition = {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            products: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }
            ],
            totalPrice: {
                type: Number,
                required: true
            },
            orderDate: {
                type: Date,
                default: Date.now
            },
            paymentStatus: {
                type: String,
                enum: ['Pending', 'Completed', 'Failed'],
                default: 'Pending'
            }
        }
        // Call the super constructor with the order schema
        super(orderSchema, 'Order');
    }
}

export default OrderModel;