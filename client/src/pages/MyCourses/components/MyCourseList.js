import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./MyCourseList.scss";
import PropTypes from "prop-types";
import { Paper, Typography, Menu, MenuItem } from "@material-ui/core";
import { format } from "date-fns";
import softwaresImage from "../../../assets/images/softwares.jpg";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";

function MyCourseList({ course }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className='my-courses-page-card'>
      {" "}
      <div className='my-courses-page-card__image-container'>
        <div className='my-courses-page-card__icon-container'>
          <MoreVertIcon
            onClick={handleClick}
            className='my-courses-page-card__icon'
          />
          <Menu
            id='long-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <Typography variant='body2'>
                <Link to={"/edit/course/" + course.course_id}>Edit</Link>
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {" "}
              <Typography variant='body2'>
                <Link to={"/course/" + course.course_slug}>View</Link>
              </Typography>
            </MenuItem>
          </Menu>
        </div>
        <Link to={"/edit/course/" + course.course_id}>
          <img
            src={softwaresImage}
            alt='softwares'
            className='my-courses-page-card__image'
          />
        </Link>
      </div>
      <div className='my-courses-page-card__text-container'>
        <div className='my-courses-page-card__text'>
          <Link to={"/edit/course/" + course.course_id}>
            <Typography
              gutterBottom
              variant='subtitle2'
              className='my-courses-page-card__text-title'>
              {course.course_title}
            </Typography>
          </Link>
          <Typography variant='caption' color='textSecondary' component='p'>
            Created on: {format(new Date(course.created_at), "MM/dd/yyyy")}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

MyCourseList.propTypes = {
  course: PropTypes.object.isRequired,
};

export default withRouter(MyCourseList);
