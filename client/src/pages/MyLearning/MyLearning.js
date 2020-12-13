import React, { useEffect } from "react";
import "./MyLearning.scss";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MyLearning({ handleGetCoursesByUser, courses, success }) {
  useEffect(() => {
    handleGetCoursesByUser();
  }, [handleGetCoursesByUser]);
  return (
    <div className='my-learning-page'>
      <h1 className='my-learning-page__headline'>My Learning</h1>
      {success &&
        courses.map((course) => (
          <Link
            to={`/course/${course.course_slug}`}
            key={course.courses.course_id}>
            <article className='my-learning-page-card'>
              <p className='my-learning-page-card__description'>
                <span className='my-learning-page-card__title'>
                  {course.courses.course_title}
                </span>
                <span className='my-learning-page-card__date'>
                  Date Created: 12/03/2020
                </span>
              </p>
            </article>
          </Link>
        ))}
    </div>
  );
}

MyLearning.propTypes = {
  handleGetCoursesByUser: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
};

export default MyLearning;
