import React from "react";
import { Moon, Sun, Code, LogIn, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../ui/theme-provider";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Code sage" }: HeaderProps) => {
  // This is a placeholder for theme functionality
  // In a real implementation, you would use a theme context or similar
  const { theme, setTheme } = useTheme() || {
    theme: "light",
    setTheme: () => {},
  };
  const { user, isAuthenticated, logout } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full h-16 px-4 border-b bg-background flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Code className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:inline-block">
              Hello, {user?.name}
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login?tab=signup">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
