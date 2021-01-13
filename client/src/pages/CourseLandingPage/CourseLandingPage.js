import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./CourseLandingPage.scss";
import "reactjs-popup/dist/index.css";
import striptags from "striptags";
import { Grid, Typography } from "@material-ui/core";
import Vimeo from "@u-wave/react-vimeo";

function CourseLandingPage({
  course,
  success,
  match,
  isLoggedIn,
  handleGetCourseDetails,
  handleGetCourseDetailsLoggedInUser,
  handleEnrollInCourse,
  isOwner,
  isSubscribed,
  history,
  enrollSuccess,
  author,
}) {
  useEffect(() => {
    isLoggedIn
      ? handleGetCourseDetailsLoggedInUser(match.params.courseSlug)
      : handleGetCourseDetails(match.params.courseSlug);
  }, [
    match,
    handleGetCourseDetails,
    handleGetCourseDetailsLoggedInUser,
    isLoggedIn,
  ]);

  return (
    <Fragment>
      {success && (
        <div className='course-landing-page'>
          <div className='course-landing-page-main'>
            <Typography
              variant='h6'
              className='course-landing-page-main__title'>
              {course.course_title}
            </Typography>
            <Grid container wrap={true} spacing={3}>
              <Grid item xs={6} sm={9}>
                {course.lectures.length > 0 && (
                  <Vimeo
                    video={course.lectures[0].lecture_video_embed}
                    autoplay
                    responsive={true}
                  />
                )}
              </Grid>
              <Grid item xs={3} sm={3}>
                <Typography variant='body2'>
                  {course.lectures.length} lectures
                </Typography>
                {course.lectures.length > 0 &&
                  course.lectures.map((lecture, i) =>
                    isSubscribed || isOwner ? (
                      <Link
                        to={`/course/${course.course_slug}/lecture/${lecture.lecture_slug}`}
                        key={lecture.lecture_id}>
                        <div className='course-landing-page-module'>
                          <p className='course-landing-page-module__module-title'>
                            {i + 1}. {lecture.lecture_title}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <div
                        className='course-landing-page-module'
                        key={lecture.lecture_id}>
                        <p className='course-landing-page-module__module-title'>
                          {i + 1}. {lecture.lecture_title}
                        </p>
                      </div>
                    )
                  )}
              </Grid>
            </Grid>
          </div>
          <Grid container className='course-landing-page-main'>
            <Grid item xs={9} className='course-landing-page__container'>
              <Typography
                variant='body1'
                className='course-landing-page-description__text'>
                {striptags(course.course_description)}
              </Typography>
            </Grid>

            <Grid item xs={3} className='course-landing-page-author'>
              <div className='course-landing-page-author__description'>
                <p className='course-landing-page-author__name'>
                  <strong>Name:</strong> {author && author.author_name}
                </p>
                <p className='course-landing-page-author__bio'>
                  <strong>Bio:</strong> {author && striptags(author.author_bio)}
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </Fragment>
  );
}

CourseLandingPage.propTypes = {
  handleGetCourseDetails: PropTypes.func.isRequired,
  handleGetCourseDetailsLoggedInUser: PropTypes.func.isRequired,
  handleEnrollInCourse: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  enrollSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isOwner: state.getCourseLandingPage.isOwner,
    isSubscribed: state.getCourseLandingPage.isSubscribed,
    enrollSuccess: state.getCourseLandingPage.order.success,
    author: state.getCourseLandingPage.author,
  };
};
export default connect(mapStateToProps)(withRouter(CourseLandingPage));
