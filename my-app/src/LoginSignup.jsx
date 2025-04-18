import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { useAuth } from "./AuthContext";

const LoginSignup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setMessage("");
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    resetForm();
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
      return;
    }

    setLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/${isSignup ? "register" : "login"}`;


    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.text();

      if (res.ok) {
        if (isSignup) {
          // ✅ Registration succeeded – switch to login mode
          setMessage("✅ Registered successfully! Please login.");
          setIsSignup(false);
          setForm({
            name: "",
            email: form.email, // optionally keep the email pre-filled
            password: "",
            confirmPassword: "",
          });
        
        } else {
          login();
          setMessage("✅ Logged in successfully!");
          setTimeout(() => {
            navigate("/resutrack");
          }, 500);
        }
      } else {
        setMessage(data || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
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
              autoComplete="new-name"
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
            autoComplete="new-email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-container password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
            autoComplete="new-password"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🔓" : "🔒"}
          </span>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {isSignup && (
          <div className="input-container password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="input-field"
              autoComplete="new-password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? "🔓" : "🔒"}
            </span>
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading
            ? isSignup
              ? "Registering..."
              : "Logging in..."
            : isSignup
            ? "Register"
            : "Login"}
        </button>

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
