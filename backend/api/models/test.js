import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';  // Import MongoMemoryServer
import ProductModel from './productModel.js';  // Import ProductModel  
import CartModel from './cartModel.js';

const runTest = async () => {
    // Setup in-memory MongoDB
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create an instance of ProductModel
    const productModel = new ProductModel();
    const cartModel = new CartModel();

    // Data to test
    const productData = {
        name: 'Smartphone',
        description: 'A latest model smartphone',
        price: 999,
        category: 'Electronics',
        stock: 20,
        imageUrl: 'http://example.com/image.jpg'
    };

    const cartData = { 
        userId: '1234567890',
        products: [
            {
                productId: '123456789012',
                quantity: 2
            }
        ]
    };

    try {
        // Create a new product
        const createdProduct = await productModel.create(productData);
        console.log('Created Product:', createdProduct);
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Cleanup
        await mongoose.disconnect();
        await mongoServer.stop();
    }

    try {
        // Create a new cart
        const createdCart = await cartModel.create(cartData);
        console.log('Created Cart:', createdCart);
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Cleanup
        await mongoose.disconnect();
        await mongoServer.stop();
    }
};

runTest();