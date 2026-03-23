/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { getApiUrl } from "./config/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = async ({ name, email, password }) => {
    const res = await fetch(getApiUrl("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Register error response:", errorText);
      let errorMsg = "Registration failed";
      try {
        const errorJson = JSON.parse(errorText);
        errorMsg = errorJson.error || errorMsg;
      } catch {
        errorMsg = "Registration failed";
      }
      throw new Error(errorMsg);
    }

    // Auto login after successful register
    const loginRes = await login({ email, password });
    return loginRes;
  };

  const login = async ({ email, password }) => {
    const res = await fetch(getApiUrl("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Login error response:", errorText);
      let errorMsg = "Login failed";
      try {
        const errorJson = JSON.parse(errorText);
        errorMsg = errorJson.error || errorMsg;
      } catch {
        errorMsg = "Login failed";
      }
      throw new Error(errorMsg);
    }

    const data = await res.json();
    setUser(data.user);
    localStorage.setItem("authUser", JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const isLoggedIn = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
