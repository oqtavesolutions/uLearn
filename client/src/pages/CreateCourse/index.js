import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import { createCourse, uploadImage } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpload: (file) => {
      dispatch(uploadImage(file));
    },
    handleSubmit: ({
      course_title,
      course_description,
      course_slug,
      course_categories,
    }) => {
      dispatch(
        createCourse({
          course_title,
          course_description,
          course_slug,
          course_categories,
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
