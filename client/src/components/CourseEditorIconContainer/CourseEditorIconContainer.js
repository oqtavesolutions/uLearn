import { Typography } from "@material-ui/core";
import {
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  QueuePlayNext as QueuePlayNextIcon,
} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./CourseEditorIconContainer.scss";

function CourseEditorIconContainer({ courseId }) {
  return (
    <div className='course-editor-icons'>
      <Link
        to={`/edit/course/${courseId}`}
        className='course-editor-icons__container'>
        <div className='course-editor-icons__button-container'>
          <LibraryBooksOutlinedIcon className='course-editor-icons__button' />
        </div>
        <Typography variant='body2'>Edit Course</Typography>
      </Link>
      <Link
        to={`/edit/course/${courseId}/lectures`}
        className='course-editor-icons__container'>
        <div className='course-editor-icons__button-container'>
          <QueuePlayNextIcon className='course-editor-icons__button' />
        </div>
        <Typography variant='body2'>Edit Lectures</Typography>
      </Link>
    </div>
  );
}

CourseEditorIconContainer.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default CourseEditorIconContainer;
