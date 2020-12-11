import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./MyCourses.scss";
import PropTypes from "prop-types";
import MyCourseList from "./components/MyCourseList";

function MyCourses({ loading, success, courses, handleGetCoursesByUser }) {
  useEffect(() => {
    handleGetCoursesByUser();
  }, [handleGetCoursesByUser]);

  return (
    <div className='my-courses-page'>
      <h1 className='my-courses-page__headline'>My Courses</h1>
      <Link to='/create/course' className='my-courses-page__create-course'>
        Create a course
      </Link>
      {success &&
        courses.map((course) => (
          <MyCourseList key={course.id} course={course} />
        ))}
    </div>
  );
}

MyCourses.propTypes = {
  handleGetCoursesByUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    courses: state.getCoursesByUser.courses,
  };
};

export default connect(mapStateToProps)(withRouter(MyCourses));
