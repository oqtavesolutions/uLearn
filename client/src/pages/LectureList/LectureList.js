import React, { useEffect, useState } from "react";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import "./LectureList.scss";
import CourseEditorIconContainer from "../../components/CourseEditorIconContainer/CourseEditorIconContainer";
import { Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import { MoreHoriz as MoreHorizIcon } from "@material-ui/icons";
function LectureList({
  handleGetCourseLectures,
  match,
  success,
  course,
  lectures,
  loading,
  handleGetCourseEdit,
}) {
  useEffect(() => {
    handleGetCourseLectures(match.params.courseId);
    handleGetCourseEdit(match.params.courseId);
  }, [handleGetCourseLectures, handleGetCourseEdit, match]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='lecture-list-page'>
      <ToastContainer />

      <CourseEditorIconContainer
        courseId={match.params.courseId}
        course={course}
      />
      <div className='lecture-list-page-container'>
        <div>
          {loading && <CustomContentLoader />}
          {!loading && lectures && lectures.length === 0 && (
            <Typography variant='body2'>
              You have not created any lecture yet
            </Typography>
          )}

          {lectures &&
            lectures.length > 0 &&
            lectures.map((lecture, index) => (
              <Paper
                variant='outlined'
                key={lecture.id}
                className='lecture-list-page-container-paper'>
                <div className='lecture-list-page-container-paper__left'>
                  <Typography variant='body2'>
                    <Link
                      to={
                        "/edit/course/" +
                        match.params.courseId +
                        "/lecture/" +
                        lecture.lecture_id
                      }>
                      {index + 1}. {lecture.lecture_title}
                    </Link>
                  </Typography>
                  <Typography variant='caption'>
                    Created {format(new Date(lecture.created_at), "MM/dd/yyyy")}
                  </Typography>
                </div>
                <div className='lecture-list-page-container-paper__right'>
                  <Link
                    to={
                      "/edit/course/" +
                      match.params.courseId +
                      "/lecture/" +
                      lecture.lecture_id
                    }
                    className='lecture-list-page-container-paper__right-button'>
                    <Typography
                      variant='caption'
                      className='lecture-list-page-container-paper__right-button-text'>
                      Edit
                    </Typography>
                  </Link>

                  <MoreHorizIcon
                    onClick={handleClick}
                    className='lecture-list-page-container-paper__horiz-icon'
                  />
                  <Menu
                    id='long-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <Typography variant='caption'>
                        <Link to={"/course/" + course.course_slug}>View</Link>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </div>
              </Paper>
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
    course: state.getCourseEdit.course,
  };
};

export default connect(mapStateToProps)(withRouter(LectureList));
