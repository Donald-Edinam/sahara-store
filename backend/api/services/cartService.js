import CartModel from "../models/cartModel.js";
import mongoose from "mongoose";

const cartModel = new CartModel();

class CartService {
    async addProductToCart(userId, productData) {
        // Add a product to the user's cart
        const { productId, quantity } = productData;
        if (!userId || !productId || !quantity) {
            throw new Error('User ID, Product ID, and Quantity are required');
        }

        // Get the user's cart
        let cart = await cartModel.findByUserId(userId);
        console.log(cart)
        if (!cart) {
            // Create a new cart if the user doesn't have one
            cart = await cartModel.create({ userId, products: [{ productId, quantity }] });
        } else {
            // Add the product to the cart if it doesn't exist
            const productObjectId = new mongoose.Types.ObjectId(productId);
            console.log(productObjectId)
            const productIndex = cart.products.findIndex(product => product.productId.equals(productObjectId));
            if (productIndex === -1) {
                cart.products.push({ productId, quantity });
            } else {
                // Update the quantity if the product already exists
                cart.products[productIndex].quantity += parseInt(quantity, 10);
            }

            // Save the cart
            await cart.save();
        }
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
            console.log(cart);
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

    async cascadeDeleteProduct(productId) {
        if (!productId) {
            throw new Error('Product ID is required');
        }

        // Get all carts that contain the product
        const carts = await cartModel.findByProductId(productId);
        for (cart of carts) {
            // Remove the product from the cart
            cart.products = cart.products.filter(product => product.productId !== productId);
            await cart.save();
        }
    }
}

export default new CartService();