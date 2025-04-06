// src/pages/CancelPage.tsx - New file

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Header from "@/components/layout/Header";

const CancelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header title="Payment Cancelled - Code Sage" />

      <main className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
              <CardDescription>
                Your subscription payment was not completed.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                No worries! You can try again whenever you're ready or contact our
                support team if you need any assistance.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/")}>
                Go Home
              </Button>
              <Button onClick={() => navigate("/pricing")}>
                Back to Pricing
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CancelPage;