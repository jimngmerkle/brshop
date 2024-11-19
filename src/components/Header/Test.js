To make sure that the navbar switches between "Logout" and "Login" dynamically when clicked, you need to update the useState hook to handle the menu state change. The key thing to focus on is that the logout button should update the login state as well. Here’s an updated version of your Navbar component:

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext"; // Import the AuthContext

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Access login state and logout function

  const handleLogout = () => {
    logout(); // Call the logout function
    setMobileMenu(false); // Close the mobile menu after logout
  };

  return (
    <>
      <header className="container">
        <div className="menu-items">
          <div className="categories">
            <span className="fa-solid fa-border-all"></span>
            <h4 className="head-categories">This is a test shop</h4>
          </div>
          <ul
            className={
              mobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
            }
            onClick={() => setMobileMenu(false)}
          >
            <li>
              <Link aria-label="Home" className="link-hover" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                aria-label="All Products"
                className="link-hover"
                to="/all-products"
              >
                All Products
              </Link>
            </li>
            {!isLoggedIn ? ( // Show "Login" if not logged in
              <li>
                <Link aria-label="Login" className="link-hover" to="/login">
                  Login
                </Link>
              </li>
            ) : ( // Show "Logout" if logged in
              <li>
                <button
                  aria-label="Logout"
                  className="link-hover logout-btn"
                  onClick={handleLogout} // Call the handleLogout function when clicked
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <Link
                aria-label="Registration"
                className="link-hover"
                to="/registration"
              >
                Registration
              </Link>
            </li>
          </ul>
        </div>
        <button
          aria-label="Menu bar"
          className="toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <i className="fas fa-times close home-btn"></i>
          ) : (
            <i className="fa fa-bars open"></i>
          )}
        </button>
      </header>
    </>
  );
};

export default Navbar;

Changes made:

1. handleLogout function: A new handleLogout function has been added to call the logout function and close the mobile menu at the same time.


2. Mobile menu closing: After logging out, the menu will automatically close by setting setMobileMenu(false).



This ensures that once a user logs out, the "Logout" button is replaced with the "Login" button.

              
