import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./MyCourses.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import MyCourseList from "./components/MyCourseList";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";

function MyCourses({ loading, success, courses, handleGetCoursesByUser }) {
  useEffect(() => {
    handleGetCoursesByUser();
  }, [handleGetCoursesByUser]);

  return (
    <div className='my-courses-page'>
      <h1 className='my-courses-page__headline'>My Courses</h1>
      <Link to='/create/course' className='my-courses-page__create-course'>
        <FontAwesomeIcon
          icon={faUserEdit}
          className='my-courses-page__create-course-icon'
        />{" "}
        Create a course
      </Link>
      {loading && <CustomContentLoader />}
      {success && courses.length === 0 && (
        <p>You have not created any course yet.</p>
      )}
      {success &&
        courses.length > 0 &&
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
