import orderService from '../services/orderService';
import paymentService from '../services/paymentService';

export const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.user.id, req.body);
        const paymentResult = await paymentService.processPayment(order);
        
        if (paymentResult.success) {
            order.paymentStatus = 'Paid';
            await order.save();
            res.status(201).json(order);
        } else {
            order.paymentStatus = 'Failed';
            await order.save();
            res.status(400).json({ message: 'Payment failed', error: paymentResult.error });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
