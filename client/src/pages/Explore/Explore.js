import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Explore.scss";
import PropTypes from "prop-types";
//import striptags from "striptags";
import { Paper, Typography } from "@material-ui/core";
import avatarImg from "../../assets/images/avatar.svg";

function Explore({ success, handleGetExplorePageCourses, courses }) {
  useEffect(() => {
    handleGetExplorePageCourses();
  }, [handleGetExplorePageCourses]);

  return (
    <div className='course-explore-page'>
      <div className='course-explore-page-description'>
        <div className='course-explore-page-description__left'>
          <Typography
            variant='h4'
            className='course-explore-page-description__title'>
            Explore
          </Typography>
        </div>
      </div>
      {success && courses.length === 0 && <p>No courses found</p>}
      {success && courses.length > 0 && (
        <div className='course-explore-page-paper-container'>
          {courses.map((course) => {
            return (
              <Paper
                className='course-explore-page-paper'
                key={course.course_id}>
                <div className='course-explore-page-paper__image-container'>
                  <Link to={`/course/${course.course_slug}`}>
                    <img
                      src={course.course_image}
                      alt='softwares'
                      className='course-explore-page-paper__image'
                    />
                  </Link>
                </div>
                <div className='course-explore-page-paper__text-container'>
                  <div className='course-explore-page-paper__text'>
                    <Link to={`/course/${course.course_slug}`}>
                      <Typography
                        gutterBottom
                        variant='body2'
                        className='course-explore-page-paper__text-title'>
                        {course.course_title}
                      </Typography>
                    </Link>
                  </div>
                  <div className='course-explore-page-paper__avatar-container'>
                    <img
                      src={
                        course.authors.profile_image_url
                          ? course.authors.profile_image_url
                          : avatarImg
                      }
                      alt='avatar'
                      className='course-explore-page-paper__avatar'
                    />{" "}
                    <Typography
                      variant='caption'
                      className='course-explore-page-paper__avatar-name'>
                      {course.authors.author_name
                        ? course.authors.author_name
                        : "Awesome Author"}
                    </Typography>
                  </div>
                </div>
              </Paper>
            );
          })}
        </div>
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
