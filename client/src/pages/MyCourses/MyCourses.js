import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MyCourses.scss";
import PropTypes from "prop-types";
import MyCourseList from "./components/MyCourseList";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import { Typography } from "@material-ui/core";

function MyCourses({
  loading,
  success,
  courses,
  handleGetCoursesByUser,
  displayName,
}) {
  useEffect(() => {
    handleGetCoursesByUser();
  }, [handleGetCoursesByUser]);

  return (
    <div className='my-courses-page'>
      <Typography variant='h4' className='my-courses-page__headline'>
        My Courses
      </Typography>

      {loading && <CustomContentLoader />}
      {success && courses.length === 0 && (
        <p>You have not created any course yet.</p>
      )}
      {success && courses.length > 0 && (
        <div className='my-courses-page-container'>
          {courses.map((course) => (
            <MyCourseList course={course} key={course.id} />
          ))}
        </div>
      )}
    </div>
  );
}

MyCourses.propTypes = {
  handleGetCoursesByUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  displayName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    courses: state.getCoursesByUser.courses,
    displayName: state.userStatus.displayName,
  };
};

export default connect(mapStateToProps)(withRouter(MyCourses));
