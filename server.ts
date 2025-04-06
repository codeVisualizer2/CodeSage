// server.ts - Update with your domain and environment variables

import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Stripe with your secret key from env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

// Define your Stripe price IDs
const STRIPE_PLANS = {
  pro: {
    monthly: 'price_1ProMonthly', // Replace with your actual price IDs
    yearly: 'price_1ProYearly'
  },
  enterprise: {
    monthly: 'price_1EnterpriseMonthly',
    yearly: 'price_1EnterpriseYearly'
  }
};

const app = express();
const YOUR_DOMAIN = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com' 
  : 'http://localhost:5173'; // Vite's default port

// Middleware setup
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create Checkout Session - Updated to handle your plans
app.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { planType, billingCycle, userId, email } = req.body;
    
    // Get the price ID based on the plan and billing cycle
    const priceId = STRIPE_PLANS[planType.toLowerCase()]?.[billingCycle];
    
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan type or billing cycle' });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      customer_email: email,
      metadata: { userId, planType, billingCycle },
    });

    // Return the session ID for client-side redirect
    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create Portal Session for managing subscriptions
app.post('/create-portal-session', async (req: Request, res: Response) => {
  try {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    if (!checkoutSession.customer) {
      return res.status(400).json({ error: 'No customer found' });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: `${YOUR_DOMAIN}/account`,
    });

    res.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint for handling Stripe events
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  
  let event: Stripe.Event;

  try {
    // Get webhook secret from environment variable
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      // Verify webhook signature and extract the event
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } else {
      // If no webhook secret, assume the request body is the event
      event = req.body as Stripe.Event;
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  console.log('Processing event:', event.type);

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Here you would update your database with the subscription information
      // For example, updating a user's subscription status in Supabase
      console.log('Subscription successful for session:', session.id);
      console.log('Customer:', session.customer);
      console.log('Metadata:', session.metadata);
      
      // You could make API calls to your database here
      break;
      
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription status:', subscription.status);
      
      // Update the subscription status in your database
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

// Start the server
const port = process.env.PORT || 4242;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;