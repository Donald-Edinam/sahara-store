import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ProductModel from './api/models/productModel.js';  // Adjust the path if needed

// Resolve the directory path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection URI
const mongoURI = 'mongodb+srv://ibrahim:ibra12aji@cluster0.430wd.mongodb.net/Saharastore?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Load and parse the product.json file
const productsFilePath = path.join(__dirname, 'product.json');

// Debugging: Print the file path
console.log('Product file path:', productsFilePath);

let productsData;
try {
    productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
} catch (error) {
    console.error('Error reading or parsing product.json:', error);
    process.exit(1); // Exit the process if there is an error
}

// Update the database
async function updateDatabase() {
    try {
        for (const product of productsData) {
            // Check if the product already exists
            const existingProduct = await ProductModel.findOne({ name: product.name });
            if (existingProduct) {
                // Update the existing product
                await ProductModel.update(existingProduct._id, product);
                console.log(`Updated: ${product.name}`);
            } else {
                // Insert a new product
                await ProductModel.create(product);
                console.log(`Inserted: ${product.name}`);
            }
        }
        console.log('Database update complete');
    } catch (error) {
        console.error('Error updating the database:', error);
    } finally {
        mongoose.connection.close();
    }
}

updateDatabase();