import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditCourse from "./EditCourse";
import {
  getCourseEdit,
  getCourseLectureList,
  updateCourse,
} from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCourseEdit: (courseId) => {
      dispatch(getCourseEdit(courseId));
    },
    handleGetCourseLectures: (courseId) => {
      dispatch(getCourseLectureList(courseId));
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
