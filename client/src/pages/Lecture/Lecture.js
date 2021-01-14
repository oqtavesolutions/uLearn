import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Lecture.scss";
import PropTypes from "prop-types";
import "react-tabs/style/react-tabs.css";
import Vimeo from "@u-wave/react-vimeo";
import { Paper, Typography } from "@material-ui/core";
import avatarImg from "../../assets/images/avatar.svg";
import { connect } from "react-redux";

function Lecture({
  lecture,
  success,
  handleGetSingleLecture,
  match,
  isLoggedIn,
  handleGetCourseDetails,
  handleGetCourseDetailsLoggedInUser,
  isOwner,
  isSubscribed,
  course,
  author,
}) {
  useEffect(() => {
    handleGetSingleLecture(match.params.lectureSlug);
    isLoggedIn
      ? handleGetCourseDetailsLoggedInUser(match.params.courseSlug)
      : handleGetCourseDetails(match.params.courseSlug);
  }, [
    handleGetSingleLecture,
    match,
    handleGetCourseDetails,
    handleGetCourseDetailsLoggedInUser,
    isLoggedIn,
  ]);
  return (
    <div className='enrolled-lecture'>
      {success && (
        <div className='course-landing-page'>
          <div className='course-landing-page-main'>
            <div className='course-landing-page-main__main'>
              <Typography
                variant='h6'
                className='course-landing-page-main__main-title'>
                {course.course_title}
              </Typography>
              <div className='course-landing-page-main-container'>
                <Paper
                  elevation={0}
                  className='course-landing-page-main-container__video-text'>
                  <Fragment>
                    {lecture.lecture.lecture_type === "Text" && (
                      <div
                        className='course-landing-page-main-container-main-content'
                        dangerouslySetInnerHTML={{
                          __html: lecture.lecture.lecture_content,
                        }}></div>
                    )}
                    {lecture.lecture.lecture_type === "Video" && (
                      <Vimeo
                        video={lecture.lecture.lecture_video_embed}
                        autoplay={false}
                        responsive={true}
                      />
                    )}
                    {lecture.lecture.lecture_type === "Slide" && (
                      <iframe
                        title='google-slider'
                        src={lecture.lecture.lecture_google_slide}
                        frameBorder='0'
                        width='960'
                        height='569'
                        allowFullScreen={true}></iframe>
                    )}
                  </Fragment>
                </Paper>
                <Paper
                  elevation={0}
                  className='course-landing-page-main-container__lecture-list'>
                  <Typography
                    variant='body2'
                    className='course-landing-page-main-container__lecture-list-text'>
                    {lecture.course.lectures.length} lectures
                  </Typography>
                  {lecture.course.lectures.length > 0 &&
                    lecture.course.lectures.map((lecture, i) =>
                      isSubscribed || isOwner ? (
                        <Link
                          to={`/course/${lecture.course.course_slug}/lecture/${lecture.lecture_slug}`}
                          key={lecture.lecture_id}>
                          <div className='course-landing-page-main-container-module'>
                            <p className='course-landing-page-main-container-module__module-title'>
                              {i + 1}. {lecture.lecture_title}
                            </p>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className='course-landing-page-main-container-module'
                          key={lecture.lecture_id}>
                          <p className='course-landing-page-main-container-module__module-title'>
                            {i + 1}. {lecture.lecture_title}
                          </p>
                        </div>
                      )
                    )}
                </Paper>
              </div>
            </div>
          </div>
          <div className='course-landing-page-course-description'>
            <div className='course-landing-page-course-description__left-container'>
              <Typography variant='h6'>About this course</Typography>
              <div
                variant='body2'
                className='course-landing-page-course-description__text'
                dangerouslySetInnerHTML={{
                  __html: lecture.course.course_description,
                }}></div>
            </div>

            <div className='course-landing-page-course-description__right-container'>
              <div className='course-landing-page-course-description__avatar-container'>
                <img
                  src={
                    author.profile_image_url
                      ? author.profile_image_url
                      : avatarImg
                  }
                  alt='avatar'
                  className='course-landing-page-course-description__avatar'
                />{" "}
                <Typography
                  variant='caption'
                  className='course-landing-page-course-description__avatar-name'>
                  {author.author_name ? author.author_name : "Awesome Author"}
                </Typography>
              </div>
              <div className='course-landing-page-course-description__bio'>
                {author && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: author.author_bio,
                    }}></div>
                )}
              </div>
            </div>
          </div>
        </div>
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

const mapStateToProps = (state) => {
  return {
    isOwner: state.getCourseLandingPage.isOwner,
    isSubscribed: state.getCourseLandingPage.isSubscribed,
    enrollSuccess: state.getCourseLandingPage.order.success,
    author: state.getCourseLandingPage.author,
  };
};

export default connect(mapStateToProps)(withRouter(Lecture));
