import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyLearning from "./MyLearning";
import { getMyLearning } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCoursesByUser: () => {
      dispatch(getMyLearning());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.getMyLearning.success,
    loading: state.getMyLearning.loading,
    courses: state.getMyLearning.courses,
    error: state.getMyLearning.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyLearning));
