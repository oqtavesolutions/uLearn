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
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
      lecture_attachment,
    }) => {
      dispatch(
        createLecture({
          lecture_title,
          lecture_description,
          lecture_slug,
          course_id,
          lecture_content,
          lecture_google_slide,
          lecture_video_embed,
          lecture_attachment,
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
