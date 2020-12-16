import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CourseLandingPage from "./CourseLandingPage";
import {
  getCourseLandingPage,
  getCourseLandingPageLoggedInUser,
  enrollInCourse,
} from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCourseDetails: (courseSlug) => {
      dispatch(getCourseLandingPage(courseSlug));
    },
    handleGetCourseDetailsLoggedInUser: (courseSlug) => {
      dispatch(getCourseLandingPageLoggedInUser(courseSlug));
    },

    handleEnrollInCourse: (courseSlug) => {
      dispatch(enrollInCourse(courseSlug));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.getCourseLandingPage.loading,
    course: state.getCourseLandingPage.course,
    success: state.getCourseLandingPage.success,
    error: state.getCourseLandingPage.error,
    isLoggedIn: state.userStatus.isLoggedIn,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseLandingPage));
