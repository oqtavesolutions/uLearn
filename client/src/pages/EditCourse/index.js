import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditCourse from "./EditCourse";
import { getCourseEdit, updateCourse, updateImage } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpload: (file) => {
      dispatch(updateImage(file));
    },
    handleGetCourseEdit: (courseId) => {
      dispatch(getCourseEdit(courseId));
    },
    handleUpdateCourse: (payload) => {
      dispatch(
        updateCourse({
          ...payload,
        })
      );
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.getCourseEdit.success,
    loading: state.getCourseEdit.loading,
    error: state.getCourseEdit.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditCourse));
