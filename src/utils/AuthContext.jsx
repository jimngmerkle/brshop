import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// Create a provider to wrap the app and provide global state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("AuthProvider rendered. isLoggedIn:", isLoggedIn);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth called. Context:", context);
  return context;
};