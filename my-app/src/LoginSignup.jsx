import React, { useState } from "react";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setMessage(""); // Reset message when toggling between login and signup
  };

  const validate = () => {
    const newErrors = {};
    if (isSignup && !form.name.trim()) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.password) newErrors.password = "Password is required";
    if (isSignup && form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      const url = isSignup ? "http://localhost:2051/register" : "http://localhost:2051/login";
      const method = isSignup ? "POST" : "POST";

      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.text();
        if (res.ok) {
          setMessage(`${isSignup ? "Registered" : "Logged in"} successfully!`);
          // Redirect or take any other action on success
        } else {
          setMessage(data);
        }
      } catch (err) {
        setMessage("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <div className="input-container">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="input-field"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
        )}

        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input-field"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {isSignup && (
          <div className="input-container">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="input-field"
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isSignup ? "Register" : "Login"}
        </button>

        {loading && <p>Loading...</p>}
        {message && <p className="message">{message}</p>}

        <p className="switch-link" onClick={toggleMode}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;