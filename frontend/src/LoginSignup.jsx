import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./LoginSignup.css";

const LoginSignup = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname === "/register";
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: isRegister
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
    validationSchema: Yup.object(
      isRegister
        ? {
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email required"),
            password: Yup.string().min(6, "Minimum 6 characters").required("Password required"),
          }
        : {
            email: Yup.string().email("Invalid email").required("Email required"),
            password: Yup.string().min(6, "Minimum 6 characters").required("Password required"),
          }
    ),
    onSubmit: async (values) => {
      try {
        if (isRegister) {
          await register(values);
          toast.success("Registered successfully! Please login.");
          navigate("/login"); // Redirect to login after registration
        } else {
          await login(values);
          toast.success("Login successful!");
          navigate("/"); // Redirect to home after login
        }
      } catch (err) {
        toast.error(err.message || "Error occurred");
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={formik.handleSubmit}>
          {isRegister && (
            <div className="input-container">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input-field"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>
          )}
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div className="input-container" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input-field"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🔓" : "🔒"}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <button type="submit" className="submit-btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="toggle-link">
          <p>
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              type="button"
              onClick={() => navigate(isRegister ? "/login" : "/register")}
              className="link-button"
            >
              {isRegister ? "Login" : "Register"} here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
