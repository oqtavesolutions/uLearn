import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo/logo.svg";
import "./Header.scss";

function Header() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const [showMenus, setShowMenus] = useState(false);

  const handleClick = () => {
    showMenus ? setShowMenus(false) : setShowMenus(true);
  };
  return (
    <header className='header'>
      <div className='header__logo'>
        <img src={logo} alt='logo' className='header__logo-image' />
      </div>
      {!isDesktop && (
        <div className='header-menu-bar'>
          <FontAwesomeIcon
            icon={showMenus ? faTimesCircle : faBars}
            className='header-menu-bar__nav-bar-icon'
            onClick={handleClick}
          />
        </div>
      )}
      {!isDesktop && showMenus && (
        <nav className='header-menus'>
          <ul className='header-menus__list'>
            <li className='header-menus__list-item'>Login</li>
            <li className='header-menus__list-item'>Signup</li>
            <li className='header-menus__list-item'>Dashboard</li>
            <li className='header-menus__list-item'>Notifications</li>
            <li className='header-menus__list-item'>User Profile</li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
