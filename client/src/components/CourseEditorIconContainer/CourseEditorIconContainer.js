import { Menu, MenuItem, Typography } from "@material-ui/core";
import {
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  QueuePlayNext as QueuePlayNextIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  MoreHoriz as MoreHorizIcon,
} from "@material-ui/icons";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import "./CourseEditorIconContainer.scss";

function CourseEditorIconContainer({ courseId, course }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='course-editor-with-icons'>
      <div className='course-editor-with-icons-top'>
        <div className='course-editor-with-icons-top__text-container'>
          <Link
            to='/my-courses'
            className='course-editor-with-icons-top__back-icon-link'>
            <ArrowBackIcon className='course-editor-with-icons-top__back-icon' />
          </Link>{" "}
          <Typography variant='h6'>{course.course_title}</Typography>
        </div>
        <div className='course-editor-with-icons-top__horiz-icon-container'>
          <MoreHorizIcon
            onClick={handleClick}
            className='course-editor-with-icons-top__horiz-icon'
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
      </div>
      <div className='course-editor-with-icons-navlinks'>
        <NavLink
          exact
          to={`/edit/course/${courseId}`}
          className='course-editor-with-icons-container'
          activeClassName='course-editor-with-icons-container--active'>
          <div className='course-editor-with-icons-container__button-container'>
            <LibraryBooksOutlinedIcon className='course-editor-with-icons-container__button' />
          </div>
          <Typography
            variant='caption'
            className='course-editor-with-icons-container__text'>
            Edit Course
          </Typography>
        </NavLink>

        <NavLink
          exact
          to={`/edit/course/${courseId}/lectures`}
          className='course-editor-with-icons-container'
          activeClassName='course-editor-with-icons-container--active'>
          <div className='course-editor-with-icons-container__button-container'>
            <QueuePlayNextIcon className='course-editor-with-icons-container__button' />
          </div>
          <Typography
            variant='caption'
            className='course-editor-with-icons-container__text'>
            Edit Lectures
          </Typography>
        </NavLink>

        <NavLink
          exact
          to={`/create/${courseId}/lecture`}
          className='course-editor-with-icons-container'
          activeClassName='course-editor-with-icons-container--active'>
          <div className='course-editor-with-icons-container__button-container'>
            <AddIcon className='course-editor-with-icons-container__button' />
          </div>
          <Typography
            variant='caption'
            className='course-editor-with-icons-container__text'>
            Create Lecture
          </Typography>
        </NavLink>
      </div>
    </div>
  );
}

CourseEditorIconContainer.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default CourseEditorIconContainer;
