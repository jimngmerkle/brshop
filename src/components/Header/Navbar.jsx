import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from local storage or an API call
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <p>order products?</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
      <nav>
        <div>
          <h1>This is a test shop</h1>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">All Products</Link>
          </li>
          {isLoggedIn ? (
            <li onClick={handleLogout}>Log Out</li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <Link to="/register">Registration</Link>
          </li>
          {/* 
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          */}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;