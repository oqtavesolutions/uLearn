import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MyCourses.scss";
import PropTypes from "prop-types";
import MyCourseList from "./components/MyCourseList";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import { Grid, Paper, Typography } from "@material-ui/core";

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
      <Paper elevation={0} className='my-courses-page__header'>
        <Typography variant='h4' className='my-courses-page__header-title'>
          Welcome, {displayName.split(" ")[0]}
        </Typography>
        <Typography
          variant='body2'
          className='my-courses-page__header-paragraph'>
          Create your courses today or learn something new!
        </Typography>
      </Paper>
      <h1 className='my-courses-page__headline'>My Courses</h1>

      {loading && <CustomContentLoader />}
      {success && courses.length === 0 && (
        <p>You have not created any course yet.</p>
      )}
      {success && courses.length > 0 && (
        <Grid container spacing={3} wrap='wrap'>
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
