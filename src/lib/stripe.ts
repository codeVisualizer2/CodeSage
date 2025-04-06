// src/lib/stripe.ts - New file or update existing

import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

// Define your Stripe price IDs - make sure these match your server-side IDs
export const STRIPE_PLANS = {
  pro: {
    monthly: 'price_1ProMonthly', // Replace with your actual Stripe price IDs
    yearly: 'price_1ProYearly'
  },
  enterprise: {
    monthly: 'price_1EnterpriseMonthly',
    yearly: 'price_1EnterpriseYearly'
  }
};