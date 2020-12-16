import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Lecture from "./Lecture";
import { getSingleLecture } from "./redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
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
    error: state.getSingleLecture.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Lecture));
