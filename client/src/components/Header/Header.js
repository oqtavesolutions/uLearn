import React from "react";
import logo from "../../assets/logo/logo.svg";
import "./Header.scss";

function Header() {
  return (
    <div>
      <img src={logo} alt='logo' className='header__logo' />
    </div>
  );
}

export default Header;
