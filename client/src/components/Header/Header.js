import React from "react";
import logo from "../../assets/logo/logo.svg";
import "./Header.scss";

function Header() {
  return (
    <div>
      <img src={logo} alt='logo' className='header__logo' />
      <p>Login</p>
      <p>Signup</p>
      <p>Dashboard</p>
      <p>Notifications</p>
      <p>User Profile</p>
    </div>
  );
}

export default Header;
