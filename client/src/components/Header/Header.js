import React, { Fragment, useState } from "react";
import {
  AppBar,
  List,
  ListItem,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Avatar,
  Grid,
  MenuList,
  MenuItem,
  Popover,
  Divider,
} from "@material-ui/core";
import firebase from "../../config";
import { useMediaQuery } from "react-responsive";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../assets/logo/logo_cursive.svg";
import { menusMobile, menusDesktop, menusMobileBottom } from "./menus";
import "./Header.scss";

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

  /* menus */
  const menusComponentMobile = menusMobile.map((menu) => (
    <ListItem key={menu.id}>
      <Link to={menu.link}>
        <Typography variant='body1'>{menu.text}</Typography>
      </Link>
    </ListItem>
  ));

  const menusComponentMobileBottom = menusMobileBottom.map((menu) => (
    <ListItem key={menu.id}>
      <Link to={menu.link}>
        <Typography variant='body1'>{menu.text}</Typography>
      </Link>
    </ListItem>
  ));

  const menusComponent = menusDesktop.map((menu) => (
    <Link to={menu.link} key={menu.id} className='header-left-menu-items__item'>
      <Typography variant='body2'>{menu.text}</Typography>
    </Link>
  ));

  /* set drawer for mobile */
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  /* Set Avatar menu for desktop */
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  /* log out */
  const handleLogout = async () => {
    await firebase.auth().signOut();
    history.push("/login");
  };

  /* */

  return (
    <AppBar color='inherit' className='header'>
      <Toolbar>
        {/* logo */}

        <Typography variant='h6'>
          <Link to={isLoggedIn ? "/my-courses" : "/"}>
            {" "}
            <img src={logo} alt='logo' className='header__logo' />
          </Link>
        </Typography>

        {/* If Not logged In */}

        {!isLoggedIn && !signupRoute && !loginRoute && (
          <div className='header-public'>
            <Link to='/login'>
              <Typography variant='body2'>Login</Typography>
            </Link>
          </div>
        )}

        {/* If desktop */}

        {isDesktop && isLoggedIn && (
          <Fragment>
            <div className='header-left-menu-items'>{menusComponent}</div>
            <div className='header-right-menu-items'>
              <Link
                to='/create/course'
                className='header-right-menu-items__create'>
                <Typography variant='body2'>Create Course</Typography>
              </Link>
              <Avatar
                className='header-right-menu-items__avatar'
                aria-controls='avatar-menu'
                aria-haspopup='true'
                onClick={handleClick}>
                {displayName[0]}
              </Avatar>
            </div>
            <Popover
              id={id}
              open={open}
              elevation={1}
              anchorEl={anchorEl}
              onClose={handleClose}
              className='avatar-menu-popover'
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
              <Grid container className='avatar-menu-popover__avatar-container'>
                <Grid item xs={3}>
                  <Avatar className='avatar-menu-popover__avatar'>
                    {displayName[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant='body2'
                    className='avatar-menu-popover__name'>
                    {displayName}
                  </Typography>
                  <Typography
                    variant='body2'
                    className='avatar-menu-popover__email'>
                    {email}
                  </Typography>
                </Grid>
              </Grid>
              <MenuList>
                <MenuItem onClick={handleClose}>
                  <Link to='/my-page'>
                    {" "}
                    <Typography variant='body2'>My Page</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/my-account'>
                    <Typography variant='body2'>My account</Typography>{" "}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography variant='body2'>Logout</Typography>
                </MenuItem>
              </MenuList>
            </Popover>
          </Fragment>
        )}

        {/* If mobile */}

        {!isDesktop && isLoggedIn && (
          <IconButton
            edge='end'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer(true)}
            className='header-mobile-menu-container'>
            <MenuIcon />
          </IconButton>
        )}

        {!isDesktop && (
          <Drawer
            anchor='right'
            open={drawer}
            onClose={toggleDrawer(false)}
            className='header-mobile-menu'>
            <Grid container className='header-mobile-menu__avatar-container'>
              <Grid item xs={3} className='header-mobile-menu__avatar'>
                <Avatar>{displayName[0]}</Avatar>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant='body1'
                  className='header-mobile-menu__name'>
                  {displayName}
                </Typography>
                <Typography
                  variant='body1'
                  className='header-mobile-menu__email'>
                  {email}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              {menusComponentMobile}
            </List>
            <Divider />
            <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              {menusComponentMobileBottom}
              <ListItem onClick={handleLogout}>
                <Typography variant='body1'>Logout</Typography>
              </ListItem>
            </List>
          </Drawer>
        )}
      </Toolbar>
    </AppBar>
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
