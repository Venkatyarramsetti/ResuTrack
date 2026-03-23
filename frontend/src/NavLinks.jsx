import './NavLinks.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavLinks = ({ hoverClass = "hover-target", onLinkClick = () => {} }) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onLinkClick(); // Close dropdown if needed
  };

  return (
    <ul className="nav__list">
      <li className="nav__list-item">
        <Link to="/" className={hoverClass} onClick={onLinkClick}>Home</Link>
      </li>

      {!isLoggedIn && (
        <li className="nav__list-item">
          <Link to="/login" className={hoverClass} onClick={onLinkClick}>Login/SignUp</Link>
        </li>
      )}

      <li className="nav__list-item">
        <Link to="/about" className={hoverClass} onClick={onLinkClick}>FAQ/About Us</Link>
      </li>

      {isLoggedIn && (
        <>
          <li className="nav__list-item">
            <Link to="/resutrack" className={hoverClass} onClick={onLinkClick}>ResuTrack</Link>
          </li>
          <li className="nav__list-item">
            <Link to="/jobfinder" className={hoverClass} onClick={onLinkClick}>Job Finder</Link>
          </li>
          <li className="nav__list-item">
            <button onClick={handleLogout} className={`${hoverClass} logout-btn`}>
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
