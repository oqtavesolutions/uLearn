import React from "react";
import "./Login.scss";
import PropTypes from "prop-types";

function Login({ handleLogin }) {
  return (
    <div>
      A registration form will go here
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
