import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import { userLogin } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (payload) => {
      dispatch(userLogin({ ...payload }));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.userLogin.success,
    loading: state.userLogin.loading,
    isLoggedIn: state.userLogin.isLoggedIn,
    error: state.userLogin.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
