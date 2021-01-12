import React, { useEffect } from "react";
import "./MyLearning.scss";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import striptags from "striptags";
import { Grid, Paper, Typography } from "@material-ui/core";
import softwaresImage from "../../assets/images/softwares.jpg";

function MyLearning({ loading, handleGetCoursesByUser, courses, success }) {
  useEffect(() => {
    handleGetCoursesByUser();
  }, [handleGetCoursesByUser]);
  return (
    <div className='my-learning-page'>
      <h1 className='my-learning-page__headline'>My Learning</h1>
      {loading && !success && <CustomContentLoader />}
      {success && courses.length === 0 && (
        <p className='my-learning-page__sub'>
          You have not enrolled into any course yet.{" "}
          <Link to='/explore' className='my-learning-page__sub-link'>
            Click here
          </Link>{" "}
          to explore and find courses that you may like.
        </p>
      )}
      {success && courses.length > 0 && (
        <Grid container spacing={3} wrap='wrap'>
          {courses.map((course) => (
            <Grid item xs={12} sm={4} key={course.courses.course_id}>
              <Link to={`/course/${course.courses.course_slug}`}>
                <Paper className='my-learning-page-card'>
                  <div className='my-learning-page-card__image-container'>
                    <img
                      src={softwaresImage}
                      alt='softwares'
                      className='my-courses-page-card__image'
                    />
                  </div>
                  <div className='my-learning-page-card__description'>
                    <Typography
                      variant='body1'
                      className='my-learning-page-card__title'>
                      {course.courses.course_title}
                    </Typography>
                    <Typography
                      variant='body2'
                      className='my-learning-page-card__date'>
                      {striptags(course.courses.course_description)}
                    </Typography>
                  </div>
                </Paper>
              </Link>
            </Grid>
          ))}{" "}
        </Grid>
      )}
    </div>
  );
}

MyLearning.propTypes = {
  handleGetCoursesByUser: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MyLearning;
