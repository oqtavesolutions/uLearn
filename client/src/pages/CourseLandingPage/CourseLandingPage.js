import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./CourseLandingPage.scss";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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

  const handleEnroll = () => {
    handleEnrollInCourse(match.params.courseSlug);
  };
  return (
    <Fragment>
      {success && (
        <div className='course-landing-page'>
          <div className='course-landing-page__container'>
            <div className='course-landing-page-description'>
              <div className='course-landing-page-description__left'>
                <h1 className='course-landing-page-description__title'>
                  {course.course_title}
                </h1>
                <p className='course-landing-page-description__text'>
                  {course.course_description}
                </p>
              </div>
              <Popup
                trigger={
                  <button className='course-landing-page-description__button'>
                    Enroll{" "}
                  </button>
                }
                modal>
                {(close) =>
                  enrollSuccess ? (
                    <div className='enrollment-modal'>
                      <button
                        className='enrollment-modal__close'
                        onClick={close}>
                        &times;
                      </button>
                      <h1 className='enrollment-modal__header'>Success</h1>
                      <div className='enrollment-modal__content'>
                        Successfully enrolled, you can close and refresh this
                        page now
                      </div>
                    </div>
                  ) : isLoggedIn ? (
                    <div className='enrollment-modal'>
                      <button
                        className='enrollment-modal__close'
                        onClick={close}>
                        &times;
                      </button>
                      <h1 className='enrollment-modal__header'>
                        Please Confirm
                      </h1>
                      <div className='enrollment-modal__content'>
                        Are you sure you want to enroll into this course?
                      </div>
                      <button
                        className='enrollment-modal__actions'
                        onClick={handleEnroll}>
                        Enroll Now
                      </button>
                    </div>
                  ) : (
                    <div className='enrollment-modal'>
                      <button
                        className='enrollment-modal__close'
                        onClick={close}>
                        &times;
                      </button>
                      <h1 className='enrollment-modal__header'>Please Login</h1>
                      <div className='enrollment-modal__content'>
                        Please login to continue
                      </div>
                    </div>
                  )
                }
              </Popup>
              {/*!isOwner && !isSubscribed && (
              <button className='course-landing-page-description__button'>
                Enroll
              </button>
            )*/}
            </div>
          </div>
          <div className='course-landing-page-modules-container'>
            {course.lectures.length > 0 &&
              course.lectures.map((lecture) => (
                <div
                  className='course-landing-page-modules'
                  key={lecture.lecture_id}>
                  {isSubscribed ? (
                    <Link
                      to={`/course/${course.course_slug}/lecture/${lecture.lecture_slug}`}>
                      <div className='course-landing-page-module'>
                        <p className='course-landing-page-module__module-title'>
                          {lecture.lecture_title}
                        </p>
                        <p className='course-landing-page-module__module-title'>
                          {lecture.lecture_description}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div className='course-landing-page-module'>
                      <p className='course-landing-page-module__module-title'>
                        {lecture.lecture_title}
                      </p>
                      <p className='course-landing-page-module__module-title'>
                        {lecture.lecture_description}
                      </p>
                    </div>
                  )}
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
  };
};
export default connect(mapStateToProps)(withRouter(CourseLandingPage));
