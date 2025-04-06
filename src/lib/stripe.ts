import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

export const STRIPE_PLANS = {
  pro: {
    monthly: 'price_1RAe05FP64nqjfgrtrateli0', 
  },
  enterprise: {
    monthly: 'price_1RAkxLFP64nqjfgr3M98P0ck',
  }
};

