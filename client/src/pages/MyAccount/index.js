import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyAccount from "./MyAccount";
import { changePassword } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangePassword: (payload) => {
      dispatch(changePassword({ ...payload }));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.changePassword.success,
    loading: state.changePassword.loading,
    error: state.changePassword.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyAccount));
