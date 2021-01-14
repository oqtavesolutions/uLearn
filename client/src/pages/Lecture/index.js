import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Lecture from "./Lecture";
import { getSingleLecture } from "./redux/actions";
import {
  getCourseLandingPage,
  getCourseLandingPageLoggedInUser,
  //enrollInCourse,
} from "../CourseLandingPage/redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCourseDetails: (courseSlug) => {
      dispatch(getCourseLandingPage(courseSlug));
    },
    handleGetCourseDetailsLoggedInUser: (courseSlug) => {
      dispatch(getCourseLandingPageLoggedInUser(courseSlug));
    },
    handleGetSingleLecture: (lectureSlug) => {
      dispatch(getSingleLecture(lectureSlug));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.getSingleLecture.loading,
    lecture: state.getSingleLecture.lecture,
    success: state.getSingleLecture.success,
    course: state.getCourseLandingPage.course,
    error: state.getSingleLecture.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Lecture));
