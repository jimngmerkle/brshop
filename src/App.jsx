import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../src/utils/AuthContext"; // Import the AuthContext

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Access login state and logout function

  const handleLogout = () => {
    logout();
    setMobileMenu(false);
  };

  return (
    <>
      <nav>
        <div className="navbar">
          <div className="navbar-brand">
            This is a test shop
          </div>
          <div className="navbar-menu" onClick={() => setMobileMenu(false)}>
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
            {!isLoggedIn ? ( // Show "Login" if not logged in
              <Link to="/login">Login</Link>
            ) : ( // Show "Logout" if logged in
              <button onClick={handleLogout}>Logout</button>
            )}
            <Link to="/register">Registration</Link>
          </div>
          <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
      {mobileMenu ? (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
          <Link to="/products" onClick={() => setMobileMenu(false)}>All Products</Link>
          {!isLoggedIn ? (
            <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
          <Link to="/register" onClick={() => setMobileMenu(false)}>Registration</Link>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;