import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import LoginSignup from './LoginSignup';
import ImageAnalyzer from './ImageAnalyzer';
import About from './about';
import Jobs from './Jobs'; //
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import Apply from './Apply';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<About />} /> {/* FAQ uses About component */}
          <Route path="/apply" element={<Apply />} /> {/* FAQ uses About component */}

          {/* Protected Routes */}
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
      </Router>
    </AuthProvider>
  );
};

export default App;