import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import "./LectureList.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function LectureList({ success, lectures, courseId }) {
  const [showNav, setShowNav] = useState(false);
  const kebabWrapper = useRef(null);

  const handleClick = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        kebabWrapper.current !== null &&
        !kebabWrapper.current.contains(e.target)
      ) {
        setShowNav(false);
      }
    });
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", () => {
        setShowNav(false);
      });
    };
  }, [kebabWrapper]);

  return (
    <div className='edit-course-lectures-list'>
      {success &&
        lectures.map((lecture) => {
          console.log(lecture);
          return (
            <article
              className='edit-course-lectures-list-card'
              key={lecture.id}>
              <p className='edit-course-lectures-list-card__description'>
                <span className='edit-course-lectures-list-card__title'>
                  {lecture.lecture_title}
                </span>
              </p>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className='edit-course-lectures-list-card__collapsible'
                onClick={handleClick}
              />

              {showNav && (
                <ul
                  className='edit-course-lectures-list-card__items'
                  ref={kebabWrapper}>
                  <li className='edit-course-lectures-list-card__item'>
                    <a
                      href={
                        "/edit/course/" +
                        courseId +
                        "/lecture/" +
                        lecture.lecture_id
                      }>
                      Edit
                    </a>
                  </li>
                  <li className='edit-course-lectures-list-card__item'>
                    Duplicate
                  </li>
                  <li className='edit-course-lectures-list-card__item'>
                    Delete
                  </li>
                </ul>
              )}
            </article>
          );
        })}
    </div>
  );
}

LectureList.propTypes = {
  lectures: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired,
  courseId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    success: state.getCourseEdit.lectures.success,
    lectures: state.getCourseEdit.lectures.lectures,
    courseId: state.getCourseEdit.course.course_id,
  };
};

export default connect(mapStateToProps)(withRouter(LectureList));
