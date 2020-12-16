import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyCourses from "./MyCourses";
import { getCoursesByUser } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCoursesByUser: () => {
      dispatch(getCoursesByUser());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.getCoursesByUser.success,
    loading: state.getCoursesByUser.loading,
    courses: state.getCoursesByUser.courses,
    error: state.getCoursesByUser.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyCourses));
