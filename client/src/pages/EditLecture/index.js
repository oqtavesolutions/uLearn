import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCourseEdit } from "../EditCourse/redux/actions";
import EditLecture from "./EditLecture";
import { getLectureEdit, updateLecture } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCourseEdit: (courseId) => {
      dispatch(getCourseEdit(courseId));
    },
    handleGetLectureEdit: (payload) => {
      dispatch(getLectureEdit({ ...payload }));
    },
    handleUpdateLecture: (payload) => {
      dispatch(updateLecture(payload));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.getLectureEdit.success,
    loading: state.getLectureEdit.loading,
    lecture: state.getLectureEdit.lecture,
    error: state.getLectureEdit.error,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditLecture));
