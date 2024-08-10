import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';  // Import MongoMemoryServer
import ProductModel from './productModel.js';  // Import ProductModel  

const runTest = async () => {
    // Setup in-memory MongoDB
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create an instance of ProductModel
    const productModel = new ProductModel();

    // Data to test
    const productData = {
        name: 'Smartphone',
        description: 'A latest model smartphone',
        price: 999,
        category: 'Electronics',
        stock: 20,
        imageUrl: 'http://example.com/image.jpg'
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
};

runTest();