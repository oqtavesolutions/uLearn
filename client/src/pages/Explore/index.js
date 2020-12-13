import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Explore from "./Explore";
import {
  getExplorePageCourses,
  getExplorePageCoursesByCategory,
} from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetExplorePageCourses: () => {
      dispatch(getExplorePageCourses());
    },
    handleGetExplorePageCoursesByCategory: (category) => {
      dispatch(getExplorePageCoursesByCategory(category));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.getExplorePageCourses.success,
    loading: state.getExplorePageCourses.loading,
    error: state.getExplorePageCourses.error,
    courses: state.getExplorePageCourses.courses,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Explore));
