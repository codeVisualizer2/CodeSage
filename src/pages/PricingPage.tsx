// src/pages/PricingPage.tsx - Update with Stripe integration

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import { stripePromise } from '../lib/stripe';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PricingPage: React.FC = () => {
  // Start of new state variables
  const [billingCycle, setBillingCycle] = useState<string>("monthly");
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  // End of new state variables
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Start of new function
  const handleGetStarted = async (plan: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Handle free plan separately
    if (plan === "free") {
      console.log(`Free plan selected`);
      return;
    }

    // Show loading state for the clicked button
    setIsLoading({ ...isLoading, [plan]: true });

    try {
      const stripe = await stripePromise;
      
      // Make a request to our server to create a checkout session
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: plan,
          billingCycle,
          userId: user?.id,
          email: user?.email,
        }),
      });
      
      const session = await response.json();
      
      if (session.error) {
        console.error('Error creating session:', session.error);
        return;
      }

      // If we get a session URL, redirect directly
      if (session.url) {
        window.location.href = session.url;
        return;
      }

      // Otherwise use redirectToCheckout (older method)
      if (session.id && stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        
        if (result.error) {
          console.error('Stripe redirect error:', result.error);
        }
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsLoading({ ...isLoading, [plan]: false });
    }
  };
  // End of new function

  return (
    <div className="min-h-screen bg-background">
      <Header title="Pricing - Code Sage" />

      <main className="container px-4 py-12 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works for you
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Tabs
            defaultValue="monthly"
            value={billingCycle}
            onValueChange={setBillingCycle}
            className="w-[300px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly <Badge variant="outline">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card className="flex flex-col border-black">
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>For learning and experimentation</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Free</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-medium mb-4">Includes:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Limited algorithm visualizations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Basic code editor</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Community support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-black hover:bg-black/90" 
                onClick={() => handleGetStarted("free")}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col border-black">
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For serious learners and professionals</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle === "monthly" ? "20" : "16"}
                </span>
                <span className="text-muted-foreground ml-1">
                  /{billingCycle === "monthly" ? "month" : "month, billed annually"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-medium mb-4">Everything in Free, plus:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Unlimited algorithm visualizations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Advanced code editor</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-black hover:bg-black/90" 
                onClick={() => handleGetStarted("pro")}
                disabled={isLoading.pro}
              >
                {isLoading.pro ? 'Processing...' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col border-black">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>For teams and organizations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${billingCycle === "monthly" ? "50" : "40"}
                </span>
                <span className="text-muted-foreground ml-1">
                  /user/{billingCycle === "monthly" ? "month" : "month, billed annually"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-medium mb-4">Everything in Pro, plus:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Custom algorithm support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-black hover:bg-black/90" 
                onClick={() => handleGetStarted("enterprise")}
                disabled={isLoading.enterprise}
              >
                {isLoading.enterprise ? 'Processing...' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Questions about enterprise security, procurement, or custom contracts?
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;