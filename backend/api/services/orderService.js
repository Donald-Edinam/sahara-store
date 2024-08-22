import OrderModel from "../models/orderModel.js";
import { productModel } from "./productService.js";

class OrderService {
    constructor() {
        this.orderModel = new OrderModel();
    }

    async createOrder(userId, order) {
        if (!userId) {
            throw new Error('userId is required');
        }

        const { product: { productId, quantity }, price } = order;
        if (!userId || !productId || !quantity || !price) {
            throw new Error('productId, quantity, and price are required');
        }

        const product = await productModel.findById(productId);
        // const product = products.filter(product => product._id === productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const totalPrice = parseInt(price) * parseInt(quantity);
        const orderData = {
            userId,
            products: [{ productId, quantity }],
            totalPrice,
            paymentStatus: 'Pending'
        };
        try {
            const response = await this.orderModel.create(orderData);
            return response;
        } catch(error) {
            console.log(error);
            throw new Error(`Error creating order: ${error.message}`);
        }
    }

    async getOrders(userId) {
        if (!userId) {
            throw new Error('userId is required');
        }

        try {
            return await this.orderModel.find({ userId });
        } catch(error) {
            console.log(error);
            throw new Error(`Error getting orders: ${error.message}`);
        }
    }

    async getOrderById(userId, id) {
        if (!id) {
            throw new Error('id is required');
        }

        if (!userId) {
            throw new Error('userId is required');
        }

        try {
            return await this.orderModel.findById(id);
        }
        catch(error) {
            console.log(error);
            throw new Error(`Error getting order: ${error.message}`);
        }
    }

    async updateOrder(id, order) {
        if (!id) {
            throw new Error('id is required');
        }

        if (!order && typeof order !== 'object') {
            throw new Error('Invalid data provided for updating the document');
        }

        if (order.products) {
            const { productId, quantity } = order.products;
            if (!productId || !quantity) {
                throw new Error('productId and quantity are required');
            }
        }

        if (order.price) {
            throw new Error('price cannot be updated');
        }

        try {
            return await this.orderModel.update(id, order);
        } catch(error) {
            console.log(error);
            throw new Error(`Error updating order: ${error.message}`);
        }
    }

    async deleteOrder(id) {
        if (!id) {
            throw new Error('id is required');
        }
        try {
            return await this.orderModel.delete(id);
        } catch(error) {
            console.log(error);
            throw new Error(`Error deleting order: ${error.message}`);
        }
    }
}

export default new OrderService();