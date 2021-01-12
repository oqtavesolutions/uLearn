import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LectureList from "./LectureList";
import { getCourseLectureList } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCourseLectures: (courseId) => {
      dispatch(getCourseLectureList(courseId));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.getLectureList.success,
    loading: state.getLectureList.loading,
    error: state.getLectureList.error,
    lectures: state.getLectureList.lectures,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LectureList));
