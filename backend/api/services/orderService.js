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

        if (!order || typeof order !== 'object') {
            return { status: 400, response: 'Invalid data provided for creating the order' };
        }

        

        if (!order.product) {
            return { status: 400, response: 'Invalid product data provided for creating the order' };
        }

        const { product: { productId, quantity }, price } = order;
        if (!productId || !quantity || !price) {
            return { status: 400, response: 'productId, quantity, and price are required' };
        }

        const product = await productModel.findById(productId);
        // const product = products.filter(product => product._id === productId);
        if (!product) {
            return { status: 404, response: 'Product not found'};
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
            return { status: 201, response };
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

    async updateOrder(id, orderUpdateDetails) {
        if (!id) {
            throw new Error('id is required');
        }

        if (!orderUpdateDetails && typeof orderUpdateDetails !== 'object') {
            return { status: 400, response: 'Invalid data provided for updating the order' };
        }

        if (orderUpdateDetails.products) {
            const { productId, quantity } = orderUpdateDetails.products;
            if (!productId || !quantity) {
                return { status: 400, response: 'productId and quantity are required' };
            }
        }

        if (orderUpdateDetails.totalPrice) {
            return { status: 400, response: 'totalPrice cannot be updated' };
        }

        try {
            const order =  await this.orderModel.update(id, orderUpdateDetails);
            if (!order) {
                return { status: 404, response: 'Order not found' };
            }

            return { status: 200, response: order };
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