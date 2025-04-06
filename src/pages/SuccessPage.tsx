import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    setSessionId(session_id);
    
    if (session_id) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      navigate("/pricing");
    }
  }, [searchParams, navigate]);

  const handleManageBilling = async () => {
    if (!sessionId) return;
    
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:4242/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });
      
      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating portal session:', error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Header title="Payment Successful - Code Sage" />

      <main className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                Thank you for your subscription to Code Sage.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {loading ? (
                <p>Verifying your payment...</p>
              ) : (
                <p>
                  Your subscription has been activated. You now have full access to all
                  premium features.
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={handleManageBilling}
                disabled={loading || !sessionId}
              >
                Manage Billing
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;