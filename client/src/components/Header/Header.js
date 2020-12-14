import React, { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo/logo.svg";
import "./Header.scss";
import { Link, withRouter } from "react-router-dom";
import Avatar from "react-avatar";
import firebase from "../../config";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Header({
  history,
  isLoggedIn,
  email,
  displayName,
  signupRoute,
  loginRoute,
}) {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  const hamburgerMenu = useRef(null);
  const hamburgerMenuMobile = useRef(null);
  const [showMenus, setShowMenus] = useState(false);
  const [showDesktopCollapsible, setShowDesktopCollapsible] = useState(false);

  const handleNavBarClick = () => {
    setShowMenus(!showMenus);
  };

  const handleCollapsibleClick = () => {
    setShowDesktopCollapsible(!showDesktopCollapsible);
  };

  const handleLogout = async () => {
    await firebase.auth().signOut();
    history.push("/login");
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        hamburgerMenu.current !== null &&
        !hamburgerMenu.current.contains(e.target)
      ) {
        setShowDesktopCollapsible(false);
        setShowMenus(false);
      }
    });
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", () => {
        setShowMenus(false);
        setShowDesktopCollapsible(false);
      });
    };
  }, [hamburgerMenu, showMenus]);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        hamburgerMenuMobile.current !== null &&
        !hamburgerMenuMobile.current.contains(e.target)
      ) {
        setShowDesktopCollapsible(false);
        setShowMenus(false);
      }
    });
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", () => {
        setShowMenus(false);
        setShowDesktopCollapsible(false);
      });
    };
  }, [hamburgerMenuMobile, showMenus]);

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className='header__logo-link'>
          <img src={logo} alt='logo' className='header__logo-image' />
        </Link>
      </div>
      {!isLoggedIn && !signupRoute && !loginRoute && (
        <div className='header__login-register'>
          <Link to='/login' className='header__login'>
            Login
          </Link>
          <Link to='/signup' className='header__signup'>
            Signup
          </Link>
        </div>
      )}
      {!isDesktop && isLoggedIn && (
        <div className='header-menu-bar'>
          {!showMenus && (
            <FontAwesomeIcon
              icon={faBars}
              className='header-menu-bar__nav-bar-icon'
              onClick={handleNavBarClick}
            />
          )}
        </div>
      )}
      {!isDesktop && isLoggedIn && showMenus && (
        <Fragment>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className='header-menu-bar__nav-bar-icon'
          />
          <nav className='header-menus-kebab' ref={hamburgerMenuMobile}>
            <ul className='header-menus-kebab__list'>
              <li className='header-menus-kebab__list-item'>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li className='header-menus-kebab__list-item'>
                <Link to='/my-courses'>My Courses</Link>
              </li>
              <li className='header-menus-kebab__list-item'>
                <Link to='/my-learning'>My Learning</Link>
              </li>
              <li className='header-menus-kebab__list-item'>
                <Link to='/explore'>Explore</Link>
              </li>
              <li className='header-menus-kebab__list-item'>
                <Link to='/my-page'>My Page</Link>
              </li>
              <li className='header-menus-kebab__list-item'>
                <Link to='/my-account'>My Account</Link>
              </li>
              <li
                className='header-menus-kebab__list-item'
                onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </nav>
        </Fragment>
      )}

      {isLoggedIn && isDesktop && (
        <nav className='header-menus'>
          <div className='header-menus__buttons'>
            <Link to='/dashboard' className='header-menus__dashboard'>
              Dashboard
            </Link>
          </div>
          <div className='header-menus__collapse'>
            <Avatar
              name={displayName}
              size='50'
              className='header-menus__avatar'
              onClick={handleCollapsibleClick}
              textSizeRatio={1.75}
              color='#323232'
            />
          </div>
          {showDesktopCollapsible && (
            <ul className='header-menus__items' ref={hamburgerMenu}>
              <li className='header-menus__item header-menus__item--display-name'>
                {displayName}
              </li>
              <li className='header-menus__item header-menus__item--email'>
                {email}
              </li>
              <li className='header-menus__item header-menus__item--my-account'>
                <Link to='/my-account'>My Account</Link>
              </li>
              <li
                className='header-menus__item header-menus__item--logout'
                onClick={handleLogout}>
                Logout
              </li>
            </ul>
          )}
        </nav>
      )}
    </header>
  );
}

Header.proptype = {
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatus.isLoggedIn,
    displayName: state.userStatus.displayName,
    email: state.userStatus.email,
  };
};

export default connect(mapStateToProps)(withRouter(Header));
