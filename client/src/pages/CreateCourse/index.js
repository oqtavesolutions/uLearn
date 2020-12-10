import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import { createCourse } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (e) => {
      e.preventDefault();
      dispatch(
        createCourse({
          course_title: "course 1",
          course_description: "course description 1",
          course_slug: "course slug 1",
        })
      );
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.createCourse.success,
    loading: state.createCourse.loading,
    error: state.createCourse.error,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateCourse));
