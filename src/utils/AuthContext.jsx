import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Create AuthContext
const AuthContext = createContext();

// Create a provider to wrap the app and provide global state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(''); // Add email state
  const navigate = useNavigate(); // Initialize useNavigate

  const logout = () => {
    console.log('User logged out.');
    setIsLoggedIn(false);
    setEmail(''); // Clear email on logout
    exponea.anonymize();
    navigate('/'); // Redirect to home page
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