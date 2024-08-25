import CartModel from "../models/cartModel.js";
import mongoose from "mongoose";
import { productModel } from "./productService.js";
const cartModel = new CartModel();

class CartService {
    async addProductToCart(userId, productData) {
        // Add a product to the user's cart
        const { productId, quantity } = productData;
        if (!userId || !productId || !quantity) {
            throw new Error('User ID, Product ID, and Quantity are required');
        }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        let cart = await cartModel.findByUserId(userId);
        let existingQuantity = 0;
    
        if (cart) {
            // Check if the product already exists in the cart
            const productInCart = cart.products.find(p => p.productId.equals(productId));
            if (productInCart) {
                existingQuantity = productInCart.quantity;
            }
        }

        if (product.stock < parseInt(quantity, 10) + existingQuantity) {
            throw new Error('Insufficient stock');
        }

        if (!cart) {
            // Create a new cart if the user doesn't have one

            cart = await cartModel.create({ userId, products: [{ productId, quantity }] });
            await cart.save();
        } else {
            // Add the product to the cart if it doesn't exist
            const productObjectId = new mongoose.Types.ObjectId(productId);
            const productIndex = cart.products.findIndex(product => product.productId.equals(productObjectId));
            if (productIndex === -1) {
                cart.products.push({ productId, quantity });
            } else {
                // Update the quantity if the product already exists
                cart.products[productIndex].quantity += parseInt(quantity, 10);
            }
            await cart.save();
        }

        // Save the cart to the database
        return cart;
    }

    async getCartByUserId(id) {
        // Get cart from the database
        if (!id) {
            throw new Error('User ID is required');
        }

        // Get the cart from the database
        try {
            const cart = await cartModel.findByUserId(id);
            if (!cart) {
                return {};
            }

            const totals = await this.calculateCartTotals(cart.products);
            return { products: cart.products, ...totals };
        } catch (error) {
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }

    async calculateCartTotals(products) {
        // Calculate the total price and quantity of products in the cart
        let total = 0;
        let quantity = 0;

        products.forEach(product => {
            total += product.productId.price * product.quantity;
            quantity += product.quantity;
        });

        return { total, quantity };
    }

    async removeFromCart(userId, productId) {
        if (!userId || !productId) {
            throw new Error('User ID and Product ID are required');
        }

        const cart = await cartModel.findByUserId(userId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        const ObjectId = new mongoose.Types.ObjectId(productId);
        const products = cart.products.filter(product => !product.productId.equals(ObjectId));
        cart.products = products;
        await cart.save();
        return cart;
    }

    async removeAllProducts(userId) {
        // Clear the user's cart
        if (!userId) {
            throw new Error('User ID is required');
        }

        const cart = await cartModel.findByUserId(userId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.products = [];
        await cart.save();
        return cart;
    }

    async cascadeDeleteProduct(productId) {
        if (!productId) {
            throw new Error('Product ID is required');
        }

        // Get all carts that contain the product
        const carts = await cartModel.findByProductId(productId);
        const objectId = new mongoose.Types.ObjectId(productId);
        for (const cart of carts) {
            // Remove the product from the cart
            cart.products = cart.products.filter(product => !product.productId.equals(objectId));
            await cart.save();
        }
    }
}

export default new CartService();