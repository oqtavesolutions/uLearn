import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateLecture from "./CreateLecture";
import { createLecture } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateLecture: ({
      lecture_title,
      lecture_description,
      lecture_slug,
      course_id,
    }) => {
      dispatch(
        createLecture({
          lecture_title,
          lecture_description,
          lecture_slug,
          course_id,
        })
      );
    },
  };
};

const mapStateToProps = (state) => {
  return {
    success: state.createLecture.success,
    loading: state.createLecture.loading,
    error: state.createLecture.error,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateLecture));