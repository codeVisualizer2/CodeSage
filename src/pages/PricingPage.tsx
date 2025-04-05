import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
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
  const [billingCycle, setBillingCycle] = useState<string>("monthly");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = (plan: string) => {
    if (isAuthenticated) {
      console.log(`Selected plan: ${plan}, billing cycle: ${billingCycle}`);
    } else {
      navigate("/login");
    }
  };

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
              <Button className="w-full bg-black hover:bg-black/90" onClick={() => handleGetStarted("free")}>
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
              <Button className="w-full bg-black hover:bg-black/90" onClick={() => handleGetStarted("pro")}>
                Get Started
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
              <Button className="w-full bg-black hover:bg-black/90" onClick={() => handleGetStarted("enterprise")}>
                Get Started
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