import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo/logo.svg";
import "./Header.scss";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

function Header() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const [showMenus, setShowMenus] = useState(false);
  const [showDesktopCollapsible, setShowDesktopCollapsible] = useState(false);

  const handleNavBarClick = () => {
    showMenus ? setShowMenus(false) : setShowMenus(true);
  };

  const handleCollapsibleClick = () => {
    showDesktopCollapsible
      ? setShowDesktopCollapsible(false)
      : setShowDesktopCollapsible(true);
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
            onClick={handleNavBarClick}
          />
        </div>
      )}
      {!isDesktop && showMenus && (
        <nav className='header-menus-kebab'>
          <ul className='header-menus-kebab__list'>
            <li className='header-menus-kebab__list-item'>Login</li>
            <li className='header-menus-kebab__list-item'>Signup</li>
            <li className='header-menus-kebab__list-item'>Dashboard</li>
            <li className='header-menus-kebab__list-item'>Notifications</li>
            <li className='header-menus-kebab__list-item'>User Profile</li>
          </ul>
        </nav>
      )}

      {isDesktop && (
        <nav className='header-menus'>
          <div className='header-menus__buttons'>
            <Link to='/dashboard' className='header-menus__dashboard'>
              Dashboard
            </Link>
          </div>
          <div className='header-menus__collapse'>
            <Avatar
              name='Nahid Hossain'
              size='50'
              className='header-menus__avatar'
              onClick={handleCollapsibleClick}
              textSizeRatio={1.75}
              color='#3bc371'
              fgColor='white'
            />
          </div>
          {showDesktopCollapsible && (
            <ul className='header-menus__items'>
              <li className='header-menus__item'>Nahid Hossain</li>
              <li className='header-menus__item'>oikantik@gmail.com</li>
              <li className='header-menus__item'>My Account</li>
              <li className='header-menus__item'>Logout</li>
            </ul>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
