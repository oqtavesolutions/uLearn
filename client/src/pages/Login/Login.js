import React from "react";
import "./Login.scss";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Login({ handleLogin, isLoggedIn }) {
  if (isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div>
      A registration form will go here
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatus.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Login));
