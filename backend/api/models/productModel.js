import mongoose from 'mongoose';
import BaseModel from './baseModel.js';

class ProductModel extends BaseModel {
    constructor() {
        const schemaDefinition = {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            category: {
                type: String,
                required: true,
                trim: true
            },
            stock: {
                type: Number,
                required: true,
                min: 0
            },
            tags: {
                type: [String],
                required: false,
                trim: true
            },
            imageUrl: {
                type: String,
                required: false,
                trim: true
            }
        };
        super(schemaDefinition, 'Product');
    }

    async findOne(query) {
        if (!query || typeof query !== 'object') {
            throw new Error('Invalid query provided for finding the document');
        }

        try {
            return await this.model.findOne(query);
        } catch (error) {
            throw new Error(`Error finding item: ${error.message}`);
        }
    }
}

export default ProductModel;
