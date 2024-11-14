import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
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
     <header className="container">
     <div className="menu-items">
     <div className="categories">
      <div onClick={() => setMobileMenu(false)}>
        <h1>This is a test shop</h1>
      </div>
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
      </div>
      <button onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? "Close Menu" : "Open Menu"}
      </button>
      {mobileMenu ? (
        <div>
          <ul>
            <li>
              <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMobileMenu(false)}>All Products</Link>
            </li>
            {isLoggedIn ? (
              <li onClick={() => { handleLogout(); setMobileMenu(false); }}>Log Out</li>
            ) : (
              <li>
                <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
              </li>
            )}
            <li>
              <Link to="/register" onClick={() => setMobileMenu(false)}>Registration</Link>
            </li>
          </ul>
        </div>
      ) : null}
      </header>
    </>
  );
};

export default Navbar;