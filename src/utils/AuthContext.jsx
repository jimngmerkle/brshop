import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// Create a provider to wrap the app and provide global state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Add a logout function that updates the isLoggedIn state
  const logout = () => {
    setIsLoggedIn(false); // Set the state to false to indicate that the user is logged out
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);