import mongoose from 'mongoose';
import BaseModel from './baseModel.js';

class CartModel extends BaseModel {
    constructor() {
        // Define the cart schema
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
            ]
        };
        // Call the super constructor with the cart schema
        super(schemaDefinition, 'Cart');
    }
}

export default CartModel;