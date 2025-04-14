import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import LoginSignup from './LoginSignup';
import ImageAnalyzer from './ImageAnalyzer';
import About from './About';
import Jobs from './Jobs';
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import Apply from './Aply.jsx';
import BackgroundVideo from './BackgroundVideo.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* ✅ Background video for the entire app */}
        <BackgroundVideo />

        <div className="app-container">
          <Navbar />
          <div className="video-overlay-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<About />} />
              <Route path="/Apply" element={<Apply />} />
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
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
