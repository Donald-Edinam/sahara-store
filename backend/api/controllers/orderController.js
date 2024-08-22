import orderService from '../services/orderService.js';

class OrderController {
    static async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.user.userId, req.body);
            res.status(201).json(order);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async getOrders(req, res) {
        try {
            const orders = await orderService.getOrders(req.user.userId);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getOrderById(req, res) {
        try {
            const order = await orderService.getOrderById(req.user.userId, req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default OrderController;