import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';  // Import MongoMemoryServer
import ProductModel from './productModel.js';  // Import ProductModel  
import CartModel from './cartModel.js';
import UserModel from './userModel.js';

const runTest = async () => {
    // Setup in-memory MongoDB
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useUnifiedTopology: true });

    // Create an instance of ProductModel
    const productModel = new ProductModel();
    const cartModel = new CartModel();
    const userModel = new UserModel();

    // Data to test
    const productData = {
        name: 'Smartphone',
        description: 'A latest model smartphone',
        price: 999,
        category: 'Electronics',
        stock: 20,
        imageUrl: 'http://example.com/image.jpg'
    };

    const userData = {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password',
        phone: '1234567890',
    };

    let createdUser;
    try {
        // create a new user
        createdUser = await userModel.create(userData);
        console.log('Created User:', createdUser);

        const user = await userModel.getUserByEmail(createdUser.email);
        console.log('User by email:', user);
    } catch (error) {
        console.error('Error during test:', error);
    }
    
    let createdProduct;
    try {
        // Create a new product
        createdProduct = await productModel.create(productData);
        console.log('Created Product:', createdProduct);
    } catch (error) {
        console.error('Error during test:', error);
    }

    const cartData = { 
        userId: createdUser._id,
        products: [
            {
                productId: createdProduct._id,
                quantity: 2
            }
        ]
    };
    try {
        // Create a new cart
        const createdCart = await cartModel.create(cartData);
        console.log('Created Cart:', createdCart);
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Stop the MongoDB server
        await mongoose.disconnect();
        await mongoServer.stop();  // Stop the in-memory MongoDB server
    }
};

runTest();