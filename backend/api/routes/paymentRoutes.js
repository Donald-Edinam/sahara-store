// routes/paymentRoutes.js

import express from 'express';
import { stripe } from '../config/stripeConfig.js';

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // amount in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;