import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Explore.scss";
import PropTypes from "prop-types";
//import striptags from "striptags";
import { Grid, Paper, Typography } from "@material-ui/core";
import softwaresImage from "../../assets/images/softwares.jpg";

function Explore({ success, handleGetExplorePageCourses, courses }) {
  useEffect(() => {
    handleGetExplorePageCourses();
  }, [handleGetExplorePageCourses]);

  return (
    <div className='course-explore-page'>
      <div className='course-explore-page-description'>
        <div className='course-explore-page-description__left'>
          <Typography
            variant='h6'
            className='course-explore-page-description__title'>
            Explore. Learn something new.
          </Typography>
        </div>
      </div>
      {success && courses.length === 0 && <p>No courses found</p>}
      {success && courses.length > 0 && (
        <Grid container spacing={3} wrap='wrap'>
          {courses.map((course) => {
            return (
              <Grid item xs={12} sm={4} key={course.course_id}>
                <Link
                  to={`/course/${course.course_slug}`}
                  key={course.course_id}>
                  <Paper className='course-explore-page-card'>
                    <div className='course-explore-page-card__image-container'>
                      <img
                        src={softwaresImage}
                        alt='softwares'
                        className='course-explore-page-card__image'
                      />
                    </div>
                    <div className='course-explore-page-card__text-container'>
                      <div className='course-explore-page-card__text'>
                        <Typography
                          gutterBottom
                          variant='body1'
                          className='course-explore-page-card__text-title'>
                          {course.course_title}
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

Explore.propTypes = {
  courses: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired,
  handleGetExplorePageCourses: PropTypes.func.isRequired,
};

export default withRouter(Explore);
