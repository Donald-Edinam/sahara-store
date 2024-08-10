import BaseModule from './baseModel';

class ProductModel extends BaseModel {
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
        }
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
        imageUrl: {
            type: String,
            required: false,
            trim: true
        }
        super(schemaDefinition, 'Product');
    }
}

export default ProductModel;