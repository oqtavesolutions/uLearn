import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Lecture.scss";
import PropTypes from "prop-types";

function Lecture({ lecture, success, handleGetSingleLecture, match }) {
  useEffect(() => {
    handleGetSingleLecture(match.params.lectureSlug);
  }, [handleGetSingleLecture, match]);
  return (
    <div>
      {success && (
        <Fragment>
          <p>{lecture.lecture_title}</p>
          <p>{lecture.lecture_description}</p>
          <p>Link to other modules</p>
        </Fragment>
      )}
    </div>
  );
}

Lecture.propTypes = {
  handleGetSingleLecture: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  lecture: PropTypes.object.isRequired,
};

export default withRouter(Lecture);
