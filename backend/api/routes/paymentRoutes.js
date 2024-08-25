// Payment routes - Flutterwave
import express from 'express';
import PaymentController from '../controllers/paymentController.js';
import { authenticateToken, authorizeRole } from '../../auth/middleware/authMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/card', authenticateToken, authorizeRole, PaymentController.payWithCard);
paymentRouter.post('/webhook', PaymentController.webHook); // Flutterwave Webhook endpoint

export default paymentRouter;