import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChalkboardTeacher,
  faGraduationCap,
  faUserCog,
  faSchool,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar__list'>
        <NavLink
          activeClassName='sidebar__list-item--selected'
          to='/dashboard'
          className='sidebar__list-item'>
          <FontAwesomeIcon icon={faHome} className='sidebar__list-item-icon' />
          <span className='sidebar__list-item-text'>Dashboard</span>
        </NavLink>

        <NavLink
          activeClassName='sidebar__list-item--selected'
          to='/my-courses'
          className='sidebar__list-item'>
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className='sidebar__list-item-icon'
          />
          <span className='sidebar__list-item-text'>My Course</span>
        </NavLink>

        <NavLink
          activeClassName='sidebar__list-item--selected'
          to='/my-learning'
          className='sidebar__list-item'>
          <FontAwesomeIcon
            icon={faGraduationCap}
            className='sidebar__list-item-icon'
          />
          <span className='sidebar__list-item-text'>My Learning</span>
        </NavLink>

        <NavLink
          activeClassName='sidebar__list-item--selected'
          to='/explore'
          className='sidebar__list-item'>
          <FontAwesomeIcon
            icon={faSchool}
            className='sidebar__list-item-icon'
          />
          <span className='sidebar__list-item-text'>Explore</span>
        </NavLink>

        <NavLink
          activeClassName='sidebar__list-item--selected'
          to='/my-page'
          className='sidebar__list-item'>
          <FontAwesomeIcon
            icon={faUserCog}
            className='sidebar__list-item-icon'
          />
          <span className='sidebar__list-item-text'>My Page</span>
        </NavLink>

        <NavLink
          activeClassName='sidebar__list-item--selected'
          to='/my-account'
          className='sidebar__list-item'>
          <FontAwesomeIcon
            icon={faUserCircle}
            className='sidebar__list-item-icon'
          />
          <span className='sidebar__list-item-text'>My Account</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
