import './NavLinks.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

const NavLinks = ({ hoverClass = "hover-target" }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="nav-links-wrapper">
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link to="/" className={hoverClass}>Home</Link>
        </li>

        {!isLoggedIn && (
          <li className="nav__list-item">
            <Link to="/login" className={hoverClass}>Login/SignUp</Link>
          </li>
        )}

        {isLoggedIn && (
          <>
            <li className="nav__list-item">
              <Link to="/resutrack" className={hoverClass}>ResuTrack</Link>
            </li>
            <li className="nav__list-item">
              <Link to="/jobfinder" className={hoverClass}>Job Finder</Link>
            </li>
          </>
        )}

        <li className="nav__list-item">
          <Link to="/about" className={hoverClass}>FAQ/About Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;