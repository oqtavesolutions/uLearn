import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditCourse from "./EditCourse";
import { getCourseEdit } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCourseEdit: (courseId) => {
      dispatch(getCourseEdit(courseId));
    },
  };
};

const mapStateToProps = (state) => {
  console.log(state.getCourseEdit);
  return {
    success: state.getEditCourse.success,
    loading: state.getEditCourse.loading,
    error: state.getEditCourse.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditCourse));
