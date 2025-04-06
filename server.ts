import express from 'express';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil' 
});

const STRIPE_PLANS = {
  pro: {
    monthly: 'price_1RAe05FP64nqjfgrtrateli0',
  },
  enterprise: {
    monthly: 'price_1RAkxLFP64nqjfgr3M98P0ck',
  }
};

const app = express();
const YOUR_DOMAIN = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com' 
  : 'http://localhost:5173'; 

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create-checkout-session', express.json(), async (req: Request, res: Response) => {
  try {
    const { planType, billingCycle, userId, email } = req.body;
    const priceId = STRIPE_PLANS[planType.toLowerCase()]?.[billingCycle];
    
    if (!priceId) {
      res.status(400).json({ error: 'Invalid plan type or billing cycle' });
      return;
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

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/create-portal-session', express.json(), async (req: Request, res: Response) => {
  try {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    if (!checkoutSession.customer) {
      res.status(400).json({ error: 'No customer found' });
      return;
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

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  
  let event: any;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } else {
      event = req.body;
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      

      break;
      
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      break;
  }

  res.json({ received: true });
});

const port = process.env.PORT || 4242;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
