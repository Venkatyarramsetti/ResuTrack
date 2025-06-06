import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import LoginSignup from "./LoginSignup";
import ImageAnalyzer from "./ImageAnalyzer";
import About from "./About";
import Jobs from "./Jobs";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import Aply from "./Aply";
import BackgroundVideo from "./BackgroundVideo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <BackgroundVideo />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="app-container">
          <Navbar />
          <div className="video-overlay-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/register" element={<LoginSignup />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<About />} />
              <Route path="/apply" element={<Aply />} />
              <Route
                path="/resutrack"
                element={
                  <ProtectedRoute>
                    <ImageAnalyzer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobfinder"
                element={
                  <ProtectedRoute>
                    <Jobs />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
