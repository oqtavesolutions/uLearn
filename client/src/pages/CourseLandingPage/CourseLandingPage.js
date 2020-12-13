import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CourseLandingPage.scss";

function CourseLandingPage({
  course,
  success,
  match,
  isLoggedIn,
  handleGetCourseDetails,
  handleGetCourseDetailsLoggedInUser,
  isOwner,
  isSubscribed,
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
          <div className='course-landing-page-description'>
            <div className='course-landing-page-description__left'>
              <h1 className='course-landing-page-description__title'>
                {course.course_title}
              </h1>
              <p className='course-landing-page-description__text'>
                {course.course_description}
              </p>
            </div>
            <button className='course-landing-page-description__button'>
              Enroll
            </button>
            {/*!isOwner && !isSubscribed && (
              <button className='course-landing-page-description__button'>
                Enroll
              </button>
            )*/}
          </div>
          {course.lectures.length &&
            course.lectures.map((lecture) => (
              <div
                className='course-landing-page-modules'
                key={lecture.lecture_id}>
                <div className='course-landing-page-module'>
                  <p className='course-landing-page-module__module-title'>
                    {lecture.lecture_title}
                  </p>
                  <p className='course-landing-page-module__module-title'>
                    {lecture.lecture_description}
                  </p>
                </div>
              </div>
            ))}
          <div className='course-landing-page-author'>
            <div className='course-landing-page-author__avatar'></div>
            <div className='course-landing-page-author__description'>
              <p className='course-landing-page-author__name'>Author Name</p>
              <p className='course-landing-page-author__bio'>
                Author Description
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

CourseLandingPage.propTypes = {
  handleGetCourseDetails: PropTypes.func.isRequired,
  handleGetCourseDetailsLoggedInUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isOwner: state.getCourseLandingPage.isOwner,
    isSubscribed: state.getCourseLandingPage.isSubscribed,
  };
};
export default connect(mapStateToProps)(withRouter(CourseLandingPage));
