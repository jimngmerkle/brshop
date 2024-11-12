import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./loginform.css";

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add state for password
  const apiUrl = 'https://brshop-y4bl.vercel.app';
  // const apiUrl = 'http://localhost:3000';

  const checkEmail = async (email) => {
    try {
      const response = await fetch(`${apiUrl}/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_ids: {
            registered: email
          },
          attributes: [
            {
              type: 'id',
              id: 'registered'
            }
          ]
        })
      });
      const data = await response.json();
      console.log('data: ',data);

      if (data.success) {
        console.log(`Email ${email} exists in the database`);
        toast.success(`Email ${email} exists in the database`);
      } else {
        console.log(`Email ${email} does not exist in the database`);
        toast.error(`Email ${email} does not exist in the database`);
      }
    } catch (error) {
      console.error('Error checking email:', error);
      toast.error('Error checking email');
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    checkEmail(email);
  };

  return (
    <>
      <section className="loginform">
        <div className="container-login">
          <div className="wrapper">
            <div className="heading-login">
              <h1>Sign In</h1>
              <p>
                New User?{" "}
                <span>
                  <Link to="/registration">Create an account</Link>
                </span>
              </p>
            </div>
            <form onSubmit={handleLogin} className="form" action="">
              <label className="label">
                Email
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="label">
                Password
                <input
                  type="password" // Set type to password to mask input
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                />
              </label>
              <p className="forgot-pass">
                Forgot Password?{" "}
                <span>
                  <Link to="/forgot-password">Click here to reset</Link>
                </span>
              </p>
              <button className="submit-btn">Sign In</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loginform;
