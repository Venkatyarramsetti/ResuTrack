import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./AuthContext";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const menuRef = useRef(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;

    const toggleClass = () => {
      body.classList.toggle("nav-active");
    };

    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener("click", toggleClass);
    }

    return () => {
      if (menu) {
        menu.removeEventListener("click", toggleClass);
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {/* Top nav with unique hover effect */}
      <div className="top-nav">
        <NavLinks hoverClass="top-hover-target" />
      </div>

      <header className="cd-header">
        <div className="header-wrapper">
          <div className="logo-wrap">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover-target logout-btn">
                <span className="logout-icon">🔓</span> Logout
              </button>

            ) : (
              <Link to="/login" className="hover-target">
                <span>Login/Signup</span>
              </Link>
            )}
          </div>
          <div className="nav-but-wrap">
            <div
              ref={menuRef}
              className="menu-icon hover-target"
              role="button"
              tabIndex="0"
            >
              <span className="menu-icon__line menu-icon__line-left"></span>
              <span className="menu-icon__line"></span>
              <span className="menu-icon__line menu-icon__line-right"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Hidden side nav with original hover effect */}
      <div className="nav">
        <div className="nav__content">
          <NavLinks hoverClass="hover-target" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;