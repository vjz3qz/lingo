// Header.js
import React from "react";
import "../styles/Header.css";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = ({ user }) => {
  return (
    <header className="top-bar">
      <div className="logo-container">
        <Logo className="logo" />
        <span className="version-info">Ver 1.0 Mar 23</span>
      </div>

      {/* <nav className="navigation">
        <ul>
          <li><a href="/upgrade">Upgrade Plan</a></li>
          <li><a href="/help">Help</a></li>
          <li><a href="/api">API</a></li>
        </ul>
      </nav> */}

      <div className="user-info">
        {/* <span className="user-name">{user.name}</span> */}
      </div>
    </header>
  );
};

export default Header;
