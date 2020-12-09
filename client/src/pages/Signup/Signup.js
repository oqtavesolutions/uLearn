import React from "react";
import "./Signup.scss";
import PropTypes from "prop-types";

function Signup({ handleSignup }) {
  return (
    <div>
      A registration form will go here
      <button onClick={handleSignup}>Ok</button>
    </div>
  );
}

Signup.prototypes = {
  handleSignup: PropTypes.func.isRequired,
};

export default Signup;
