import React from "react";
import { Moon, Sun, Code } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../ui/theme-provider";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Code Stage" }: HeaderProps) => {
  // This is a placeholder for theme functionality
  // In a real implementation, you would use a theme context or similar
  const { theme, setTheme } = useTheme() || {
    theme: "light",
    setTheme: () => {},
  };

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
      </div>
    </header>
  );
};

export default Header;
