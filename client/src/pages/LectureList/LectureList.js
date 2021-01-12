import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import "./LectureList.scss";

import CourseEditorIconContainer from "../../components/CourseEditorIconContainer/CourseEditorIconContainer";

function LectureList({
  handleGetCourseLectures,
  match,
  success,
  course,
  lectures,
  loading,
}) {
  useEffect(() => {
    handleGetCourseLectures(match.params.courseId);
  }, [handleGetCourseLectures, match]);

  return (
    <div className='edit-course'>
      <ToastContainer />

      <CourseEditorIconContainer courseId={match.params.courseId} />
      <div className='edit-course-container'>
        <div className='edit-course-lecture-list'>
          <p className='edit-course-lecture-list__title'>
            List of lectures created:
          </p>
          {loading && <CustomContentLoader />}
          {!loading && lectures && lectures.length === 0 && (
            <p className='edit-course-lecture-list__empty'>
              You have not created any lecture yet
            </p>
          )}

          {lectures &&
            lectures.length > 0 &&
            lectures.map((lecture) => (
              <article
                className='edit-course-lectures-list-card'
                key={lecture.id}>
                <p className='edit-course-lectures-list-card__description'>
                  <span className='edit-course-lectures-list-card__title'>
                    {lecture.lecture_title}
                  </span>
                  <span className='edit-course-lectures-list-card__sub'>
                    Created on:
                    {format(new Date(lecture.created_at), "MM/dd/yyyy")}
                  </span>
                </p>

                <ul className='edit-course-lectures-list-card__items'>
                  <li className='edit-course-lectures-list-card__item'>
                    <a
                      href={
                        "/edit/course/" +
                        match.params.courseId +
                        "/lecture/" +
                        lecture.lecture_id
                      }>
                      Edit
                    </a>
                  </li>
                </ul>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
}

LectureList.propTypes = {
  handleGetCourseLectures: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  lectures: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    lectures: state.getLectureList.lectures,
  };
};

export default connect(mapStateToProps)(withRouter(LectureList));
