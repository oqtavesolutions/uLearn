import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { userStatus } from "../../redux/actions";

function PrivateRoute({ children, handleGetUserStatus, loading, isLoggedIn }) {
  useEffect(() => {
    handleGetUserStatus();
  }, [handleGetUserStatus]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && !isLoggedIn) {
    return <Redirect to='/login' />;
  }

  return <Fragment>{children}</Fragment>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleGetUserStatus: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetUserStatus: () => {
      dispatch(userStatus());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.userStatus.loading,
    isLoggedIn: state.userStatus.isLoggedIn,
    success: state.userStatus.success,
    error: state.userStatus.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivateRoute));
