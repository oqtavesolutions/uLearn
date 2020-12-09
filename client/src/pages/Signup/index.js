import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Signup from "./Signup";
import { userSignup } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignup: (payload) => {
      dispatch(userSignup({ ...payload }));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.userSignup.success,
    loading: state.userSignup.loading,
    error: state.userSignup.error,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
