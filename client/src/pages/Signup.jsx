import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {

  // This will store the values of username, email, password
  const [formData, setFormData] = useState({});

  // This stores any error message from backend (ex: username already exists)
  const [error, setError] = useState("");

  // Used to show the loading button while sending data to backend
  const [loading, setLoading] = useState(false);

  // ✅ Needed for redirect after signup
  const navigate = useNavigate();

  // This function runs whenever a user types inside an input box
  const handleChange = (e) => {

    // Update formData object with new input values
    setFormData({
      ...formData,                     // keep previous values
      [e.target.id]: e.target.value,   // update the field (username/email/password)
    });
  };

  // This function runs when the user clicks the Sign Up button
  const handleSubmit = async (e) => {

    e.preventDefault(); // prevent page reload

    setLoading(true);   // show loading button
    setError("");       // clear previous error

    try {

      // Send form data to backend API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // tell backend we send JSON
        },
        body: JSON.stringify(formData),       // send username/email/password as JSON
      });

      // Read response from backend
      const data = await res.json();

      // If backend sends success:false → show error to user
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // If everything ok → stop loading
      setLoading(false);

      // ✅ Redirect to sign-in page
      navigate('/sign-in');

    } catch (err) {

      // If server is down / network error
      setError("Something went wrong");
      setLoading(false);
    }

  };

  return (
    <div id="signup-container">
      
      {/* Page Title */}
      <h1 id="signup-title">Sign Up</h1>

      {/* Signup Form */}
      <form id="signup-form" onSubmit={handleSubmit}>

        {/* Username Input */}
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />

        {/* Sign Up Button */}
        {/* Disabled when loading */}
        <button disabled={loading} id="signup-btn">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>

      </form>

      {/* Error Message (if exists) */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Footer with link to Sign In page */}
      <div id="signup-footer">
        <p>Have an account?</p>

        {/* Router Link */}
        <Link to="/sign-in" id="signin-link">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
