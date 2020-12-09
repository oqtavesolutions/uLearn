import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { userStatus } from "../../redux/actions";

function PrivateRoute({
  component: Component,
  handleGetUserStatus,
  loading,
  isLoggedIn,
  ...rest
}) {
  useEffect(() => {
    handleGetUserStatus();
  }, [handleGetUserStatus]);
  return (
    <Fragment>
      {loading && <p>Loading</p>}
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            return isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect to='/login' />
            );
          }}
        />
      )}
    </Fragment>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
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
