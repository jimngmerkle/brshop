import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// Create a provider to wrap the app and provide global state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);