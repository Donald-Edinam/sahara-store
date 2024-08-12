// /api/services/paymentService.js

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (order) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: order.totalPrice * 100, // Stripe uses cents
            currency: 'usd',
            payment_method_types: ['card'],
            metadata: { orderId: order._id.toString() }
        });

        return { success: true, paymentIntent };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
