import { Typography } from "@material-ui/core";
import {
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  QueuePlayNext as QueuePlayNextIcon,
} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./CourseEditorIconContainer.scss";

function CourseEditorIconContainer({ courseId }) {
  return (
    <div className='course-editor-icons'>
      <NavLink
        exact
        to={`/edit/course/${courseId}`}
        className='course-editor-icons-container'
        activeClassName='course-editor-icons-container--active'>
        <div className='course-editor-icons-container__button-container'>
          <LibraryBooksOutlinedIcon className='course-editor-icons-container__button' />
        </div>
        <Typography
          variant='caption'
          className='course-editor-icons-container__text'>
          Edit Course
        </Typography>
      </NavLink>
      <NavLink
        exact
        to={`/edit/course/${courseId}/lectures`}
        className='course-editor-icons-container'
        activeClassName='course-editor-icons-container--active'>
        <div className='course-editor-icons-container__button-container'>
          <QueuePlayNextIcon className='course-editor-icons-container__button' />
        </div>
        <Typography
          variant='caption'
          className='course-editor-icons-container__text'>
          Edit Lectures
        </Typography>
      </NavLink>
    </div>
  );
}

CourseEditorIconContainer.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default CourseEditorIconContainer;
