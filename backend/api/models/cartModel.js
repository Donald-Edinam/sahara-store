import mongoose from 'mongoose';
import BaseModel from './baseModel.js';

class CartModel extends BaseModel {
    constructor() {
        // Define the cart schema
        const schemaDefinition = {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                unique: true,
                index: true
            }
                ,
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

    async findByUserId(userId) {
        if (!userId) {
            throw new Error('User ID is required to find the cart');
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid User ID format');
        }

        try {
            const objectId = new mongoose.Types.ObjectId(userId);
            return await this.model.findOne({ userId: objectId }).populate('products.productId');
        } catch (error) {
            throw new Error(`Error finding cart: ${error.message}`);
        }
    }

    async findByProductId(productId) {
        if (!productId) {
            throw new Error('Product ID is required to find the cart');
        }

        try {
            return await this.model.find({ 'products.productId': productId });
        } catch (error) {
            throw new Error(`Error finding cart: ${error.message}`);
        }
    }  
}

export default CartModel;