/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./config/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = async ({ name, email, password }) => {
    try {
      await axiosInstance.post("/register", { name, email, password });
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Registration failed";
      throw new Error(errorMsg);
    }

    // Auto login after successful register
    const loginRes = await login({ email, password });
    return loginRes;
  };

  const login = async ({ email, password }) => {
    let data;
    try {
      const res = await axiosInstance.post("/login", { email, password });
      data = res.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Login failed";
      throw new Error(errorMsg);
    }

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
