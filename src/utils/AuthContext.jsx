import React, { createContext, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthContext = createContext();

// Create a provider to wrap the app and provide global state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    console.log('User logged out.');
    setIsLoggedIn(false);
    setEmail(''); 
    exponea.anonymize();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};