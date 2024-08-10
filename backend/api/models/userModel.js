import BaseModel from "./baseModel.js";
import mongoose from 'mongoose';

class UserModel extends BaseModel {
    constructor() {
        const schemaDefinition = {
            name: {
                type: String,
                trim: true,
            },
            email: {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            role: {
                type: String,
                enum: ['Buyer', 'Seller', 'Admin'],
                default: 'Buyer'
            },
            phone: {
                type: String,
                required: true
            },
            order_history: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Order'
                }
            ]
        };
        super(schemaDefinition, 'User');
    }
}

export default UserModel;