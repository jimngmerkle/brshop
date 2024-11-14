import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import "./loginform.css";

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add state for password if required
  const apiUrl = 'https://brshop-y4bl.vercel.app/api'; // Update with your Vercel app’s base URL
  const navigate = useNavigate(); // Initialize useNavigate

  const checkEmail = async (email) => {
    try {
      // Make a POST request to the /api/check-email endpoint
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

      // Parse the JSON response
      const data = await response.json();
      console.log('data:', data);

      if (data.success) {
        toast.success(`Email ${email} successfully logged in`);
        exponea.identify(email);
        // Set login status in local storage
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          navigate("/"); // Redirect after a delay
        }, 1500); 
      } else {
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
    <div className="login-form">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <Link to="/reset-password">Forgot Password?</Link>
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>
        New User? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Loginform;