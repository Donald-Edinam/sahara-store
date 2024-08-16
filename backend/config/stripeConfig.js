// stripeConfig.js

import Stripe from 'stripe';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-14', // Update to the latest Stripe API version as needed
});

// set other configuration settings
const stripeConfig = {
  currency: 'usd', // Default currency for transactions
  paymentMethods: ['card'], // Default payment methods
};

export { stripe, stripeConfig };