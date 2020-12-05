import React from "react";
import { Link } from "react-router-dom";
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
      <ul className='sidebar__list'>
        <li className='sidebar__list-item'>
          <Link to='/dashboard' className='sidebar__list-item-link'>
            <FontAwesomeIcon
              icon={faHome}
              className='sidebar__list-item-icon'
            />
            <span className='sidebar__list-item-text'>Dashboard</span>
          </Link>
        </li>
        <li className='sidebar__list-item'>
          <Link to='/my-courses' className='sidebar__list-item-link'>
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className='sidebar__list-item-icon'
            />
            <span className='sidebar__list-item-text'>My Course</span>
          </Link>
        </li>
        <li className='sidebar__list-item'>
          <Link to='/my-learning' className='sidebar__list-item-link'>
            <FontAwesomeIcon
              icon={faGraduationCap}
              className='sidebar__list-item-icon'
            />
            <span className='sidebar__list-item-text'>My Learning</span>
          </Link>
        </li>

        <li className='sidebar__list-item'>
          <Link to='/explore' className='sidebar__list-item-link'>
            <FontAwesomeIcon
              icon={faSchool}
              className='sidebar__list-item-icon'
            />
            <span className='sidebar__list-item-text'>Explore</span>
          </Link>
        </li>

        <li className='sidebar__list-item'>
          <Link to='/my-page' className='sidebar__list-item-link'>
            <FontAwesomeIcon
              icon={faUserCog}
              className='sidebar__list-item-icon'
            />
            <span className='sidebar__list-item-text'>My Page</span>
          </Link>
        </li>

        <li className='sidebar__list-item'>
          <Link to='/my-account' className='sidebar__list-item-link'>
            <FontAwesomeIcon
              icon={faUserCircle}
              className='sidebar__list-item-icon'
            />
            <span className='sidebar__list-item-text'>My Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
