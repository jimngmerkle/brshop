import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import { useAuth } from "../../utils/AuthContext"; 

const Registrationform = () => {
  const [email, setLocalEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = 'https://brshop-y4bl.vercel.app/api'; 
  const navigate = useNavigate(); 
  const { setIsLoggedIn, setEmail } = useAuth(); // Access the AuthContext to update login state and email

  const checkEmail = async (email) => {
    try {
      const payload = {
        customer_ids: {
          registered: email
        },
        attributes: [
          {
            type: 'id',
            id: 'registered'
          }
        ]
      };
      console.log('Sending request to /check-email with payload:', payload);

      // Make a POST request to the /api/check-email endpoint
      const response = await fetch(`${apiUrl}/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Parse the JSON response
      const data = await response.json();
      console.log('Response from /check-email:', data);

      if (data.success) {
        toast.error(`Email ${email} already exists in the database`);
        console.log(`Email ${email} already exists in the database`);
      } else if (response.status === 401) {
        toast.error('Unauthorized access. Please check credentials');
        console.log('Unauthorized access. Please check credentials');
      } else if (response.status === 404) {
        toast.success(`Email ${email} has been successfully registered`);
        console.log(`Email ${email} registered in the database`);
        exponea.identify(
          {
            'registered': email
          },
          {
            'first_name': first_name,
            'last_name': last_name
          });
        setIsLoggedIn(true); // Update global login state
        setEmail(email); // Set email in AuthContext
        setTimeout(() => {
          navigate("/"); // Redirect after a delay
        }, 1000);         
      } else {
        toast.error('An error occurred during registration');
        console.log('An error occurred during registration');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      toast.error('Error checking email');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Registering with email:', email); // Debug log
    checkEmail(email);
  };

  return (
    <section className="loginform">
      <div className="container-login">
        <div className="wrapper">
          <div className="heading-login">
            <h1>Sign Up</h1>
            <p>
              Already a user?{" "}
              <span>
                <Link to="/login">Login here</Link>
              </span>
            </p>
          </div>
          <form onSubmit={handleRegister} className="form" action="">
            <label className="label">
              Email
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setLocalEmail(e.target.value)}
              />
            </label>
            <label className="label">
              First name
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="label">
              Last name
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>                        
            <label className="label">
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="forgot-pass">
              By signing up you agree to our{" "}
              <span>
                <Link to="/termsNconditions">terms & conditions</Link>
              </span>
            </p>
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registrationform;