import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./AuthContext";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const body = document.body;

    if (isMenuOpen) {
      body.classList.add("nav-active");
    } else {
      body.classList.remove("nav-active");
    }

    return () => {
      body.classList.remove("nav-active");
    };
  }, [isMenuOpen]);

  return (
    <div>
      <div className="top-nav">
        <NavLinks hoverClass="top-hover-target" />
      </div>

      <header className="cd-header">
        <div className="header-wrapper">
          <div className="logo-wrap">
            <span className="logo-text">ResuTrack</span>
          </div>
          <div className="nav-but-wrap">
            <div
              ref={menuRef}
              className={`menu-icon hover-target ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              role="button"
              tabIndex="0"
            >
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="nav">
        <div className={`nav__content ${isMenuOpen ? "visible" : ""}`}>
          <NavLinks hoverClass="hover-target" animated />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
