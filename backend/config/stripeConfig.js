// stripeConfig.js

import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with your secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-14', // Keep this up to date with the latest Stripe API version
});

// Additional Stripe configuration settings
const stripeConfig = {
  currency: 'usd', // Default currency for transactions
  paymentMethods: ['card'], // Default payment methods
};

export { stripe, stripeConfig };