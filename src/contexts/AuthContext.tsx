import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For now, we'll just simulate a successful login
    setUser({
      id: "1",
      name: "Demo User",
      email: email,
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to create a new user
    // For now, we'll just simulate a successful signup
    setUser({
      id: "1",
      name: name,
      email: email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
