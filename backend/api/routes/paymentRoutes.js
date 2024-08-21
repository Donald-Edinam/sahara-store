// Payment routes - Flutterwave
import express from 'express';
import PaymentController from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/card', PaymentController.payWithCard);
paymentRouter.post('/webhook', PaymentController.webhook); // Webhook endpoint

export default paymentRouter;
