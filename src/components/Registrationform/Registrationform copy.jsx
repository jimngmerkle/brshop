import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Registrationform = () => {
  const [email, set_email] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [password, set_password] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    // Use the Exponea SDK to update user information
    exponea.update({
      email: email || '', // Replace with actual email input if available
      first_name: first_name || '',
      last_name: last_name || ''
    });

    exponea.identify(
      {
        'registered':email
      },
      {
        'first_name':first_name,
        'last_name':last_name
      },
      function(){
        toast.success("Registration successful!");
      },
      function(){
        toast.error("Registration failed.");
      },
      false
    );

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
                onChange={(e) => set_email(e.target.value)}
              />
            </label>
            <label className="label">
              First name
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => set_first_name(e.target.value)}
              />
            </label>
            <label className="label">
              Last name
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => set_last_name(e.target.value)}
              />
            </label>                        
            <label className="label">
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => set_password(e.target.value)}
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
