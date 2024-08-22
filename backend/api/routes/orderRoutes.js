import express from 'express';
import orderController from '../controllers/orderController.js';
import { authenticateToken, authorizeRole } from '../../auth/middleware/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.post('/orders', authenticateToken, authorizeRole ,orderController.createOrder);
orderRouter.get('/orders', authenticateToken, authorizeRole, orderController.getOrders);
orderRouter.get('/orders/:id', authenticateToken, authorizeRole, orderController.getOrderById);

export default orderRouter;