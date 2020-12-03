import React from "react";
import logo from "../../assets/logo/logo.svg";
import "./Header.scss";

function Header() {
  return (
    <header className='header'>
      <div className='header__logo'>
        <img src={logo} alt='logo' className='header__logo-image' />
      </div>
      <nav className='header-menus'>
        <p>Login</p>
        <p>Signup</p>
        <p>Dashboard</p>
        <p>Notifications</p>
        <p>User Profile</p>
      </nav>
    </header>
  );
}

export default Header;
