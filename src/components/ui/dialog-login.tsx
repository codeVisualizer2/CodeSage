import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  open,
  onOpenChange,
  message = "You need to be logged in to access this feature.",
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    onOpenChange(false);
  };

  const handleContinueWithoutAccount = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Button onClick={handleLogin}>Sign In / Create Account</Button>
          <Button variant="outline" onClick={handleContinueWithoutAccount}>
            Continue Without Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
