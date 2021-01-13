import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MyCourses.scss";
import PropTypes from "prop-types";
import MyCourseList from "./components/MyCourseList";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import { Grid, Typography } from "@material-ui/core";

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
        <Grid
          container
          spacing={3}
          wrap='wrap'
          className='my-courses-page-container'>
          {courses.map((course) => (
            <Grid item xs={12} sm={4} key={course.id}>
              <MyCourseList course={course} />
            </Grid>
          ))}
        </Grid>
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
